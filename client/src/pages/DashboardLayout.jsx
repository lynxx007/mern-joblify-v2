import Wrapper from '../assets/wrappers/Dashboard'
import { Outlet } from 'react-router-dom'
import { BigSidebar, Navbar, SmallSidebar } from '../components'
import DashboardProvider from '../context/DashboardContext'

import { checkDefaultTheme } from '../utils/checkDefaultTheme'



const isDarkThemeEnabled = checkDefaultTheme()



const DashboardLayout = () => {


    return (
        <DashboardProvider isDarkThemeEnabled={isDarkThemeEnabled}>
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
        </DashboardProvider>
    )
}


export default DashboardLayout
