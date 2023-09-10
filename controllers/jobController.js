import { NotFoundError } from '../errors/customError.js'
import Job from '../models/jobModel.js'
export const createJob = async (req, res) => {
    const { company, position } = req.body

    if (!company || !position) {
        return res.status(400).json({
            msg: 'Please provide company and position'
        })
    }

    const job = await Job.create({ company, position })

    res.status(201).json({ job })
}
export const getAllJobs = async (_, res) => {
    const jobs = await Job.find()

    res.status(200).json({ jobs })
}

export const getJobById = async (req, res) => {
    const { id } = req.params;
    const job = await Job.findById(id)

    if (!job) throw new NotFoundError(`Job not found with id ${id}`)

    res.status(200).json({ job })
}

export const updateJob = async (req, res) => {
    const { id } = req.params

    const updatedJob = await Job.findByIdAndUpdate(id, req.body, {
        new: true
    })

    res.status(200).json({ job: updatedJob })
}

export const deleteJob = async (req, res) => {
    const { id } = req.params;
    const removedJob = await Job.findByIdAndDelete(id)

    if (!removedJob) throw new NotFoundError(`Job not found with id ${id}`)

    res.status(200).json({ job: removedJob })
}

