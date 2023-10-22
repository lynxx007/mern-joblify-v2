
import { destroy, upload } from "../config/cloudinary.js"
import Job from "../models/jobModel.js"
import User from "../models/userModel.js"
import { promises as fs } from 'fs'

export const getCurrentUser = async (req, res) => {
    const user = await User.findOne({ _id: req.user.userId })
    const userWithoutPassword = user.toJSON()
    res.status(200).json({ user: userWithoutPassword })
}

export const updateUser = async (req, res) => {
    const newUser = { ...req.body }
    delete newUser.password
    if (req.file) {
        const response = await upload(req.file.path)
        await fs.unlink(req.file.path)
        newUser.avatar = response.secure_url
        newUser.avatarId = response.public_id
    }
    const updatedUser = await User.findByIdAndUpdate(req.user.userId, newUser)

    if (req.file && updatedUser.avatarPublicId) {
        await destroy(updatedUser.avatarPublicId)
    }
    res.status(200).json({ msg: 'user updated' })
}

export const getApplicationStats = async (req, res) => {
    const users = await User.countDocuments()
    const jobs = await Job.countDocuments()
    res.status(200).json({ users, jobs })
}
