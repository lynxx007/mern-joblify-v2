import { UnauthenticatedError } from "../errors/customError.js"
import User from "../models/userModel.js"
import { comparePassword, hashPassword } from "../utils/passwordUtils.js"



export const register = async (req, res) => {
    const hashedPassword = await hashPassword(req.body.password)
    req.body.password = hashedPassword

    const user = await User.create(req.body)
    res.status(201).json({ user })
}

export const login = async (req, res) => {

    const user = await User.findOne({ email: req.body.email })
    if (!user) throw new UnauthenticatedError('invalid credentials')

    const isValidUser = user && (await comparePassword(req.body.password, user.password))
    if (!isValidUser) throw new UnauthenticatedError('invalid credentials')
}