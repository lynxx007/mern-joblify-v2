import Wrapper from '../assets/wrappers/RegisterAndLoginPage'
import { Link, Form, redirect, useNavigation } from 'react-router-dom'
import { Logo, FormRow } from '../components'
import { customFetch } from '../utils/customFetch'
import { toast } from 'react-toastify'

export const action = async ({ request }) => {
    const formData = await request.formDate()
    const data = Object.fromEntries(formData)
    try {
        await customFetch.post('/auth/login', data)
        toast.success('Login Successful')
        return redirect('/dashboard')
    } catch (error) {
        toast.error(error?.response?.data?.msg)
        return error
    }
}

const Login = () => {
    const navigation = useNavigation()
    const isSubmitting = navigation.state === 'submitting'
    return (
        <Wrapper>
            <form className='form'>
                <Logo />
                <h4>Login</h4>
                <FormRow type='email' name='email' defaultValue='john@mail.com' />
                <FormRow type='password' name='password' defaultValue='secret123' />
                <button type='submit' className='btn btn-block' disabled={isSubmitting}>{isSubmitting ? "submitting" : 'submit'}</button>
                <button type='button' className='btn btn-block'>explore the app</button>
                <p>Not a member? <Link to='/register' className='member-btn'>Register</Link></p>
            </form>
        </Wrapper>
    )
}

export default Login
