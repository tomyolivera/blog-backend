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
            where: { [prop]: value }
        })
    }

    static async getByToken(token: string, data=true)
    {
        const tkn = token.replace("Bearer ", "")

        return await prisma.user.findFirst({
            where: { token: tkn },
            select: {...exclude_user_data, token: data, token_expiration_date: data, user_status: true},
        })
    }

    static async create(user: any)
    {
        return await prisma.user.create({
            data: user,
            select: {...exclude_user_data, user_status: true}
        })
    }

    static async update(user: any)
    {
        return await prisma.user.update({
            select: exclude_user_data,
            data: user,
            where: { id: user.id },
        })
    }
    
    static async delete(id: number)
    {
        return await prisma.user.delete({
            select: exclude_user_data,
            where: { id }
        })
    }
}