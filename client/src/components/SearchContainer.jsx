import FormRow from "./FormRow";
import FormRowSelect from "./FormRowSelect";
import { Form, Link, useSubmit } from "react-router-dom";
import { JOB_TYPE, JOB_STATUS, JOB_SORT_BY } from "../../../utils/constants";
import Wrapper from "../assets/wrappers/DashboardFormpage";


const SearchContainer = ({handleChange}) => {
  
    return (
      <Wrapper>
        <Form className="form">
          <h5 className="form-title">search form</h5>
          <div className="form-center">
            {/* search position */}
            <FormRow type="search" name="search" defaultValue="all" onChange={handleChange} />
            <FormRowSelect
              labelText="job status"
              name="jobStatus"
              list={["all", ...Object.values(JOB_STATUS)]}
              handleSelectChange={handleChange}
            />
            <FormRowSelect
              labelText="job type"
              name="jobType"
              list={["all", ...Object.values(JOB_TYPE)]}
              defaultValue="all"
              handleSelectChange={handleChange}
            />
            <FormRowSelect
              name="sort"
              defaultValue="newest"
              list={[...Object.values(JOB_SORT_BY)]}
              handleSelectChange={handleChange}
            />

            <Link to="/dashboard/all-jobs" className="btn form-btn delete-btn" >
              Reset Search Values
            </Link>
          </div>
        </Form>
      </Wrapper>
    );
};

export default SearchContainer;
