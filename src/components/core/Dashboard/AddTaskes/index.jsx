import RenderSteps from "./RenderSteps"

export default function AddTaskes() {
  return (
    <>
      <div className="flex w-full items-start gap-x-6">
        <div className="flex flex-1 flex-col">
          <h1 className="mb-14 text-3xl font-medium text-richblack-5">
            Add Task
          </h1>
          <div className="flex-1">
            <RenderSteps />
          </div>
        </div>
        {/* Course Upload Tips */}
        <div className="sticky top-10 hidden max-w-[400px] flex-1 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6 xl:block">
          <p className="mb-8 text-lg text-richblack-5">⚡ Task Upload Tips</p>
          <ul className="ml-5 list-item list-disc space-y-4 text-xs text-richblack-5">
            {/* <li>Set the Course Price option or make it free.</li> */}
            {/* <li>Standard size for the course thumbnail is 1024x576.</li> */}
            <li>Task Information controls the task overview.</li>
            <li>Task Builder is where you create & organize a task.</li>
            <li>
              Add Topics in the Task Builder section to create day-wise plans and goals.
            </li>
            {/* <li>
              Information from the Additional Data section shows up on the
              course single page.
            </li> */}
            <li>Add Task Benefits to help others in the community.</li>
            {/* <li>Notes to all enrolled students at once.</li> */}
          </ul>
        </div>
      </div>
    </>
  )
}