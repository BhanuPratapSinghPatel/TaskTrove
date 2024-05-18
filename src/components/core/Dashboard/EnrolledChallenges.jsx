import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getUserEnrolledChallenges } from '../../../services/operations/profileAPI';
import ProgressBar from '@ramonak/react-progress-bar';
import { useNavigate } from 'react-router-dom'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';



const EnrolledChallenges = () => {
  const TileContent=({ activeStartDate, date, view }) => view === 'month' && date.getDay() === 0 ? <p>🏅</p> : null
    
  
  const { token } = useSelector((state) => state.auth);

  const [enrolledChallenges, setEnrolledChallenges] = useState(null);
  const [duration, setDuration] = useState(null)
  const navigate = useNavigate()
  let c = 0;

  const getEnrolledChallenges = async () => {
    try {
      const response = await getUserEnrolledChallenges(token);
      const filterPublishTask = response.userDetails.enrolledChallenges.filter((ele) => ele.status !== "Draft")
      setEnrolledChallenges(filterPublishTask);
      setDuration(response.arr)
    }
    catch (error) {
      console.log("Unable to Fetch Enrolled Challenges");
    }
  }

  useEffect(() => {
    getEnrolledChallenges();
  }, []);


  return (
    <>
      <div className="text-3xl text-richblack-500">Enrolled Challenges</div>
      <Calendar tileContent={TileContent}/>
      
      {!enrolledChallenges ? (
        <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
          <div className="spinner"></div>
        </div>
      ) : !enrolledChallenges.length ? (
        <p className="grid h-[10vh] w-full place-content-center text-richblack-5">
          You Have Not Enrolled In Any Challenges Yet.
          {/* TODO: Modify this Empty State */}
        </p>
      ) : (
        <div className="my-8 text-richblack-500">
          {/* Headings */}
          <div className="flex rounded-t-lg bg-richblack-50 ">
            <p className="w-[45%] px-5 py-3">Challenge Name</p>
            <p className="w-1/4 px-2 py-3">Duration</p>
            <p className="flex-1 px-2 py-3">Progress</p>
          </div>
          {/* Task Names */}
          {enrolledChallenges.map((challenge, i, arr) => (
            <div
              className={`flex items-center border border-richblack-700 ${i === arr.length - 1 ? "rounded-b-lg" : "rounded-none"
                }`}
              key={i}
            >
              <div
                className="flex w-[45%] cursor-pointer items-center gap-4 px-5 py-3"
                onClick={() => {
                  navigate(
                    `/view-challenge/${challenge?._id}/section/${challenge.taskContent?.[0]?._id}/sub-section/${challenge.taskContent?.[0]?.subSection?.[0]?._id}`
                  )
                }}
              >
                {/* <img
                  src={course.thumbnail}
                  alt="course_img"
                  className="h-14 w-14 rounded-lg object-cover"
                /> */}
                <div className="flex max-w-xs flex-col gap-2">
                  <p className="font-semibold">{challenge.taskName}</p>
                  <p className="text-xs text-richblack-500">
                    {challenge.taskDescription.length > 50
                      ? `${challenge.taskDescription.slice(0, 50)}...`
                      : challenge.taskDescription}
                  </p>
                </div>
              </div>
              <div className="w-1/4 px-2 py-3">{duration[c++]}</div>
              <div className="flex w-1/5 flex-col gap-2 px-2 py-3">
                <p>Progress: {challenge.progressPercentage || 0}%</p>
                <ProgressBar
                  completed={challenge.progressPercentage || 0}
                  height="8px"
                  isLabelVisible={false}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  )
}

export default EnrolledChallenges
