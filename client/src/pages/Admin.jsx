import { FaSuitcaseRolling, FaCalendarCheck } from "react-icons/fa"
import Wrapper from '../assets/wrappers/StatsContainer'
import { StatItem } from "../components"
import { useGetAppStatsQuery } from "../features/api/apiSlice"
const Admin = () => {
    const { data, isSuccess } = useGetAppStatsQuery()

    if (isSuccess)
        return (
            <Wrapper>
                <StatItem
                    title='current users'
                    count={data?.users}
                    color='#e9b949'
                    bcg='#fcefc7'
                    icon={<FaSuitcaseRolling />}
                />
                <StatItem
                    title='total jobs'
                    count={data?.jobs}
                    color='#647acb'
                    bcg='#e0e8f9'
                    icon={<FaCalendarCheck />}
                />
            </Wrapper>
        )
}

export default Admin