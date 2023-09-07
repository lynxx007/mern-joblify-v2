import Wrapper from '../assets/wrappers/RegisterAndLoginPage'
import { Link } from 'react-router-dom'
import { Logo, FormRow } from '../components'

const Login = () => {
    return (
        <Wrapper>
            <form className='form'>
                <Logo />
                <h4>Login</h4>
                <FormRow type='email' name='email' defaultValue='john@mail.com' />
                <FormRow type='password' name='password' defaultValue='secret123' />
                <button type='submit' className='btn btn-block'>submit</button>
                <button type='button' className='btn btn-block'>explore the app</button>
                <p>Not a member? <Link to='/register' className='member-btn'>Register</Link></p>
            </form>
        </Wrapper>
    )
}

export default Login
