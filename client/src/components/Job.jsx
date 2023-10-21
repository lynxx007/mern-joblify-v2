import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from "react-icons/fa";
import { Link, Form } from 'react-router-dom'
import Wrapper from '../assets/wrappers/Job'
import JobInfo from './JobInfo'
import day from "dayjs";
import advancedFormat from 'dayjs/plugin/advancedFormat'
import { useDeleteJobMutation } from "../features/api/apiSlice";
import { toast } from "react-toastify";
day.extend(advancedFormat)

const Job = ({ _id, position, company, jobLocation, jobType, createdAt, jobStatus }) => {
    const date = day(createdAt).format('MMMM Do, YYYY');
    const [deleteJob, { isLoading }] = useDeleteJobMutation()

    const handleDeleteJob = async e => {
        e.preventDefault()
        try {
            await deleteJob(_id).unwrap()
            toast.success('Job deleted successfully')
        } catch (error) {
            toast.error(error?.data?.msg)
        }
    }
    return (
        <Wrapper>
            <header>
                <div className="main-icon">{company.charAt(0)}</div>
                <div className="info">
                    <h5>{position}</h5>
                    <p>{company}</p>
                </div>
            </header>
            <div className="content">
                <div className="content-center">
                    <JobInfo icon={<FaLocationArrow />} text={jobLocation} />
                    <JobInfo icon={<FaCalendarAlt />} text={date} />
                    <JobInfo icon={<FaBriefcase />} text={jobType} />
                    <div className={`status ${jobStatus}`}>{jobStatus}</div>
                </div>
                <footer className="actions">
                    <Link to={`/dashboard/edit-job/${_id}`} className="btn edit-btn">Edit</Link>
                    <Form method="post" onSubmit={handleDeleteJob} >
                        <button type="submit" className="btn delete-btn" disabled={isLoading}>
                            {isLoading ? 'Deleting...' : 'Delete'}
                        </button>
                    </Form>
                </footer>
            </div>
        </Wrapper>
    )
}
export default Job