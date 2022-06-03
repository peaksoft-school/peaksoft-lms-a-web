import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { baseFetch } from '../api/baseFetch'

const initialState = {
   tests: {},
   singleCourse: [],
}

export const getInstructorTests = createAsyncThunk(
   'instructorTests/getInstructorTests',
   async (id, { rejectWithValue, dispatch }) => {
      try {
         const response = await baseFetch({
            path: `api/tests/get/${id}`,
            method: 'GET',
         })
         dispatch(setInstructorTests(response))
         return response
      } catch (error) {
         return rejectWithValue(error.message)
      }
   }
)
export const getSingleCourse = createAsyncThunk(
   'instructorCourses/getSingleCourses',
   async (id, { dispatch }) => {
      dispatch(clearCourse)
      try {
         const response = await baseFetch({
            path: `api/courses/${id}`,
            method: 'GET',
         })
         dispatch(setSingleCourse(response))
         return response
      } catch (error) {
         return error.message
      }
   }
)

const setIsLoading = (state) => {
   state.isLoading = false
}
const setPending = (state) => {
   state.isLoading = true
}

export const instructorTestsSlice = createSlice({
   name: 'instructorTests',
   initialState,
   reducers: {
      setInstructorTests(state, action) {
         state.tests = action.payload
      },
      clearCourse(state) {
         state.singleCourse = null
      },
      setSingleCourse(state, action) {
         state.singleCourse = action.payload
      },
   },
   extraReducers: {
      [getInstructorTests.pending]: setPending,
      [getInstructorTests.rejected]: setIsLoading,
      [getInstructorTests.fulfilled]: setPending,
      [getSingleCourse.pending]: setPending,
      [getSingleCourse.rejected]: setIsLoading,
      [getSingleCourse.fulfilled]: setPending,
   },
})

export const { setInstructorTests, clearCourse, setSingleCourse } =
   instructorTestsSlice.actions
