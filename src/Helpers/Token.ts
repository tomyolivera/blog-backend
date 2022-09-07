import { user } from "@prisma/client"
import { sign, verify } from "jsonwebtoken"

export type TDecoded = {
    user: user,
    iat: number,
    exp: number
}

export default class Token {
    static create(user: user)
    {
        return sign({ user }, process.env["JWT_SECRET"] as string, { expiresIn: "1d" })
    }

    static verify(token: string="")
    {
        const tkn = token.replace("Bearer ", "")
        return verify(tkn, process.env["JWT_SECRET"] as string) as TDecoded
    }

    static createExpirationDate(): Date
    {
        const date = new Date()
        date.setDate(date.getDate() + 1)
        return date
    }
}