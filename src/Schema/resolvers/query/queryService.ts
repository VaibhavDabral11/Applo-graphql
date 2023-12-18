import { GraphQLNonNull } from 'graphql';
import { getUserInput } from '../../typeDefs/inputType/getUserInput';
import { AuthPayload } from '../../typeDefs/returnType/createUserpayload';
import { PrismaClient, User } from '@prisma/client';
import DefaultPayload from '../../typeDefs/Defaultpayload';
const prisma = new PrismaClient();

export interface defaultPayloadType {
    status: number;
    message: string;
    data: any;
}

const user = async (payload: {
    UserId: number
}
): Promise<any> => {
    return prisma.user.findUnique({
        where: { id: payload.UserId }
    })
}

export const getuserQuery = {
    type: DefaultPayload,
    args: {
        input: {
            type: new GraphQLNonNull(getUserInput),
            description: "use to get user",
        },
    },
    resolve: async (
        _source: unknown,
        { input: payload }: any,
    ): Promise<defaultPayloadType> => {
        try {
            const findUser = await user(payload);

            if (!findUser) {
                return {
                    status: 200,
                    message: "get User by given Id is not working",
                    data: findUser,
                }
            } else {
                return {
                    status: 200,
                    message: "get User by given Id is successfully working",
                    data: findUser,
                }
            }
        }
        catch (err) {
            return {
                status: 404,
                message: `get User by given Id  not working ${err}`,
                data: null,
            };
        }

    }
}

