import mongoose from 'mongoose'
import { NotFoundError } from '../errors/customError.js'
import Job from '../models/jobModel.js'
import day from 'dayjs'
export const createJob = async (req, res) => {
    const { company, position } = req.body

    if (!company || !position) {
        return res.status(400).json({
            msg: 'Please provide company and position'
        })
    }

    req.body.createdBy = req.user.userId

    const job = await Job.create(req.body)

    res.status(201).json({ job })
}
export const getAllJobs = async (req, res) => {
    const { search, jobStatus, jobType, sort } = req.query

    const queryObj = {
        createdBy: req.user.userId
    }

    if (search) {
        queryObj.$or = [
            { position: { $regex: search, $options: 'i' } },
            { company: { $regex: search, $options: 'i' } }
        ]
    }

    if (jobStatus && jobStatus !== 'all') queryObj.jobStatus = jobStatus

    if (jobType && jobType !== 'all') queryObj.jobType = jobType

    const sortOptions = {
        newest: '-createdAt',
        oldest: 'createdAt',
        'a-z': 'position',
        'z-a': '-position'
    }

    const sortKey = sortOptions[sort] || sortOptions.newest

    // pagination
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const skip = (page - 1) * limit

    const jobs = await Job.find(queryObj).sort(sortKey).skip(skip).limit(limit)

    const totalJobs = await Job.countDocuments(queryObj)
    const numOfPages = Math.ceil(totalJobs / limit)

    res.status(200).json({ totalJobs, numOfPages, currentPage: page, jobs })
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

export const showStats = async (req, res) => {
    let stats = await Job.aggregate([
        {
            $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) }
        },
        {
            $group: {
                _id: '$jobStatus',
                count: {
                    $sum: 1
                }

            }
        },
    ])

    stats = stats.reduce((acc, curr) => {
        const { _id: jobStatus, count } = curr
        acc[jobStatus] = count
        return acc
    }, {})

    const defaultStats = {
        pending: stats.pending || 0,
        interview: stats.interview || 0,
        declined: stats.declined || 0
    }

    let monthlyStats = await Job.aggregate([
        {
            $match: {
                createdBy: new mongoose.Types.ObjectId(req.user.userId)
            }
        },
        {
            $group: {
                _id: {
                    year: { $year: '$createdAt' },
                    month: { $month: '$createdAt' }
                },
                count: { $sum: 1 }
            }
        },
        {
            $sort: {
                '_id.year': -1,
                '_id.month': -1
            }
        },
        {
            $limit: 6
        }
    ])

    monthlyStats = monthlyStats.map(item => {
        const { _id: { year, month }, count } = item

        const date = day().month(month - 1).year(year).format('MMM YY')
        return { date, count }
    }).reverse()

    res.status(200).json({ defaultStats, monthlyStats })
}
