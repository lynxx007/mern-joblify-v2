import mongoose from "mongoose";

const JobSchema = new mongoose.Schema({
    company: String,
    position: String,
    jobStatus: {
        type: String,
        enum: ['interview', 'declined', 'pending'],
        default: 'pending'
    },
    jobType: {
        type: String,
        enum: ['full-type', 'part-time', 'internship'],
        default: 'full-time'
    },
    jobLocation: {
        type: String,
        default: 'My City'
    },
}, { timestamps: true }
)

export default mongoose.model('Job', JobSchema)