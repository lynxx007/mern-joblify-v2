import { Form, Link, useNavigate, useNavigation } from 'react-router-dom'
import { FormRow, Logo } from '../components'
import Wrapper from '../assets/wrappers/RegisterAndLoginPage'
import { useState } from 'react'
import { useRegisterMutation } from '../features/api/apiSlice'
import { toast } from 'react-toastify'


const Register = () => {
    const navigation = useNavigation()
    const navigate = useNavigate()
    const isSubmitting = navigation.state === 'submitting'
    const [formData, setFormData] = useState({})
    const [register, { isLoading }] = useRegisterMutation()

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async e => {
        e.preventDefault()
        try {
            await register(formData).unwrap()
            setFormData({})
            toast.success('Registered Successfully')
            navigate('/')
        } catch (error) {
            toast.error(error?.data?.msg)
            console.log(error);
        }

    }
    return (
        <Wrapper>
            <Form method='post' className='form' onSubmit={handleSubmit}>
                <Logo />
                <h4>Register</h4>
                <FormRow type='text' name='name' onChange={handleChange} />
                <FormRow type='text' name='lastName' labelText='last name' onChange={handleChange} />
                <FormRow type='text' name='location' onChange={handleChange} />
                <FormRow type='email' name='email' onChange={handleChange} />
                <FormRow type='password' name='password' onChange={handleChange} />
                <button type='submit' className='btn btn-block' disabled={isSubmitting}>
                    {isSubmitting ? 'submitting...' : 'submit'}
                </button>
                <p>Already a member? <Link to='/login' className='member-btn'>Login</Link></p>
            </Form>
        </Wrapper>
    )
}

export default Register