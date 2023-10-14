import React from 'react'

const Pagination = ({PageNumber}) => {
  const next = () =>{
    PageNumber((x: number) => x + 1)
  }

  const prev = () =>{
    PageNumber((x: number) => x + 1)
  }
  return (
    <div>
<button onClick={prev} className="btn btn-primary">Prev</button>
<button onClick={next} className="btn btn-primary">Next</button>
    </div>
  )
}

export default Pagination