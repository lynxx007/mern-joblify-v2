import Wrapper from '../assets/wrappers/RegisterAndLoginPage'
import { Link, Form, useNavigate } from 'react-router-dom'
import { Logo, FormRow } from '../components'
import { toast } from 'react-toastify'
import { useLoginMutation } from '../features/api/apiSlice'
import { useState } from 'react'




const Login = () => {
    const navigate = useNavigate()
    const [login, { isLoading }] = useLoginMutation()
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
            await login(formData).unwrap()
            toast.success('Login Successfully')
            navigate('/dashboard')
        } catch (error) {
            toast.error(error?.data?.msg)
        }

    }
    return (
        <Wrapper>
            <Form className='form' onSubmit={handleSubmit}>
                <Logo />
                <h4>Login</h4>
                <FormRow type='email' name='email' defaultValue='luthfi@mail.com' onChange={handleChange} />
                <FormRow type='password' name='password' defaultValue='secret123' onChange={handleChange} />
                <button type='submit' className='btn btn-block' disabled={isLoading}>{isLoading ? "submitting" : 'submit'}</button>
                <button type='button' className='btn btn-block'>explore the app</button>
                <p>Not a member? <Link to='/register' className='member-btn'>Register</Link></p>
            </Form>
        </Wrapper>
    )
}

export default Login
