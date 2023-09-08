import { FaUserCircle, FaCaretDown } from "react-icons/fa";
import Wrapper from '../assets/wrappers/LogoutContainer'
import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { logout } from "../features/auth/authSlice";




export const LogoutContainer = () => {
    const user = useSelector(state => state.auth.user)
    const dispatch = useDispatch()
    const [showLogout, setShowLogout] = useState(false)

    return (
        <Wrapper>
            <button type="button" className="btn logout-btn" onClick={() => setShowLogout(!showLogout)}>
                {user.avatar ? <img src={user.avatar} alt="avatar" className="img" />
                    : <FaUserCircle />}
                {user?.name}
                <FaCaretDown />
            </button>
            <div className={showLogout ? 'dropdown show-dropdown' : 'dropdown'}>
                <button type="button" className="dropdown-btn" onClick={() => dispatch(logout())}>
                    logout
                </button>
            </div>
        </Wrapper>
    )
}
