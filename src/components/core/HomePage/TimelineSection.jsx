import React from 'react'

import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg"
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg"
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg"
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg"
import TimeLineImage from "../../../../src/assets/Images/TimeLineImage.png.jpg"

const timeline = [
    {
        Logo: Logo1,
        heading: "Leadership",
        Description:"Get Badges After Completion Of Task",
    },
    {
        Logo: Logo2,
        heading: "Responsibility",
        Description:"Fully Committed To Success ",
    },
    {
        Logo: Logo3,
        heading: "Flexibility",
        Description:"Compete With Others",
    },
    {
        Logo: Logo4,
        heading: "Support",
        Description:"Built Community, Share Progress",
    },
];

const TimelineSection = () => {
  return (
    <div>
      <div className='flex flex-row gap-15 items-center'>

        <div className='w-[45%] flex flex-col gap-5'>
            {
                timeline.map( (element, index) => {
                    return (
                        <div className='flex flex-row gap-6' key={index}>

                            <div className='w-[50px] h-[50px] flex  justify-center items-center'>
                                <img src={element.Logo} 
                                alt='element logo'/>
                            </div>

                            <div>
                                <h2 className='font-semibold text-[18px]'>{element.heading}</h2>
                                <p className='text-base'>{element.Description}</p>
                            </div>

                        </div>
                    )
                } )
            }
        </div>
        <div className='relative shadow-blue-200 w-[600px]'>

            <img  src={TimeLineImage}
            alt="TimeLineImage"
            className='shadow-white object-cover h-fit'
            />

            

        </div>

      </div>
    </div>
  )
}

export default TimelineSection
