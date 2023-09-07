import Wrapper from "../assets/wrappers/LandingPage"
import logo from '../assets/images/favicon.svg'
import main from '../assets/images/main-alternative.svg'
import { Link } from "react-router-dom"
const Landing = () => {
    return (
        <Wrapper>
            <nav>
                <img src={logo} alt="jobify" className="logo" />
            </nav>
            <div className="container page">
                <div className="info">
                    <h1>job <span>tracking</span> app</h1>
                    <p>Eu mollit nisi aliqua consectetur Lorem et eu anim duis pariatur occaecat. Occaecat qui pariatur in commodo tempor id nisi officia non esse adipisicing ullamco non reprehenderit. Eu tempor duis culpa et culpa aliquip dolor. Ea nostrud incididunt ipsum qui aliqua occaecat pariatur magna occaecat tempor id labore deserunt. Velit cupidatat fugiat adipisicing mollit labore nisi ea quis ea.</p>
                    <Link to='/register' className="btn register-link">Register</Link>
                    <Link to='/login' className="btn">Login / Demo User</Link>
                </div>
                <img src={main} alt="job hunt" className="img main-img" />
            </div>
        </Wrapper>
    )
}

export default Landing
