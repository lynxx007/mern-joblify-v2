import { UnauthenticatedError } from "../errors/customError.js"
import User from "../models/userModel.js"
import { comparePassword, hashPassword } from "../utils/passwordUtils.js"
import { createJwt } from "../utils/tokenUtils.js"



export const register = async (req, res) => {
    const isFirstAccount = (await User.countDocuments()) === 0
    req.body.role = isFirstAccount ? 'admin' : 'user'

    const hashedPassword = await hashPassword(req.body.password)
    req.body.password = hashedPassword

    const user = await User.create(req.body)
    res.status(201).json({ msg: 'User created' })
}

export const login = async (req, res) => {

    const user = await User.findOne({ email: req.body.email })
    if (!user) throw new UnauthenticatedError('Invalid credentials')

    const isValidUser = user && (await comparePassword(req.body.password, user.password))
    if (!isValidUser) throw new UnauthenticatedError('Invalid credentials')

    // generate token
    const token = createJwt({ userId: user._id, role: user.role })

    res.cookie('token', token, {
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
        secure: process.env.NODE_ENV === 'production'
    })

    res.status(200).json({ msg: 'User logged in' })
}

export const logout = (req, res) => {
    res.cookie('token', 'logout', {
        httpOnly: true,
        expires: new Date(Date.now())
    })

    res.status(200).json({ msg: 'User logged out' })
}