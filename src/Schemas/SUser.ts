import { object, string } from "yup"

const SUser = object().shape({
    email: string().email().required(),
    name: string().max(40).required(),
    surname: string().max(40).required(),
    username: string().max(20).required(),
    password: string().min(8).required(),
})

export default SUser