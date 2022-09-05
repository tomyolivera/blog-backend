import { Request, Response } from "express"

import UserService from "../Services/UserService"
import Middleware from "./Middleware"

export default class UserController {
    static async getMyUser(req: Request, res: Response): Promise<Response>
    {
        try {
            const token = Middleware.getToken(req)
            const user = UserService.getByToken(token)
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
            const user = UserService.getByProp("username", username)
            return res.status(200).json(user)
        } catch (error) {
            console.log(error)
            return res.status(500).json(error)        
        }
    }

    static async update(req: Request, res: Response): Promise<Response>
    {
        try {
            const user = UserService.update(req.body)
            return res.status(200).json(user)
        } catch (error) {
            console.log(error)
            return res.status(500).json(error)        
        }
    }
}