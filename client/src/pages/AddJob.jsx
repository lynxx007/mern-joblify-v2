import { FormRow, FormRowSelect } from "../components"
import Wrapper from '../assets/wrappers/DashboardFormpage'
import { Form, useNavigate } from "react-router-dom"
import { useAddJobMutation, useGetCurrentUserQuery } from "../features/api/apiSlice"
import { JOB_STATUS, JOB_TYPE } from "../../../utils/constants"
import { useState, } from "react"
import { toast } from "react-toastify"



const AddJob = () => {
    const { isSuccess, } = useGetCurrentUserQuery()
    const [addJob, { isLoading }] = useAddJobMutation()
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        jobStatus: JOB_STATUS.PENDING,
        jobType: JOB_TYPE.FULL_TIME,
    })



    const handleChange = e => {
        e.preventDefault()
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSelectChange = e => {
        e.preventDefault()
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async e => {
        e.preventDefault()
        try {
            await addJob(formData).unwrap()
            toast.success('Job added successfully')
            navigate('/dashboard/all-jobs')
        } catch (error) {
            toast.error(error?.data?.msg)
        }
    }

    if (isSuccess) {
        return (
            <Wrapper>
                <Form method="post" className="form" onSubmit={handleSubmit}>
                    <h4 className="form-title">add job</h4>
                    <div className="form-center">
                        <FormRow type='text' name='position' onChange={handleChange} />
                        <FormRow type='text' name='company' onChange={handleChange} />
                        <FormRow type='text' name='jobLocation' labelText='job location' onChange={handleChange} />
                        <FormRowSelect labelText='job status' name='jobStatus' defaultValue={formData.jobStatus} list={Object.values(JOB_STATUS)} handleSelectChange={handleSelectChange} />
                        <FormRowSelect name='jobType' labelText='job type' defaultValue={formData.jobType} list={Object.values(JOB_TYPE)} handleSelectChange={handleSelectChange} />
                        <button type="submit" className="btn btn-block form-btn" disabled={isLoading}>
                            {isLoading ? 'submitting...' : 'submit'}
                        </button>
                    </div>
                </Form>
            </Wrapper>
        )
    }

}

export default AddJob
