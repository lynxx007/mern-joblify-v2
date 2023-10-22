import { FaUserCircle, FaCaretDown } from "react-icons/fa";
import Wrapper from '../assets/wrappers/LogoutContainer'
import { useState } from "react";
import { useGetCurrentUserQuery, useLogoutMutation } from "../features/api/apiSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";




const LogoutContainer = () => {
    const { data, isSuccess } = useGetCurrentUserQuery()
    const [logout, { isLoading }] = useLogoutMutation()
    const [showLogout, setShowLogout] = useState(false)
    const navigate = useNavigate()
    const handleLogout = async () => {
        try {
            await logout().unwrap()
            toast.success("Logout Successfully")
            navigate('/login')
        } catch (error) {
            toast.error(error?.data?.msg)
        }
    }

    if (isSuccess)
        return (
            <Wrapper>
                <button type="button" className="btn logout-btn" onClick={() => setShowLogout(!showLogout)}>
                    {data?.user?.avatar ? <img src={data?.user?.avatar} alt="avatar" className="img" />
                        : <FaUserCircle />}
                    {data?.user?.name}
                    <FaCaretDown />
                </button>
                <div className={showLogout ? 'dropdown show-dropdown' : 'dropdown'}>
                    <button type="button" className="dropdown-btn" onClick={handleLogout} disabled={isLoading}>
                        logout
                    </button>
                </div>
            </Wrapper>
        )
}
export default LogoutContainer
