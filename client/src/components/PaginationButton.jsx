import { HiChevronDoubleLeft, HiChevronRight } from "react-icons/hi";
import Wrapper from "../assets/wrappers/PageBtnContainer";
import { useLocation, useNavigate } from "react-router-dom";

const PaginationButton = () => {
  const { search, pathname } = useLocation();
  const navigate = useNavigate();

  const handlePageChange = (pageNumb) => {
    const searchParams = new URLSearchParams(search);
    searchParams.set("page", pageNumb);
    navigate(`${pathname}?${searchParams.toString()}`);
  };

  const addPageButton = ({ pageNumb, activeClass }) => {
    return (
      <button
        className={`btn page-btn ${activeClass && "active"}`}
        key={pageNumb}
        onClick={() => handlePageChange(pageNumb)}
      >
        {pageNumb}
      </button>
    );
  };
  return (
    <Wrapper>
      <button className="btn prev-btn">
        <HiChevronDoubleLeft />
        Prev
      </button>
      <div></div>
    </Wrapper>
  );
};
export default PaginationButton;
