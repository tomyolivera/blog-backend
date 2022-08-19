import { compare, hash } from "bcrypt"

export default class Password {
    static async hash(password: string): Promise<string>
    {
        return await hash(password, 10)
    }

    static async compare(password: string, hash: string): Promise<boolean>
    {
        return await compare(password, hash)
    }
}