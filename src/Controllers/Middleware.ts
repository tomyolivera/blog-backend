import { NextFunction, Request, Response } from "express"
import Token from "../Helpers/Token"
import UserService from "../Services/UserService"

export default class Middleware {
    static getToken(req: Request)
    {
        let token = req.headers.authorization
        if(!token || !token.toLowerCase().startsWith("bearer ")) return ""

        return token.split(' ')[1]
    }

    static async verifyToken(req: Request, res: Response, next: NextFunction)
    {
        try {
            const token = Middleware.getToken(req)
            if(!token || token === "" || !Token.verify(token)) return res.status(401).json("Unauthorized")
            
            const user = await UserService.getByToken(token)
            if(!user || !user.token_expiration_date || user.token_expiration_date < new Date()) return res.status(403).json("Forbidden")
            
            return next()
        } catch (error) {
            return res.status(401).json("Unauthorized")
        }
    }
}

export const isAuthenticated = [Middleware.verifyToken]