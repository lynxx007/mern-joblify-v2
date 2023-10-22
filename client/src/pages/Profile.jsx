import { FormRow } from "../components"
import Wrapper from '../assets/wrappers/DashboardFormpage'
import { Form } from "react-router-dom"
import { toast } from 'react-toastify'
import { useGetCurrentUserQuery, useUpdateUserMutation } from "../features/api/apiSlice"
import { useState } from "react"
const Profile = () => {
    const [dataForm, setDataForm] = useState({
        avatar: '',
        name: '',
        lastName: '',
        email: '',
        location: ''
    })
    const { isSuccess } = useGetCurrentUserQuery()
    const [updateUser, { isLoading }] = useUpdateUserMutation()


    const handleChange = e => {
        setDataForm({
            ...dataForm,
            [e.target.name]: e.target.value
        })
    }

    const handleImageChange = e => {
        const file = e.target.files[0]

        setDataForm({
            ...dataForm,
            avatar: file
        })
    }

    const handleSubmit = async e => {
        e.preventDefault()

        const formData = new FormData()

        formData.append('name', dataForm.name)
        formData.append('lastName', dataForm.lastName)
        formData.append('email', dataForm.email)
        formData.append('location', dataForm.location)

        if (dataForm.avatar) formData.append('avatar', dataForm.avatar)

        try {
            await updateUser(formData).unwrap()
            toast.success('Successfully updated')
        } catch (error) {
            toast.error(error?.data?.msg)
        }
    }

    if (isSuccess)
        return (
            <Wrapper>
                <Form method="post" className="form" encType="multipart/form-data" onSubmit={handleSubmit}>
                    <h4 className="form-title">profile</h4>
                    <div className="form-center">
                        <div className="form-row">
                            <label htmlFor="image" className="form-label"> Select an image file (max 0.5 MB)</label>
                            <input
                                type="file"
                                id="avatar"
                                name="avatar"
                                className="form-input"
                                accept="image/*"
                                onChange={handleImageChange}
                            />
                        </div>
                        <FormRow type='text' name='name' onChange={handleChange} />
                        <FormRow type='text' labelText='last name' name='lastName' onChange={handleChange} />
                        <FormRow type='email' name='email' onChange={handleChange} />
                        <FormRow type='text' name='location' onChange={handleChange} />
                        <button className="btn btn-block form-btn" type="submit" disabled={isLoading}>
                            {isLoading ? "Submitting..." : 'Submit'}
                        </button>
                    </div>
                </Form>
            </Wrapper>
        )
}

export default Profile