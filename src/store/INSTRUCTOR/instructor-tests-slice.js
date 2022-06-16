import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { baseFetch } from '../../api/baseFetch'

const initialState = {
   tests: {},
   course: [],
   results: [],
   lesson: [],
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
   'instructorTests/getSingleCourses',
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
export const getAllResults = createAsyncThunk(
   'instructorTests/getAllResults',
   async (_, { rejectWithValue, dispatch }) => {
      try {
         const response = await baseFetch({
            path: 'api/answers',
            method: 'GET',
         })
         console.log(response)
         dispatch(setAllResults(response))
         return response
      } catch (error) {
         return rejectWithValue(error.message)
      }
   }
)
export const getLesson = createAsyncThunk(
   'instructorTests/getLesson',
   async (id, { rejectWithValue, dispatch }) => {
      try {
         const response = await baseFetch({
            path: `api/lessons/${id}`,
            method: 'GET',
         })
         dispatch(setLesson(response))
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

export const instructorTestsSlice = createSlice({
   name: 'instructorTests',
   initialState,
   reducers: {
      setInstructorTests(state, action) {
         state.tests = action.payload
      },
      clearCourse(state) {
         state.course = null
      },
      setSingleCourse(state, action) {
         state.course = action.payload
      },
      setAllResults(state, action) {
         state.results = action.payload
      },
      setLesson(state, action) {
         state.lesson = action.payload
      },
   },
   extraReducers: {
      [getInstructorTests.pending]: setPending,
      [getInstructorTests.rejected]: setIsLoading,
      [getInstructorTests.fulfilled]: setPending,
      [getSingleCourse.pending]: setPending,
      [getSingleCourse.rejected]: setIsLoading,
      [getSingleCourse.fulfilled]: setPending,
      [getAllResults.pending]: setPending,
      [getAllResults.rejected]: setIsLoading,
      [getAllResults.fulfilled]: setPending,
   },
})

export const {
   setInstructorTests,
   clearCourse,
   setSingleCourse,
   setAllResults,
   setLesson,
} = instructorTestsSlice.actions
