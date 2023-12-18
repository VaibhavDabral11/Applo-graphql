import { GraphQLNonNull } from 'graphql';
import { createUserInput } from '../../typeDefs/inputType/createUserInput';
import { AuthPayload } from '../../typeDefs/returnType/createUserpayload';
import { PrismaClient, User } from '@prisma/client';
import bcrypt from "bcrypt"
const prisma = new PrismaClient();
import jwt from "jsonwebtoken";//npm i --save-dev @types/jsonwebtoken

interface authPayloadType {
    token: string;
    user: User;
}


const createNewUser = async (
    name: string,
    email: string,
    password: string,
): Promise<User> => {
    return prisma.user.create({
        data: {
            name,
            email,
            password
        }
    })
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
        const enc_password = await bcrypt.hash(password, 10);
        const user = await createNewUser(name, email, enc_password)

        const token = jwt.sign(
            { userId: user.id },
            process.env.JWT_SECRET || "SECRET_KEY",
            { algorithm: "HS256", subject: String(user.id), expiresIn: "1d" }
        );
        return {
            token,
            user,
        };
    }
} 