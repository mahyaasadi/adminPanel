import React from "react";
import FeatherIcon from "feather-icons-react";

const ArticlesPagination = ({ nPages, currentPage, setCurrentPage }) => {
  const pageNumbers = [...Array(nPages + 1).keys()].slice(1);

  const nextPage = () => {
    if (currentPage !== nPages) setCurrentPage(currentPage + 1);
  };
  const prevPage = () => {
    if (currentPage !== 1) setCurrentPage(currentPage - 1);
  };

  return (
    <>
      <div className="pagination d-flex flex-wrap items-center justify-center gap-3 mt-4 marginb-3">
        <button onClick={prevPage} className="paginateBtn">
          <FeatherIcon
            icon="arrow-right"
            style={{ width: "13px", color: "white" }}
          />
        </button>

        <div dir="rtl" className="d-flex flex-wrap justify-center gap-3">
          {pageNumbers.map((pgNumber) => (
            <button
              key={pgNumber}
              onClick={() => setCurrentPage(pgNumber)}
              className={`paginateBtn gap-2 ${
                currentPage === pgNumber ? "activePaginateBtn" : ""
              }`}
            >
              {pgNumber}
            </button>
          ))}
        </div>
        <button onClick={nextPage} className="paginateBtn">
          <FeatherIcon
            icon="arrow-left"
            style={{ width: "13px", color: "white" }}
          />
        </button>
      </div>
    </>
  );
};
export default ArticlesPagination;