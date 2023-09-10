import { validationResult, body } from "express-validator"
import { BadRequestError } from "../errors/customError"

const withValidationErrors = validateValues => {
    return [
        validateValues,
        (req, _, next) => {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                const errorMessages = errors.array().map(err => err.msg)
                throw new BadRequestError(errorMessages)
            }
            next()
        }
    ]
}

export const validateTest = withValidationErrors([
    body('name')
        .notEmpty()
        .withMessage('Name is required')
        .isLength({ min: 3, max: 50 })
        .withMessage('Name must be between 3 and 50 characters')
        .trim()
])