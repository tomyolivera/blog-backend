import { sign, verify } from "jsonwebtoken"

export default class Token {
    static create(id: number)
    {
        return sign({ id }, process.env["JWT_SECRET"] as string, { expiresIn: "1d" })
    }

    static verify(token: string)
    {
        return verify(token, process.env["JWT_SECRET"] as string)
    }

    static createExpirationDate(): Date
    {
        const date = new Date()
        date.setDate(date.getDate() + 1)
        return date
    }
}