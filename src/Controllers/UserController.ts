import { Request, Response } from "express"
import Token from "../Helpers/Token"

import UserService from "../Services/UserService"

export default class UserController {
    static async getMyUser(req: Request, res: Response): Promise<Response>
    {
        try {
            const { user } = Token.verify(req.headers.authorization)
            return res.status(200).json(user)
        } catch (error) {
            console.log(error)
            return res.status(500).json(error)
        }
    }
    
    static async getByUsername(req: Request, res: Response): Promise<Response>
    {
        try {
            const username = req.params.username
            const user = await UserService.getByProp("username", username)
            return res.status(200).json(user)
        } catch (error) {
            console.log(error)
            return res.status(500).json(error)        
        }
    }

    static async updateMyUser(req: Request, res: Response): Promise<Response>
    {
        try {
            const id = req.body.id
            const { user } = Token.verify(req.headers.authorization)

            if(user.id !== id)
                return res.status(403).json("Forbidden")

            const userUpdated = await UserService.update(req.body)
            return res.status(200).json(userUpdated)
        } catch (error) {
            console.log(error)
            return res.status(500).json(error)        
        }
    }

    static async update(req: Request, res: Response): Promise<Response>
    {
        try {
            const id = req.body.id

            const { user } = Token.verify(req.headers.authorization)

            if(user.id === id)
                return res.status(401).json("Unauthorized: You can't update yourself")

            const userUpdated = await UserService.update(req.body)
            return res.status(200).json(userUpdated)
        } catch (error) {
            console.log(error)
            return res.status(500).json(error)        
        }
    }

    static async deleteMyUser(req: Request, res: Response): Promise<Response>
    {
        try {
            const { user } = Token.verify(req.headers.authorization)
            const userDeleted = await UserService.delete(user.id)
            return res.status(200).json(userDeleted)
        } catch (error) {
            console.log(error)
            return res.status(500).json(error)        
        }
    }

    static async delete(req: Request, res: Response): Promise<Response>
    {
        try {
            const id = parseInt(req.params.id)

            const { user } = Token.verify(req.headers.authorization)

            if(user.id === id)
                return res.status(401).json("Unauthorized: You can't delete yourself")

            const userDeleted = await UserService.delete(id)
            return res.status(200).json(userDeleted)
        } catch (error) {
            console.log(error)
            return res.status(500).json(error)        
        }
    }
}