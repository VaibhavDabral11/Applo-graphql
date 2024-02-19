import { GraphQLNonNull, isNullableType } from 'graphql';
import { createUserInput } from '../../typeDefs/inputType/createUserInput';
import { AuthPayload } from '../../typeDefs/returnType/createUserpayload';
import { PrismaClient, User } from '@prisma/client';
import bcrypt, { compare } from "bcrypt"
const prisma = new PrismaClient();
import jwt from "jsonwebtoken";//npm i --save-dev @types/jsonwebtoken
import { createNewUser } from '../../data/AuthService';
import { loginInput } from '../../typeDefs/inputType/loginUserInput';

interface authPayloadType {
    status: string
    message: string;
    token: string | null;
    user: User | null;
}


export const createUserMutation = {
    type: AuthPayload,
    args: {
        input: {
            type: new GraphQLNonNull(createUserInput),
            description: "use to create user"
        },
    },
    resolve: async (
        _source: unknown,
        { input: { name, email, password } }: any,
        //_context: IApolloServerContext
    ): Promise<authPayloadType> => {
        try {  // Check if the email already exists
            const existingUser = await prisma.user.findUnique({ where: { email } });
            if (existingUser) {
                throw new Error('Email already exists');
            }
            const enc_password = await bcrypt.hash(password, 10);
            const user = await createNewUser(name, email, enc_password)
            const token = jwt.sign(
                { userId: user.id },
                process.env.JWT_SECRET || "SECRET_KEY",
                { algorithm: "HS256", subject: String(user.id), expiresIn: "1d" }
            );
            return {
                status: "200",
                message: "User created successfully",
                token,
                user,
            };
        }
        catch (error) {
            return {
                status: "404",
                message: "successfully working",
                token: null,
                user: null,
            }
        }

    }
}



export const loginMutation = {
    type: AuthPayload,
    args: {
        input: {
            type: new GraphQLNonNull(loginInput),
            description: "Input for user login"
        }
    },
    resolve: async (
        _source: unknown, 
        { input }: { input: any }, 
       ) => {
        const { email, password } = input;

        // Check if user exists in the database
        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
            throw new Error('User not found');
        }

        // Verify password
        const isPasswordValid = await compare(password, user.password);

        if (!isPasswordValid) {
            throw new Error('Invalid password');
        }

        // Return user if login is successful
        return {
            user,
            token: 'YourAuthTokenHere' // You can generate and return a JWT token here
        };
    }
};