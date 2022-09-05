import { post, user } from "@prisma/client"
import prisma from "../Utils/database"

export default class PostService {
    static async getAll()
    {
        return await prisma.post.findMany({
            include: { post_visibilities: true }
        })
    }

    static async getById(id: number)
    {
        return await prisma.post.findFirst({
            include: { post_visibilities: true },
            where: { id }
        })
    }

    static async getByUserId(user_id: number)
    {
        return await prisma.post.findMany({
            include: { post_visibilities: true },
            where: { user_id }
        })
    }

    static async create(post: post)
    {
        return await prisma.post.create({
            data: post,
            include: { post_visibilities: true }            
        })
    }

    static async update(post: post)
    {
        return await prisma.post.update({
            data: post,
            include: { post_visibilities: true },
            where: { id: post.id },
        })
    }

    static async delete(id: number)
    {
        return await prisma.post.delete({
            include: { post_visibilities: true },
            where: { id }
        })
    }
}