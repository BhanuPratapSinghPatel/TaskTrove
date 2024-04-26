import React from 'react'
import HighlightText from '../HomePage/HighlightText';
import CTAButton from "../../core/HomePage/Button";

const LearningGridArray = [
    {
      order: -1,
      heading: "Empowering Individuals To Excel In Their",
      highlightText: "Tasks And Challenges",
      description:
        "Our platform transforms daily routines into extraordinary achievements, accesible to all, across the globe",
      BtnText: "Take Charge",
      BtnLink: "/",
    },
    {
      order: 1,
      heading: "Task Management",
      description:
        "Get started with our 75-Day and Weight-Loss Challenges",
    },
    {
      order: 2,
      heading: "Task Completion",
      description:
        "Track and complete tasks with our easy-to-use interface",
    },
    {
      order: 3,
      heading: "Achievement Badges",
      description:
        "Achieve Badges on reaching milestones and on completion of tasks and challenges",
    },
    {
      order: 4,
      heading: "Progress Tracking",
      description:
        "Track Progress through graphs and statistical approach",
    },
    {
      order: 5,
      heading: "Gain Confidence",
      description:
        "Interact with our supportive community",
    },
  ];


const LearningGrid = () => {
  return (
    <div className='grid  grid-col-1 lg:grid-cols-4 mb-10 p-5 lg:w-fit'>
    {
        LearningGridArray.map( (card, index) => {
            return (
                <div
                key={index}
                className={`${index === 0 && "lg:col-span-2 lg:h-[280px] p-5"}
                ${
                    card.order % 2 === 1 ? "bg-richblack-700 lg:h-[280px] p-5" : "bg-richblack-800 lg:h-[280px] p-5"
                }
                ${card.order === 3 && "lg:col-start-2"}
                ${card.order < 0 && "bg-transparent"}
                `}
                >
                {
                    card.order < 0 
                    ? (
                        <div className='lg:w-[90%] flex flex-col pb-5 gap-3'>
                            <div className='text-4xl font-semibold text-richblack-300'>
                                {card.heading}
                                <HighlightText text={card.highlightText} />
                            </div>
                            <p className='font-medium text-richblack-500'>
                                {card.description}
                            </p>
                            <div className='w-fit mt-4'>
                                <CTAButton active={true} linkto={card.BtnLink}>
                                    {card.BtnText}
                                </CTAButton>
                            </div>
                        </div>
                    )
                    : (<div className='flex flex-col gap-8 p-7'>
                        <h1 className='text-richblack-5 text-lg'>
                            {card.heading}
                        </h1>
                        <p className='text-richblack-300 font-medium'>
                            {card.description}
                        </p>
                    </div>)
                }

                </div>
            )
        } )
    } 
    </div>
  )
}

export default LearningGrid
