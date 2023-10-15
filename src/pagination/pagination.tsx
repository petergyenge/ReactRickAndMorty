import React from 'react'
import ReactPaginate from "react-paginate";


const Pagination = ({pageNumber, setPageNumber}) => {
  const next = () =>{
    if(pageNumber === 42) return
    setPageNumber((x: number) => x + 1)
  }

  const prev = () =>{
    if(pageNumber === 1) return
    setPageNumber((x: number) => x - 1)
  }
  return (
    <div className='felx justify-center items-center'>
      <button onClick={prev} disabled = {false} className="btn btn-primary m-2">Prev</button>
      <button onClick={next} disabled = {false} className="btn btn-primary m-2">Next</button>
    </div>
  )
}

export default Pagination