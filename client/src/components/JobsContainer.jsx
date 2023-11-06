import Wrapper from "../assets/wrappers/JobsContainer";
import Job from "./Job";
import PaginationButton from "./PaginationButton";
const JobContainer = ({ data }) => {
  const { numOfPages, currentPage } = data;
  if (data.jobs.length === 0) {
    return (
      <Wrapper>
        <h2>No jobs to display...</h2>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <h5>
        {data.totalJobs} job{data.jobs.length > 1 && "s"} found
      </h5>
      <div className="jobs">
        {data.jobs.map((job) => {
          return <Job key={job._id} {...job} />;
        })}
      </div>
      {numOfPages > 1 && <PaginationButton />}
    </Wrapper>
  );
};

export default JobContainer;
