import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { editTaskDetails } from "../../../../../services/operations/taskDetailsAPI"
import { resetTaskState,setStep } from "../../../../../slices/TaskSlice"
import { TASK_STATUS } from "../../../../../utils/constants"
import IconBtn from "../../../../common/IconBtn"
import lapmimage from "../../../../../assets/Images/dizzy-lamp-2.gif"
export default function PublishTask() {
  const { register, handleSubmit, setValue, getValues } = useForm()

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { token } = useSelector((state) => state.auth)
  const { task } = useSelector((state) => state.task)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (task?.status === TASK_STATUS.PUBLISHED) {
      setValue("public", true)
    }
  }, [])

  const goBack = () => {
    dispatch(setStep(2))
  }

  const goToTaskes = () => {
    dispatch(resetTaskState())
    navigate("/dashboard/my-task")
  }

  const handleTaskPublish = async () => {
    // check if form has been updated or not
    if (
      (task?.status === TASK_STATUS.PUBLISHED &&
        getValues("public") === true) ||
      (task?.status === TASK_STATUS.DRAFT && getValues("public") === false)
    ) {
      // form has not been updated
      // no need to make api call
      goToTaskes()
      return
    }
    const formData = new FormData()
    formData.append("taskId", task._id)
    const taskStatus = getValues("public")
      ? TASK_STATUS.PUBLISHED
      : TASK_STATUS.DRAFT
    formData.append("status", taskStatus)
    setLoading(true)
    const result = await editTaskDetails(formData, token)
    if (result) {
      goToTaskes()
    }
    setLoading(false)
  }

  const onSubmit = (data) => {
    handleTaskPublish()
  }

  return (
    <div className="rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6">
      <p className="text-2xl font-semibold text-richblack-5">
        Publish Settings
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Checkbox */}
        <div className="my-6 mb-8">
          <label htmlFor="public" className="inline-flex items-center text-lg">
            <input
              type="checkbox"
              id="public"
              {...register("public")}
              className="border-gray-300 h-4 w-4 rounded bg-richblack-500 text-richblack-400 focus:ring-2 focus:ring-richblack-5"
            />
            <span className="ml-2 text-richblack-400">
              Make This Task As Public
            </span>
          </label>
        </div>

        {/* Next Prev Button */}
        <div className="ml-auto flex max-w-max items-center gap-x-4">
          <button
            disabled={loading}
            type="button"
            onClick={goBack}
            className="flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900"
          >
            Back
          </button>
          <IconBtn disabled={loading} text="Save Changes" />
        </div>
        <div className=" absolute -translate-y-1/3 translate-x-[700px]"><img src={lapmimage} alt="" /></div>
      </form>
    </div>
  )
}