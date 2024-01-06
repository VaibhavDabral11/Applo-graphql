import { GraphQLNonNull } from 'graphql';
import { getUserInput } from '../../typeDefs/inputType/getUserInput';
import { AuthPayload } from '../../typeDefs/returnType/createUserpayload';
import { PrismaClient} from '@prisma/client';
import DefaultPayload from '../../typeDefs/Defaultpayload';
const prisma = new PrismaClient();

export interface defaultPayloadType {
    status: number;
    message: string;
    data: any;
}

type User = {
    id: string;
    email: string;
    name:string;
    password:string;
  };
  
const user = async (payload: {
    UserId: number
}
): Promise<any> => {
    
    console.log("----iud", payload.UserId )
    const u = await prisma.user.findFirst({
        where: { id: payload.UserId }
    })
    console.log("------sdasfs-------------")
    console.log(u)
    return u;
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

