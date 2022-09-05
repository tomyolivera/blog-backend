import { post } from "@prisma/client"
import { Request, Response } from "express"
import Token from "../Helpers/Token"
import Model from "../Models/Model"
import SPost from "../Schemas/SPost"

import PostService from "../Services/PostService"
import Middleware from "./Middleware"

export default class PostController {
    static async getAll(req: Request, res: Response): Promise<Response>
    {
        try {
            const posts = await PostService.getAll()
            return res.status(200).json(posts)
        } catch (error) {
            console.log(error)
            return res.status(500).json(error)
        }
    }

    static async getById(req: Request, res: Response): Promise<Response>
    {
        try {
            const id = parseInt(req.params.id)
            const post = await PostService.getById(id)
            return res.status(200).json(post)
        } catch (error) {
            console.log(error)
            return res.status(500).json(error)
        }
    }

    static async getByUserId(req: Request, res: Response): Promise<Response>
    {
        try {
            const user_id = parseInt(req.params.user_id)
            const post = await PostService.getByUserId(user_id)
            return res.status(200).json(post)
        } catch (error) {
            console.log(error)
            return res.status(500).json(error)
        }
    }

    static async create(req: Request, res: Response): Promise<Response>
    {
        try {
            const post: post = req.body
            const { user } = Token.verify(Middleware.getToken(req))

            console.log(user);

            post.user_id = user.id
            // If visibility is not passed at body, set 1 as default
            if(!post.visibility_id) post.visibility_id = 1

            // Validation
            const { errors, isValid } = await Model.validate(post, SPost)
            if(!isValid) return res.status(400).json(errors)

            const newPost = await PostService.create(post)
            return res.status(200).json(newPost)
        } catch (error) {
            console.log(error)
            return res.status(500).json(error)
        }
    }

    static async update(req: Request, res: Response): Promise<Response>
    {
        try {
            const id = parseInt(req.params.id)
            const newPostData = req.body as post

            if(id !== newPostData.id) return res.status(400).json("Bad Request")

            let post = await PostService.getById(id)
            if(!post) return res.status(404).json("Post not found")

            // If the data is the same, don't update
            if(newPostData.title === post.title &&
                newPostData.content === post.content)
                return res.status(200).json(post)

            // Validation
            const { errors, isValid } = await Model.validate(newPostData, SPost)
            if(!isValid) return res.status(400).json(errors)

            post = await PostService.update(newPostData)
            return res.status(200).json(post)
        } catch (error) {
            console.log(error)
            return res.status(500).json(error)
        }
    }

    static async delete(req: Request, res: Response): Promise<Response>
    {
        try {
            const id = parseInt(req.params.id)

            const post = await PostService.getById(id)
            if(!post) return res.status(404).json("Post not found")

            const { user } = Token.verify(Middleware.getToken(req))
            
            if(user.id !== post.user_id) return res.status(403).json("Forbidden")
            
            const deletedPost = await PostService.delete(id)
            return res.status(200).json(deletedPost)
        } catch (error) {
            console.log(error)
            return res.status(500).json(error)
        }
    }
}