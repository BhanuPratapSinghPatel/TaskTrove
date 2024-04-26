import React from 'react'
import HighlightText from '../HomePage/HighlightText'

const Quote = () => {
  return (
    <div>
      We are enthusiastic about evolving the way we administer our day-to-day work. Our radical platform
      <HighlightText text={"combines technology"}/>
      <span className='text-brown-500'>
        {" "}
        support
      </span>
      , and community to create an 
      <span  className='text-brown-500'>
      {" "}
        unparalleled, streamlined and engaging experience for managing tasks.
      </span>
    </div>
  )
}

export default Quote
