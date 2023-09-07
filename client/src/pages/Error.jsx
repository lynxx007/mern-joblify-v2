import { Link, useRouteError } from 'react-router-dom'
import img from '../assets/images/not-found.svg'
import Wrapper from '../assets/wrappers/ErrorPage'
const Error = () => {
    const error = useRouteError()

    if (error.status === 404) {
        return (
            <Wrapper>
                <div>
                    <img src={img} alt='not found' />
                    <h3>Page not found!</h3>
                    <p>We cannot seem to find the page you are looking for</p>
                    <Link to="/dashboard">Go back to home</Link>
                </div>
            </Wrapper>
        )
    }

    return (
        <Wrapper>
            <div>
                <h3>something went wrong</h3>
            </div>
        </Wrapper>
    )
}

export default Error
