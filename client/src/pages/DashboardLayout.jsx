import Wrapper from '../assets/wrappers/Dashboard'
import { Outlet } from 'react-router-dom'
import { BigSidebar, Navbar, SmallSidebar } from '../components'
import { useState, createContext } from 'react'

export const DashboardContext = createContext()

const DashboardLayout = () => {
    const [showSidebar, setShowSidebar] = useState(false)
    const [isDarkTheme, setIsDarkTheme] = useState(false)

    const toggleSidebar = () => {
        setShowSidebar(!showSidebar)
    }

    const toggleDarkTheme = () => {
        console.log('toggled');
    }

    const value = {
        showSidebar,
        isDarkTheme,
        toggleDarkTheme,
        toggleSidebar
    }

    return (
        <DashboardContext.Provider value={value}>
            <Wrapper>
                <main className='dashboard'>
                    <SmallSidebar />
                    <BigSidebar />
                    <div>
                        <Navbar />
                        <div className='dashboard-page'>
                            <Outlet />
                        </div>
                    </div>
                </main>
            </Wrapper>
        </DashboardContext.Provider>
    )
}



export default DashboardLayout
