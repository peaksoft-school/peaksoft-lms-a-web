import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { baseFetch } from '../api/baseFetch'

const initialState = {
   instructorCourseData: [],
   isLoading: null,
}

export const getInstructorCourses = createAsyncThunk(
   'instructorCourses/getInstructorsCourses',
   async (id, { rejectWithValue, dispatch }) => {
      console.log(id)
      try {
         const response = await baseFetch({
            path: `api/instructors/courses`,
            method: 'GET',
         })
         console.log(response)
         dispatch(instructorCoursesData(response))
         return response
      } catch (error) {
         return rejectWithValue(error.message)
      }
   }
)
const setIsLoading = (state) => {
   state.isLoading = false
}
const setPending = (state) => {
   state.isLoading = true
}

export const instructorCoursesSlice = createSlice({
   name: 'instructorCourses',
   initialState,
   reducers: {
      instructorCoursesData(state, action) {
         console.log(action.payload)
         state.instructorCourseData = action.payload
      },
   },
   extraReducers: {
      [getInstructorCourses.pending]: setPending,
      [getInstructorCourses.rejected]: setIsLoading,
      [getInstructorCourses.fulfilled]: setPending,
   },
})

export const { instructorCoursesData } = instructorCoursesSlice.actions
