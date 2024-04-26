import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { markSubsectionAsComplete } from '../../../services/operations/taskDetailsAPI';
import { updateCompletedSubsections } from '../../../slices/viewTaskSlice';
// import { Player } from 'video-react';
// import '~video-react/dist/video-react.css';
// import {AiFillPlayCircle} from "react-icons/ai"
import IconBtn from '../../common/IconBtn';

const SubsectionDetails = () => {

  const {taskId, sectionId, subSectionId} = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const timerRef = useRef();
  const {token} = useSelector((state)=>state.auth);
  const {taskSectionData, taskEntireData, completedSubsections} = useSelector((state)=>state.viewTask);

  const [subsectionData, setSubsectionData] = useState([]);
  const [subsectionEnded, setSubsectionEnded] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(()=> {

    const setSubsectionSpecificDetails = async() => {
        if(!taskSectionData.length)
            return;
        if(!taskId && !sectionId && !subSectionId) {
            navigate("/dashboard/enrolled-challenges");
        }
        else {
            //let's assume k all 3 fields are present

            const filteredData = taskSectionData.filter(
                (task) => task._id === sectionId
            )

            const filteredSubsectionData = filteredData?.[0].subSection.filter(
                (data) => data._id === subSectionId
            )

            setSubsectionData(filteredSubsectionData[0]);
            setSubsectionEnded(false);

        }
    }
    setSubsectionSpecificDetails();

  },[taskSectionData, taskEntireData, location.pathname])

  const isFirstSubsection = () => {
    const currentSectionIndex = taskSectionData.findIndex(
        (data) => data._id === sectionId
    )

    const currentSubSectionIndex = taskSectionData[currentSectionIndex].subSection.findIndex(
        (data) => data._id === subSectionId
    )
    if(currentSectionIndex === 0 && currentSubSectionIndex === 0) {
        return true;
    }
    else {
        return false;
    }
  } 

  const isLastSubsection = () => {
    const currentSectionIndex = taskSectionData.findIndex(
        (data) => data._id === sectionId
    )

    const noOfSubSections = taskSectionData[currentSectionIndex].subSection.length;

    const currentSubSectionIndex = taskSectionData[currentSectionIndex].subSection.findIndex(
        (data) => data._id === subSectionId
    )

    if(currentSectionIndex === taskSectionData.length - 1 &&
        currentSubSectionIndex === noOfSubSections - 1) {
            return true;
        }
    else {
        return false;
    }


  }

  const goToNextSubsection = () => {
    const currentSectionIndex = taskSectionData.findIndex(
        (data) => data._id === sectionId
    )

    const noOfSubSections = taskSectionData[currentSectionIndex].subSection.length;

    const currentSubSectionIndex = taskSectionData[currentSectionIndex].subSection.findIndex(
        (data) => data._id === subSectionId
    )

    if(currentSubSectionIndex !== noOfSubSections - 1) {
        //same section ki next video me jao
        const nextSubSectionId = taskSectionData[currentSectionIndex].subSection[currentSectionIndex + 1]._id;
        //next video pr jao
        navigate(`/view-challenge/${taskId}/section/${sectionId}/sub-section/${nextSubSectionId}`)
    }
    else {
        //different section ki first video
        const nextSectionId = taskSectionData[currentSectionIndex + 1]._id;
        const nextSubSectionId = taskSectionData[currentSectionIndex + 1].subSection[0]._id;
        ///iss voide par jao 
        navigate(`/view-challenge/${taskId}/section/${nextSectionId}/sub-section/${nextSubSectionId}`)
    }
  }

  const goToPrevVideo = () => {

    const currentSectionIndex = taskSectionData.findIndex(
        (data) => data._id === sectionId
    )

    const noOfSubSections = taskSectionData[currentSectionIndex].subSection.length;

    const currentSubSectionIndex = taskSectionData[currentSectionIndex].subSection.findIndex(
        (data) => data._id === subSectionId
    )

    if(currentSubSectionIndex != 0 ) {
        //same section , prev video
        const prevSubSectionId = taskSectionData[currentSectionIndex].subSection[currentSubSectionIndex - 1];
        //iss video par chalge jao
        navigate(`/view-challenge/${taskId}/section/${sectionId}/sub-section/${prevSubSectionId}`)
    }
    else {
        //different section , last video
        const prevSectionId = taskSectionData[currentSectionIndex - 1]._id;
        const prevSubSectionLength = taskSectionData[currentSectionIndex - 1].subSection.length;
        const prevSubSectionId = taskSectionData[currentSectionIndex - 1].subSection[prevSubSectionLength - 1]._id;
        //iss video par chalge jao
        navigate(`/view-challenge/${taskId}/section/${prevSectionId}/sub-section/${prevSubSectionId}`)

    }


  }

  const handleSubsectionCompletion = async() => {

    ///dummy code, baad me we will replace it witht the actual call
    setLoading(true);
    //PENDING - > Task Progress PENDING
    const res = await markSubsectionAsComplete({taskId: taskId, subSectionId: subSectionId}, token);
    //state update
    if(res) {
        dispatch(updateCompletedSubsections(subSectionId)); 
    }
    setLoading(false);

  }
  return (
    <div>
      {
        !subsectionData ? (<div>
            No Data Found
            </div>)
        : (
            // <Player
            //     ref = {playerRef}
            //     aspectRatio="16:9"
            //     playsInline
            //     onEnded={() => setVideoEnded(true)}
            //     src={videoData?.videoUrl}
            //      >

            //     <AiFillPlayCircle  />

            //     {
            //         videoEnded && (
            //             <div>
            //                 {
            //                     !completedLectures.includes(subSectionId) && (
            //                         <IconBtn 
            //                             disabled={loading}
            //                             onclick={() => handleLectureCompletion()}
            //                             text={!loading ? "Mark As Completed" : "Loading..."}
            //                         />
            //                     )
            //                 }

            //                 <IconBtn 
            //                     disabled={loading}
            //                     onclick={() => {
            //                         if(playerRef?.current) {
            //                             playerRef.current?.seek(0);
            //                             setVideoEnded(false);
            //                         }
            //                     }}
            //                     text="Rewatch"
            //                     customClasses="text-xl"
            //                 />

            //                 <div>
            //                     {!isFirstVideo() && (
            //                         <button
            //                         disabled={loading}
            //                         onClick={goToPrevVideo}
            //                         className='blackButton'
            //                         >
            //                             Prev
            //                         </button>
            //                     )}
            //                     {!isLastVideo() && (
            //                         <button
            //                         disabled={loading}
            //                         onClick={goToNextVideo}
            //                         className='blackButton'>
            //                             Next
            //                         </button>
            //                     )}
            //                 </div>
            //             </div>
            //         )
            //     }
            // </Player>
            <div>
            Timer
            </div>
        )
      }
      <h1 className="mt-4 text-3xl font-semibold">
        {subsectionData?.title}
      </h1>
      <p className="pt-2 pb-6">
        {subsectionData?.description}
      </p>
    </div>
  )
}

export default SubsectionDetails
