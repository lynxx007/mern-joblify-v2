import Wrapper from '../assets/wrappers/DashboardFormpage'
import { useEditJobMutation, useGetJobQuery } from '../features/api/apiSlice'
import { Form, useParams } from 'react-router-dom'
import { FormRow, FormRowSelect } from '../components'
import { JOB_STATUS, JOB_TYPE } from '../../../utils/constants'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { useEffect } from 'react'

const EditJob = () => {
    const { id } = useParams()
    const [editJob, { isLoading }] = useEditJobMutation()
    const { data, isSuccess } = useGetJobQuery(id)
    const [formData, setFormData] = useState({})


    const handleChange = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })

    }

    const handleSubmit = async e => {
        e.preventDefault()
        try {
            await editJob({ id, ...formData }).unwrap()
            setFormData({})
            toast.success('Job edited successfully')
        } catch (error) {
            toast.error(error?.data?.msg)
        }

    }

    // Use useEffect to set formData when data is available
    useEffect(() => {
        if (isSuccess && data) {
            // Populate formData with data from the query
            setFormData({
                position: data.job.position,
                company: data.job.company,
                jobLocation: data.job.jobLocation,
                jobStatus: data.job.jobStatus,
                jobType: data.job.jobType,
            });
        }
    }, [isSuccess, data]);

    if (isSuccess) {
        return (
            <Wrapper>
                <Form method='post' className='form' onSubmit={handleSubmit}>
                    <h4 className='form-title'>edit job</h4>
                    <div className='form-center'>
                        <FormRow type='text' name='position' defaultValue={formData.position} onChange={handleChange} />
                        <FormRow type='text' name='company' defaultValue={formData.company} onChange={handleChange} />
                        <FormRow type='text' labelText='job location' name='jobLocation' defaultValue={formData.jobLocation} onChange={handleChange} />
                        <FormRowSelect name='jobStatus' labelText='job status' defaultValue={formData.jobStatus} list={Object.values(JOB_STATUS)} handleSelectChange={handleChange} />
                        <FormRowSelect name='jobType' labelText='job type' defaultValue={formData.jobType} list={Object.values(JOB_TYPE)} handleSelectChange={handleChange} />
                        <button type='submit' className='btn btn-block form-btn' disabled={isLoading}>{isLoading ? 'submitting...' : 'submit'}</button>
                    </div>
                </Form>
            </Wrapper>
        )
    }

}

export default EditJob
