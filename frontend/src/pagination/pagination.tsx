import React from "react";
import ReactPaginate from "react-paginate";

const Pagination = ({ page, pageNumber, setPageNumber }) => {
  return(

      <ReactPaginate 
        className="flex justify-center items-center flex-row my-5"
        nextLabel = "Next"
        previousLabel = "Prev"
        nextClassName="bg-cyan-600 hover:bg-cyan-800 text-white font-bold py-2 px-4 rounded-full"
        previousClassName="bg-cyan-600 hover:bg-cyan-800 text-white font-bold py-2 px-4 rounded-full"
        pageLinkClassName="btn btn-xs m-1"
        activeClassName="btn btn-info"
        onPageChange={(data) => {
          setPageNumber(data.selected + 1)
        }}
        pageCount={page} 
        />

  )

};

export default Pagination;


