import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useParams } from 'react-router-dom';
import { getFullDetailsOfTask } from '../services/operations/taskDetailsAPI';
import { setCompletedSubsections, setTaskSectionData, setEntireTaskData, setTotalNoOfSubsections } from '../slices/viewTaskSlice';
import SubsectionDetailsSidebar from '../components/core/ViewTask/SubsectionDetailsSidebar';
import TaskReviewModal from '../components/core/ViewTask/TaskReviewModal';

const ViewTask = () => {

    const [reviewModal, setReviewModal] = useState(false);
    const {taskId} = useParams();
    const {token} = useSelector((state)=>state.auth);
    const dispatch = useDispatch();

    useEffect(()=> {
        const setTaskSpecificDetails = async() => {
              const taskData = await getFullDetailsOfTask(taskId, token);
              dispatch(setTaskSectionData(taskData.taskDetails.taskContent));
              dispatch(setEntireTaskData(taskData.taskDetails));
              dispatch(setCompletedSubsections(taskData.completedSubsections));
              let subsections = 0;
              taskData?.taskDetails?.taskContent?.forEach((sec) => {
                 subsections+= sec.subSection.length
              })  
              dispatch(setTotalNoOfSubsections(subsections));
        }
        setTaskSpecificDetails();
    },[]);


  return (
    <>
        <div className="relative flex min-h-[calc(100vh-3.5rem)]">
            <SubsectionDetailsSidebar setReviewModal={setReviewModal} />
            <div className="h-[calc(100vh-3.5rem)] flex-1 overflow-auto">
                <div className="mx-6">
                    <Outlet />
                </div>
            </div>
        </div>
        {reviewModal && <TaskReviewModal setReviewModal={setReviewModal} />}
    </>
  )
}

export default ViewTask
