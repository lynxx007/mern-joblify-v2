import { createContext, useState } from "react"
import { useNavigate } from "react-router-dom";
import { customFetch } from "../utils/customFetch";
import { toast } from "react-toastify";



export const DashboardContext = createContext()

const DashboardProvider = ({ children, isDarkThemeEnabled }) => {
    const [showSidebar, setShowSidebar] = useState(false);
    const [isDarkTheme, setIsDarkTheme] = useState(isDarkThemeEnabled);
    const navigate = useNavigate()

    const toggleSidebar = () => {
        setShowSidebar(!showSidebar);
    };

    const toggleDarkTheme = () => {
        const newDarkTheme = !isDarkTheme;
        setIsDarkTheme(newDarkTheme);
        document.body.classList.toggle('dark-theme', newDarkTheme);
        localStorage.setItem('darkTheme', newDarkTheme);
    };

    const logoutUser = async () => {
        navigate('/')
        await customFetch.get('/auth/logout')
        toast.success('Logging out...')
    }

    const value = {
        showSidebar,
        isDarkTheme,
        toggleDarkTheme,
        toggleSidebar,
        logoutUser
    };

    return (
        <DashboardContext.Provider value={value}>
            {children}
        </DashboardContext.Provider>
    );
};
export default DashboardProvider;