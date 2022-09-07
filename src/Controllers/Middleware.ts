import { NextFunction, Request, Response } from "express"
import { EUserRoles } from "../Enums/EUserRoles"
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

    static async isEnabled(req: Request, res: Response, next: NextFunction)
    {
        const { user } = Token.verify(req.headers.authorization)

        if(!user.enabled)
            return res.status(403).json("User is not enabled")

        return next()
    }

    static async isMod(req: Request, res: Response, next: NextFunction)
    {
        const { user } = Token.verify(req.headers.authorization)

        if(user.role !== EUserRoles.MOD)
            return res.status(403).json("Forbidden: User has not enough permissions")

        return next();
    }

    static async isAdmin(req: Request, res: Response, next: NextFunction)
    {
        const { user } = Token.verify(req.headers.authorization)

        if(user.role !== EUserRoles.ADMIN)
            return res.status(403).json("Forbidden: User has not enough permissions")

        return next()
    }
}

export const isAuthenticated = Middleware.verifyToken
export const isEnabled = [isAuthenticated, Middleware.isEnabled]
export const isMod = [isAuthenticated, Middleware.isMod]
export const isAdmin = [isAuthenticated, Middleware.isAdmin]