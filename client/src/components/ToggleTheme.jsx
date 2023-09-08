import { BsFillSunFill, BsFillMoonFill } from 'react-icons/bs'
import Wrapper from '../assets/wrappers/ThemToggle'
import { useDashboardContext } from '../hooks/useDashboardContext'



const ToggleTheme = () => {
    const { isDarkTheme, toggleDarkTheme } = useDashboardContext()
    return (
        <Wrapper onClick={toggleDarkTheme}>
            {isDarkTheme ? <BsFillSunFill className='toggle-icon' />
                : <BsFillMoonFill className='toggle-icon' />}
        </Wrapper>
    )
}

export default ToggleTheme
