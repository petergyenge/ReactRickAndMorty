import React from 'react'

const Pagination = ({PageNumber}) => {
  const next = () =>{
    PageNumber((x: number) => x + 1)
  }

  const prev = () =>{
    PageNumber((x: number) => x + 1)
  }
  return (
    <div className='felx justify-center items-center'>
      <button onClick={prev} className="btn btn-primary m-2">Prev</button>
      <button onClick={next} className="btn btn-primary m-2">Next</button>
    </div>
  )
}

export default Pagination