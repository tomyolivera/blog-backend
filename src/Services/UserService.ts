import prisma from "../Utils/database"

export const exclude_user_data = prisma.$exclude("user", ["password", "token", "token_expiration_date", "email_validated", "updated_at"])

export default class UserService {
    static async login(email: string)
    {
        return await prisma.user.findFirst({
            where: { email },
            select: {...exclude_user_data, password: true},
        })
    }

    static async getByProp(prop: string, value: string|number)
    {
        return await prisma.user.findFirst({
            where: { [prop]: value },
            select: exclude_user_data,
        })
    }

    static async getByToken(token: string)
    {
        return await prisma.user.findFirst({
            where: { token },
            select: {...exclude_user_data, token: true, token_expiration_date: true},
        })
    }

    static async create(user: any)
    {
        return await prisma.user.create({
            data: user,
            select: exclude_user_data
        })
    }

    static async update(user: any)
    {
        return await prisma.user.update({
            where: { id: user.id },
            data: user
        })
    }

    static async delete(id: number)
    {
        return await prisma.user.delete({
            where: { id }
        })
    }
}