import Wrapper from '../assets/wrappers/BigSidebar'
import Logo from './Logo'
import { useDashboardContext } from '../hooks/useDashboardContext'
import NavLinks from './NavLinks'
const BigSidebar = () => {
    const { showSidebar } = useDashboardContext()
    return (
        <Wrapper>
            <div className={showSidebar ? 'sidebar-container' : 'sidebar-container show-sidebar'}>
                <div className='content'>
                    <header>
                        <Logo />
                    </header>
                    <NavLinks isBidSidebar />
                </div>
            </div>
        </Wrapper>
    )
}

export default BigSidebar