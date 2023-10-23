import { ChartContainer, StatsContainer } from "../components"
import { useShowStatsQuery } from "../features/api/apiSlice"

const Stats = () => {
    const { data, isSuccess } = useShowStatsQuery()
    if (isSuccess)
        return (
            <>
                <StatsContainer defaultStats={data?.defaultStats} />
                {data?.monthlyStats?.length > 0 && (
                    <ChartContainer data={data?.monthlyStats} />
                )}
            </>
        )
}

export default Stats
