import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  step: 1,
  task: null,
  editTask: false,
  // paymentLoading: false,
}

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    setStep: (state, action) => {
      state.step = action.payload
    },
    setTask: (state, action) => {
      state.task = action.payload
    },
    setEditTask: (state, action) => {
      state.editTask = action.payload
    },
    // setPaymentLoading: (state, action) => {
    //   state.paymentLoading = action.payload
    // },

    resetTaskState: (state) => {
      state.step = 1
      state.task = null
      state.editTask = false
    },

  },

})

export const {
  setStep,
  setTask,
  setEditTask,
  // setPaymentLoading,
  resetTaskState,
} = taskSlice.actions

export default taskSlice.reducer