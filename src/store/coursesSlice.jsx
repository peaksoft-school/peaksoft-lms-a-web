import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { baseFetch } from '../api/baseFetch'
import { fileFetch } from '../api/fileFetch'

const initState = {
   courses: [],
   course: {},
   isLoading: null,
}

export const postFileToBase = createAsyncThunk(
   'courses/postFileToBase',
   async ({ file, courseData }, { dispatch }) => {
      try {
         const formData = new FormData()
         formData.append('file', file)

         const response = await fileFetch({
            path: 'api/file',
            method: 'POST',
            body: formData,
         })
         const data = await response.url.toString()
         if (data) {
            dispatch(addNewCourse({ ...courseData, image: data }))
         }
      } catch (error) {
         console.log(error)
      }
   }
)

export const updateFile = createAsyncThunk(
   'courses/postFileToBase',
   async ({ file, courseData }, { dispatch }) => {
      try {
         const formData = new FormData()
         formData.append('file', file)

         const response = await fileFetch({
            path: 'api/file',
            method: 'POST',
            body: formData,
         })
         const data = await response.url.toString()
         if (data) {
            dispatch(editCourse({ ...courseData, image: data }))
         }
      } catch (error) {
         console.log(error)
      }
   }
)

export const addNewCourse = createAsyncThunk(
   'courses/addNewCourse',
   async (newCourse, { rejectWithValue, dispatch }) => {
      console.log(newCourse)
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
   async (course, { rejectWithValue, dispatch }) => {
      try {
         const response = await baseFetch({
            path: `api/courses/${course.id}`,
            method: 'PUT',
            body: course,
         })
         dispatch(getAllCourses())
         console.log(response)
         return response
      } catch (error) {
         return rejectWithValue(error.message)
      }
   }
)

export const getSingleCourse = createAsyncThunk(
   'courses/editCourse',
   async (id, { rejectWithValue, dispatch }) => {
      try {
         const response = await baseFetch({
            path: `api/courses/${id}`,
            method: 'GET',
         })
         dispatch(getAllCourses())
         dispatch(coursesActions.getSingleCourse(response))
         console.log(response)
         return response
      } catch (error) {
         return rejectWithValue(error.message)
      }
   }
)

export const coursesSlice = createSlice({
   name: 'courses',
   initialState: initState,
   reducers: {
      getSingleCourse(state, action) {
         state.course = action.payload
      },
   },
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
         state.courses = action.payload
         state.isLoading = false
      },
      [getAllCourses.rejected]: (state) => {
         state.isLoading = false
      },
   },
})

export const coursesActions = coursesSlice.actions
