import Job from "../models/jobModel.js"
import User from "../models/userModel.js"

export const getCurrentUser = async (req, res) => {
    const user = await User.findOne({ _id: req.user.userId })
    const userWithoutPassword = user.toJSON()
    res.status(200).json({ user: userWithoutPassword })
}

export const updateUser = async (req, res) => {
    const updatedUser = await User.findByIdAndUpdate(req.user.userId, req.body)
    res.status(200).json({ msg: 'user updated' })
}

export const getApplicationStats = async (req, res) => {
    const users = await User.countDocuments()
    const jobs = await Job.countDocuments()
    res.status(200).json({ users, jobs })
}
