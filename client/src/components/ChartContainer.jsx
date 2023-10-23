import { useState } from "react";

import BarChartComp from "./BarChart";
import AreaChartComp from "./AreaChart";
import Wrapper from '../assets/wrappers/ChartContainer'

const ChartContainer = ({ data }) => {
    const [barChart, setBarChart] = useState(true)

    return (
        <Wrapper>
            <h4>Monthly Stats</h4>
            <button type="button" onClick={() => setBarChart(!barChart)}>
                {barChart ? 'Area Chart' : 'Bar Chart'}
            </button>
            {barChart ? <BarChartComp data={data} /> : <AreaChartComp data={data} />}
        </Wrapper>
    )
}

export default ChartContainer