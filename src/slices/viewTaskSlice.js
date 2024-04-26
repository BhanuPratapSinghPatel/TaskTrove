import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  taskSectionData: [],
  taskEntireData: [],
  completedSubsections: [],
  totalNoOfSubsections: 0,
}

const viewTaskSlice = createSlice({
  name: "viewTask",
  initialState,
  reducers: {
    setTaskSectionData: (state, action) => {
      state.taskSectionData = action.payload
    },
    setEntireTaskData: (state, action) => {
      state.taskEntireData = action.payload
    },
    setTotalNoOfSubsections: (state, action) => {
      state.totalNoOfSubsections = action.payload
    },
    setCompletedSubsections: (state, action) => {
      state.completedSubsections = action.payload
    },
    updateCompletedSubsections: (state, action) => {
      state.completedSubsections = [...state.completedSubsections, action.payload]
    },
  },
})

export const {
  setTaskSectionData,
  setEntireTaskData,
  setTotalNoOfSubsections,
  setCompletedSubsections,
  updateCompletedSubsections,
} = viewTaskSlice.actions

export default viewTaskSlice.reducer