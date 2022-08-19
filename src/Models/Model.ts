import { ValidationError, AnySchema } from "yup"
import { IValidationSchema } from "../Interfaces/IValidation"

export default class Model {
    static async validate(model: any, schema: AnySchema): Promise<IValidationSchema>
    {
        const validation = {} as IValidationSchema

        await schema.validate(model, {abortEarly: false})
            .then(() => {
                validation.errors = []
                validation.isValid = true
            })
            .catch((err: ValidationError) => {
                validation.errors = err.errors
                validation.isValid = false
            })

        return validation
    }
}