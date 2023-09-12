import { validationResult, body } from "express-validator"
import { BadRequestError } from "../errors/customError.js"
import { JOB_STATUS, JOB_TYPE } from "../utils/constants.js"
import User from "../models/userModel.js"

const withValidationErrors = validateValues => {
    return [
        validateValues,
        (req, _, next) => {
            const errors = validationResult(req)
            if (errors.isEmpty()) {
                return next()
            }
            const errorMessages = errors.array().map(err => err.msg)
            throw new BadRequestError(errorMessages)
        }
    ]
}

export const validateJobInput = withValidationErrors([
    body("company").notEmpty().withMessage('company is required'),
    body("position").notEmpty().withMessage('position is required'),
    body("jobLocation").notEmpty().withMessage('job location is required'),
    body("jobStatus").isIn(Object.values(JOB_STATUS)).withMessage('invalid status value'),
    body("jobType").isIn(Object.values(JOB_TYPE)).withMessage('invalid job type value'),
])

export const validateRegisterInput = withValidationErrors([
    body('name').notEmpty().withMessage('name is required'),
    body('email').notEmpty().withMessage('email is required').isEmail().withMessage('invalid email')
        .custom(
            async email => {
                const user = await User.findOne({ email })
                if (user) {
                    throw new BadRequestError('email already exists')
                }
            }
        ),
    body('password').notEmpty().withMessage('password is required').isLength({ min: 8 }).withMessage('password must be at least 8 characters'),
    body('location').notEmpty().withMessage('location is required'),
    body('lastName').notEmpty().withMessage('last name is required'),
])