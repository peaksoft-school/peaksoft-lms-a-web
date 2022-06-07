import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { baseFetch } from '../api/baseFetch'

const initialState = {
   tasks: [],
}

export const getTask = createAsyncThunk(
   'taskInnerPage/getTask',
   async (_, { rejectWithValue, dispatch }) => {
      try {
         const response = await baseFetch({
            path: 'api/tasks',
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
         state.tasks = action.payload
      },
   },
})

export const { setTasks } = taskInnerPageSlice.actions
