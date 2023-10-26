import JobContainer from "../components/JobsContainer";
import SearchContainer from "../components/SearchContainer";
import { useGetJobsQuery } from "../features/api/apiSlice";
import { useState } from "react";
const AllJobs = () => {
  const [formData, setFormData] = useState({});
  const { data } = useGetJobsQuery({
    search: formData.search,
    jobStatus: formData.jobStatus,
    jobType: formData.jobType,
    sort: formData.sort,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <SearchContainer handleChange={handleChange} />
      {data && <JobContainer data={data} />}
    </>
  );
};

export default AllJobs;
