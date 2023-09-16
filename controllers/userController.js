import User from "../models/userModel.js"

export const getCurrentUser = async (req, res) => {
    const user = await User.findOne({ id: req.user.userId })
    const userWithoutPassword = user.toJSON()
    res.status(200).json({ user: userWithoutPassword })
}

