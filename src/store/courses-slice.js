import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { baseFetch } from '../api/baseFetch'
import { fileFetch } from '../api/fileFetch'
import { showErrorMessage } from '../components/UI/notification/Notification'

const initState = {
   courses: [],
   сourse: null,
   instructors: [],
   pages: null,
   presentPage: null,
   isLoading: null,
   courseTeachers: [],
}

export const addNewCourse = createAsyncThunk(
   'courses/addNewCourse',
   async ({ file, courseData }, { rejectWithValue }) => {
      try {
         const formData = new FormData()
         formData.append('file', file)

         const res = await fileFetch({
            path: 'api/file',
            method: 'POST',
            body: formData,
         })
         const data = await res.url.toString()
         const response = await baseFetch({
            path: 'api/courses',
            method: 'POST',
            body: { ...courseData, image: data },
         })
         return response
      } catch (error) {
         return rejectWithValue(error.message)
      }
   }
)

export const onEditCourse = createAsyncThunk(
   'courses/editCourse',
   async ({ file, course, image }, { rejectWithValue }) => {
      try {
         if (file) {
            const formData = new FormData()
            formData.append('file', file)

            const res = await fileFetch({
               path: 'api/file',
               method: 'POST',
               body: formData,
            })
            const data = await res.url.toString()
            await baseFetch({
               path: `api/courses/${course.id}`,
               method: 'PUT',
               body: { ...course, image: data },
            })
         } else {
            const response = await baseFetch({
               path: `api/courses/${course.id}`,
               method: 'PUT',
               body: { ...course, image },
            })
            return response
         }
         return file
      } catch (error) {
         return rejectWithValue(error.message)
      }
   }
)

export const deleteCourse = createAsyncThunk(
   'courses/deleteCourse',
   async ({ id }, { rejectWithValue }) => {
      try {
         const response = await baseFetch({
            path: `api/courses/${id}`,
            method: 'DELETE',
         })
         return response
      } catch (error) {
         return rejectWithValue(error.message)
      }
   }
)

export const getSingleCourse = createAsyncThunk(
   'courses/getSingleCourse',
   async (id, { rejectWithValue, dispatch }) => {
      dispatch(coursesActions.clearCourses())
      try {
         const response = await baseFetch({
            path: `api/courses/${id}`,
            method: 'GET',
         })
         dispatch(coursesActions.getCourse(response))
         return response
      } catch (error) {
         return rejectWithValue(error.message)
      }
   }
)

export const assignTeacherToCourse = createAsyncThunk(
   'courses/assignTeacherToCourse ',
   async ({ courseId, instructorId }, { rejectWithValue, dispatch }) => {
      try {
         const response = await baseFetch({
            path: 'api/courses/assign',
            method: 'POST',
            body: {
               courseId,
               instructorsId: instructorId,
            },
         })
         dispatch(getAllCourses(1))
         return response
      } catch (error) {
         return rejectWithValue(error.message)
      }
   }
)

export const getInstructor = createAsyncThunk(
   'courses/getInstructor',
   async (_, { rejectWithValue, dispatch }) => {
      try {
         const response = await baseFetch({
            path: 'api/instructors',
            method: 'GET',
         })
         dispatch(coursesActions.getInstructors(response))
         return response
      } catch (error) {
         return rejectWithValue(error.message)
      }
   }
)

export const getAllCourses = createAsyncThunk(
   'courses/getAllCourses',
   async (currentPage, { rejectWithValue, dispatch }) => {
      try {
         const response = await baseFetch({
            path: `api/courses/pagination`,
            method: 'GET',
            params: {
               page: currentPage || 1,
               size: 8,
            },
         })
         dispatch(coursesActions.getAllCourses(response))
         return response
      } catch (error) {
         showErrorMessage('Что-то пошло не так, попробуйте еще раз')
         return rejectWithValue(error.message)
      }
   }
)

export const getCourseTeachers = createAsyncThunk(
   'courses/getCourseTeachers',
   async (id, { rejectWithValue, dispatch }) => {
      try {
         const response = await baseFetch({
            path: `api/courses/instructors/${id}`,
            method: 'GET',
         })
         dispatch(coursesActions.getCourseTeachers(response))
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

export const coursesSlice = createSlice({
   name: 'courses',
   initialState: initState,
   reducers: {
      getCourse(state, action) {
         state.сourse = action.payload
      },
      getInstructors(state, action) {
         state.instructors = action.payload
      },
      getAllCourses(state, action) {
         state.courses = action.payload.responseList
         state.pages = action.payload.totalPage
         state.presentPage = action.payload.currentPage
      },
      clearCourses(state) {
         state.сourse = null
      },
      getCourseTeachers(state, action) {
         state.courseTeachers = action.payload
      },
   },
   extraReducers: {
      [getAllCourses.pending]: setPending,
      [getAllCourses.fulfilled]: setIsLoading,
      [getAllCourses.rejected]: setIsLoading,
   },
})

export const coursesActions = coursesSlice.actions
