import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { baseFetch } from '../api/baseFetch'
import { fileFetch } from '../api/fileFetch'

const initState = {
   course: [],
   isLoading: null,
}

export const addNewCourse = createAsyncThunk(
   'courses/addNewCourse',
   async (newCourse, { rejectWithValue, dispatch }) => {
      try {
         const response = await baseFetch({
            path: 'api/courses',
            method: 'POST',
            body: newCourse,
         })
         dispatch(getAllCourses())
         return response
      } catch (error) {
         return rejectWithValue(error.message)
      }
   }
)
export const getAllCourses = createAsyncThunk(
   'courses/getAllCourse',
   async (_, { rejectWithValue }) => {
      try {
         const response = await baseFetch({
            path: 'api/courses',
            method: 'GET',
         })
         return response
      } catch (error) {
         return rejectWithValue(error.message)
      }
   }
)

export const deleteCourse = createAsyncThunk(
   'courses/deleteCourse',
   async (id, { rejectWithValue, dispatch }) => {
      try {
         const response = await baseFetch({
            path: `api/courses/${id}`,
            method: 'DELETE',
         })
         dispatch(getAllCourses())
         return response
      } catch (error) {
         return rejectWithValue(error.message)
      }
   }
)
export const editCourse = createAsyncThunk(
   'courses/editCourse',
   async (id, { rejectWithValue, dispatch }) => {
      try {
         const response = await baseFetch({
            path: `api/courses/${id}`,
            method: 'PUT',
         })
         dispatch(getAllCourses())
         return response
      } catch (error) {
         return rejectWithValue(error.message)
      }
   }
)

export const coursesSlice = createSlice({
   name: 'courses',
   initialState: initState,
   reducers: {},
   extraReducers: {
      [addNewCourse.pending]: (state) => {
         state.isLoading = true
      },
      [addNewCourse.fulfilled]: (state) => {
         state.isLoading = false
      },
      [addNewCourse.rejected]: (state) => {
         state.isLoading = false
      },
      [getAllCourses.pending]: (state) => {
         state.isLoading = true
      },
      [getAllCourses.fulfilled]: (state, action) => {
         state.course = action.payload
         state.isLoading = false
      },
      [getAllCourses.rejected]: (state) => {
         state.isLoading = false
      },
   },
})

export const coursesActions = coursesSlice.actions
