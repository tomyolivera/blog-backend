import { object, string } from "yup"

const SPost = object().shape({
    title: string().max(60).required(),
    content: string().required(),
    url_image: string()
})

export default SPost