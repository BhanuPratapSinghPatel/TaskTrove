import React from 'react'
import Instructor from "../../../assets/Images/graphlevels.jpg"
import HighlightText from './HighlightText'
import CTAButton from "../HomePage/Button"
import { FaArrowRight } from 'react-icons/fa'

const InstructorSection = () => {
  return (
    <div className='mt-16   bg-transparent bg-opacity-100'>
      <div className='flex flex-row gap-20 items-center bg-opacity-50 bg-transparent'>

        <div className='w-[50%]'>
            <img
                src={Instructor}
                alt=""
                className='shadow-white'
            />
        </div>

        <div className='w-[50%] flex flex-col gap-10'>
            <div className='text-4xl font-semibold w-[50%] text-richblack-200'>
                Are You 
                <HighlightText text={"READY"} />
            </div>

            <p className='font-medium text-[16px] w-[80%] text-richblack-300'>
            Empowering Habits, Inspiring Journey. Join Our Community And Unlock Your Potential.
            </p>

            <div className='w-fit'>
                <CTAButton active={true} linkto={"/signup"}>
                    <div className='flex flex-row gap-2 items-center'>
                        Start Today
                        <FaArrowRight />
                    </div>
                </CTAButton>
            </div>


        </div>

      </div>
    </div>
  )
}

export default InstructorSection
