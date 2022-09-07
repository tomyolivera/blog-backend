import { role } from "@prisma/client"
import prisma from "../Utils/database"
import { exclude_user_data } from "./UserService"

export default class UserRolesService {
    static async getAll()
    {
        return await prisma.role.findMany()
    }

    static async create(role: role)
    {
        return await prisma.role.create({
            data: role
        })
    }

    static async update(role: role)
    {
        return await prisma.role.update({
            data: role,
            where: { id: role.id }
        })
    }

    static async delete(id: string)
    {
        return await prisma.role.delete({
            where: {  }
        })
    }
}