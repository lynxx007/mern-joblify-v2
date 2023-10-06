import Wrapper from '../assets/wrappers/Dashboard'
import { Outlet, redirect, useLoaderData } from 'react-router-dom'
import { BigSidebar, Navbar, SmallSidebar } from '../components'
import DashboardProvider from '../context/DashboardContext'

import { checkDefaultTheme } from '../utils/checkDefaultTheme'
import { customFetch } from '../utils/customFetch'


const isDarkThemeEnabled = checkDefaultTheme()

export const loader = async () => {
    try {
        const { data } = await customFetch('users/current-user')
        return data
    } catch (error) {
        return redirect('/')
    }
}

const DashboardLayout = () => {
    const { user } = useLoaderData()
    return (
        <DashboardProvider isDarkThemeEnabled={isDarkThemeEnabled}>
            <Wrapper>
                <main className='dashboard'>
                    <SmallSidebar />
                    <BigSidebar />
                    <div>
                        <Navbar />
                        <div className='dashboard-page'>
                            <Outlet context={{ user }} />
                        </div>
                    </div>
                </main>
            </Wrapper>
        </DashboardProvider>
    )
}



export default DashboardLayout
