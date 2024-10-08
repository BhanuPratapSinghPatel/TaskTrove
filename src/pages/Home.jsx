import React from 'react'
import {FaArrowRight} from "react-icons/fa"
import {Link} from "react-router-dom"
import HighlightText from '../components/core/HomePage/HighlightText'

import CTAButton from "../components/core/HomePage/Button"
import Banner from "../assets/Images/banner2.mp4"

import CodeBlocks from "../components/core/HomePage/CodeBlocks"
import Footer from '../components/common/Footer'
import TimelineSection from '../components/core/HomePage/TimelineSection'
import LearningLanguageSection from '../components/core/HomePage/LearningLanguageSection'
import InstructorSection from '../components/core/HomePage/InstructorSection'
import ReviewSlider from '../components/common/ReviewSlider'
import todoblueimg from '../assets/Images/moving_todolistblue.gif'
// import Footer from '../components/common/Footer'
// import ExploreMore from '../components/core/HomePage/ExploreMore'


const Home = () => {
  return (
    
    <div>
      {/*Section1  */}
      <div className='relative mx-auto flex flex-col w-11/12 max-w-maxContent items-center 
      text-richblack-200 justify-between'>

        <Link to={"/signup"}>
            <div className=' group mt-16 p-1 mx-auto rounded-full bg-richblack-800 font-bold text-richblack-300
            transition-all duration-200 hover:scale-95 w-fit'>
                <div className='flex flex-row items-center gap-2 rounded-full px-10 py-[5px]
                transition-all duration-200 group-hover:bg-richblack-900'>
                    <p>Commit Now</p>
                    <FaArrowRight />
                </div>
            </div>

        </Link>

        <div className='text-center text-4xl font-semibold mt-7'>
        Transforming Action Into
            <HighlightText text={" Habits "} />
        </div>

        <div className=' mt-4 w-[90%] text-center text-lg font-bold text-richblack-300'>
           Acquire A Comprehensive Platform To Track Day-To-Day Tasks, Set Personalized Challenges, And Build A Supportive Community.
        </div>

        <div className='flex flex-row gap-7 mt-8'>
            <CTAButton active={true} linkto={"/signup"}> 
              Sign Up
            </CTAButton>

            <CTAButton active={false} linkto={"/login"}> 
                Login
            </CTAButton>
        </div>

        <div className='mx-3 my-12 shadow-blue-200'>
            <video
            muted
            loop
            autoPlay
            >
            <source  src={Banner} type="video/mp4" />
            </video>
        </div>

        {/* Code Section 1 */}
        <div>
            

            <CodeBlocks 
                position={"lg:flex-row"}
                heading={
                    <div className='text-4xl font-semibold'>
                        Unlock Your
                        <HighlightText text={" Potential "}/>
                        With Our App
                    </div>
                }
                subheading = {
                    "We Are What We Repeatedly Do. Excellence Is Not An Act, But a Habit. You Don't Have To Be Great To Start, But You Have To Start To Be Great."
                }
                
                ctabtn1={
                    {
                        btnText: "Try It Yourself",
                        linkto: "/signup",
                        active: true,
                    }
                }
                ctabtn2={
                    {
                        btnText: "Login",
                        linkto: "/login",
                        active: false,
                    }
                }
                    
                codeblock={`Maximize your productivity with our app interface.\nStay organized with task prioritization tools.\nTrack your progress with insightful analytics and reports.\nEffortlessly manage your workload with easy-to-use features.\nStay motivated with personalized goal-setting capabilities.\nAchieve work-life balance with time management tools.\nAccess your tasks anytime, anywhere with cross-device syncing.`}
                codeColor={"text-yellow-25"}

                

            />
            {/* <img src={todoblueimg} alt="" /> */}
        </div>
                {/* Code Section 2 */}
        <div>
            <CodeBlocks 
                position={"lg:flex-row-reverse"}
                heading={
                    <div className='text-4xl font-semibold'>
                       Discover Our Top
                        <HighlightText text={"Features"}/>
                       
                    </div>
                }
                subheading = {
                    "Empowering Habits, Inspiring Journey. Join Our Community And Unlock Your Potential."
                }
                ctabtn1={
                    {
                        btnText: "Try It Yourself",
                        linkto: "/signup",
                        active: true,
                    }
                }
                ctabtn2={
                    {
                        btnText: "Learn More",
                        linkto: "/login",
                        active: false,
                    }
                }

            />

           
        </div>

      </div>

      {/*Section 2  */}
      <div className='bg-pure-greys-5 text-richblack-700'>
            <div className='homepage_bg h-[310px]'>

                <div className='w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-5 mx-auto'>
                    <div className='h-[150px]'></div>
                    <div className='flex flex-row gap-7 text-white '>
                        <CTAButton active={true} linkto={"/signup"}>
                            <div className='flex items-center gap-3' >
                                Explore Full Catalog
                                <FaArrowRight />
                            </div>
                            
                        </CTAButton>
                        <CTAButton active={false} linkto={"/signup"}>
                            <div>
                                Learn More
                            </div>
                        </CTAButton>
                    </div>

                </div>


            </div>

            <div className='mx-auto w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-7'>

                <div className='flex flex-row gap-5 mb-10 mt-[95px]'>
                    <div className='text-4xl font-semibold w-[45%]'>
                       Popular Habits Among The User
                        <HighlightText text={" 75-Day Hard Challenge"} />
                    </div>

                    <div className='flex flex-col gap-10 w-[40%] items-start'>
                    <div className='text-[16px]'>
                    We Are What We Repeatedly Do. Excellence Is Not An Act, But A Habit.
                    </div>
                    <CTAButton active={true} linkto={"/signup"}>
                        <div>
                            Learn More
                        </div>
                    </CTAButton>
                    </div>

                </div>
                
                

                <TimelineSection />

                <LearningLanguageSection />

            </div>

            

      </div>

      {/*Section 3 */}
            <div className='w-11/12 mx-auto max-w-maxContent flex-col items-center justify-between gap-8 first-letter text-white'>

        <InstructorSection />

        <h2 className='text-center text-4xl font-semibold mt-8 text-richblack-200'>Review From Other Users</h2>
        {/* Review Slider here */}
        <ReviewSlider/>
        </div>

      {/*Footer */}

                    <Footer/>
    </div>
  )
}

export default Home
