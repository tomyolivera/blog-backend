import { user } from "@prisma/client"
import { Request, Response } from "express"

import UserService from "../Services/UserService"

import SUser from "../Schemas/SUser"
import Model from "../Models/Model"
import Password from "../Helpers/Password"
import Token from "../Helpers/Token"
import Middleware from "./Middleware"
import { EUserStatus } from "../Enums/EUserStatus"

/* TODO
 * ---------------------------------------------------------------------
 *  Optimizar codigo obteniendo el usuario de una manera mas rapida
 * ---------------------------------------------------------------------
*/

export default class AuthController {
    static async register(req: Request, res: Response): Promise<Response>
    {
        try {
            const { isValid, errors } = await Model.validate(req.body, SUser)
            if(!isValid) return res.status(400).json(errors)

            const user = {
                name: req.body.name,
                surname: req.body.surname,
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
            } as user

            const exists = await UserService.getByProp("email", user.email)
            if(exists) return res.status(400).json("Email already in use")

            user.password = await Password.hash(user.password)
            
            const newUser = await UserService.create(user)

            return res.status(201).json(newUser)
        } catch (error) {
            console.log(error)
            return res.status(500).json(error) 
        }
    }

    static async login(req: Request, res: Response): Promise<Response>
    {
        try {
            const { email, password } = req.body as user
            
            const user = await UserService.login(email) as user

            if(!user || !await Password.compare(password, user.password))
                return res.status(404).json("User not found")

            user.token = Token.create({...user, password: ""}) 
            user.token_expiration_date = Token.createExpirationDate()
            
            await UserService.update(user)

            return res.status(200).json(user.token)
        } catch (error) {
            console.log(error)
            return res.status(500).json(error)
        }
    }

    static async logout(req: Request, res: Response): Promise<Response>
    {
        try {
            const token = Middleware.getToken(req)
            const user = await UserService.getByToken(token)
            if(!user) return res.status(404).json("User not found")

            user.token = null
            user.token_expiration_date = null
            user.status_id = EUserStatus.OFFLINE

            await UserService.update(user)

            return res.status(200).json("Logged Out")
        } catch (error) {
            console.log(error)
            return res.status(500).json(error)
        }
    }
}