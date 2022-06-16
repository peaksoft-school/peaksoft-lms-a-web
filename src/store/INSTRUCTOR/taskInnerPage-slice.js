import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { baseFetch } from '../../api/baseFetch'

const initialState = {
   tasks: [],
}

export const getTask = createAsyncThunk(
   'taskInnerPage/getTask',
   async (id, { rejectWithValue, dispatch }) => {
      dispatch(clearTask())
      try {
         const response = await baseFetch({
            path: `api/tasks/${id}`,
            method: 'GET',
         })
         dispatch(setTasks(response))
         return response
      } catch (error) {
         return rejectWithValue(error.message)
      }
   }
)

export const taskInnerPageSlice = createSlice({
   name: 'taskInnerPage',
   initialState,
   reducers: {
      setTasks(state, action) {
         state.tasks = [action.payload]
      },
      clearTask(state) {
         state.tasks = []
      },
   },
})

export const { setTasks, clearTask } = taskInnerPageSlice.actions
