import { PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient();

export const createNewUser = async (
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