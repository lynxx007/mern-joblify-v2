import { useGetJobsQuery } from "../features/api/apiSlice"
import Wrapper from '../assets/wrappers/JobsContainer'
import Job from "./Job"
const JobContainer = () => {
    const { data, isSuccess } = useGetJobsQuery()
    if (isSuccess && data.jobs.length === 0) {
        return (
            <Wrapper>
                <h2>No jobs to display...</h2>
            </Wrapper>
        )
    }
    if (isSuccess) {
        return (
            <Wrapper>
                <div className="jobs">
                    {data.jobs.map(job => {
                        return (
                            <Job key={job._id} {...job} />
                        )
                    })}
                </div>
            </Wrapper>
        )
    }

}

export default JobContainer