
export const createJob = async (req, res) => {
    const { company, position } = req.body

    if (!company || !position) {
        res.status(400).json({
            message: 'Please provide company and position'
        })
    }

    res.status(200).json({})
}
export const getAllJobs = async (req, res) => {
    res.status(200).json({})
}

export const getJobById = async (req, res) => {
    const { id } = req.params;

    res.status(200).json({})
}

export const updateJob = async (req, res) => {
    const { company, position } = req.body

    if (!company || !position) {
        return res.status(400).json({ message: 'Please provide company and position' })
    }


    res.status(200).json({ msg: 'job modified' })
}

export const deleteJob = async (req, res) => {
    const { id } = req.params;


    res.status(200).json({ msg: 'job deleted' })
}

