import User from "../models/userModel.js"



export const register = async (req, res) => {
    const user = await User.create(req.body)
    res.status(201).json({ user })
}

export const login = async (req, res) => {
    res.send({})
}