import { createContext, useState } from "react"



export const DashboardContext = createContext()

const DashboardProvider = ({ children, isDarkThemeEnabled }) => {
    const [showSidebar, setShowSidebar] = useState(false);
    const [isDarkTheme, setIsDarkTheme] = useState(isDarkThemeEnabled);


    const toggleSidebar = () => {
        setShowSidebar(!showSidebar);
    };

    const toggleDarkTheme = () => {
        const newDarkTheme = !isDarkTheme;
        setIsDarkTheme(newDarkTheme);
        document.body.classList.toggle('dark-theme', newDarkTheme);
        localStorage.setItem('darkTheme', newDarkTheme);
    };



    const value = {
        showSidebar,
        isDarkTheme,
        toggleDarkTheme,
        toggleSidebar,
    };

    return (
        <DashboardContext.Provider value={value}>
            {children}
        </DashboardContext.Provider>
    );
};
export default DashboardProvider;