import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { baseFetch } from '../api/baseFetch'
import { fileFetch } from '../api/fileFetch'

const initState = {
   allCourses: [],
   courses: [],
   singleCourse: null,
   instructors: null,
   pages: null,
   presentPage: null,
   isLoading: null,
}

export const uploadFile = createAsyncThunk(
   'courses/sendFile',
   async ({ file, courseData, currentPage }, { rejectWithValue, dispatch }) => {
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
            dispatch(addNewCourse({ ...courseData, image: data, currentPage }))
         }
         return data
      } catch (error) {
         return rejectWithValue(error.message)
      }
   }
)

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
         dispatch(pagination(newCourse.currentPage))
         return response
      } catch (error) {
         return rejectWithValue(error.message)
      }
   }
)

export const getAllCourses = createAsyncThunk(
   'courses/getAllCourse',
   async (_, { rejectWithValue, dispatch }) => {
      try {
         const response = await baseFetch({
            path: 'api/courses',
            method: 'GET',
         })
         dispatch(coursesActions.addNewCourse(response))
         return response
      } catch (error) {
         return rejectWithValue(error.message)
      }
   }
)

export const updateFile = createAsyncThunk(
   'courses/updateFile',
   async ({ file, course, currentPage }, { rejectWithValue, dispatch }) => {
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
            dispatch(editCourse({ ...course, image: data, currentPage }))
         }
         return data
      } catch (error) {
         return rejectWithValue(error.message)
      }
   }
)

export const deleteCourse = createAsyncThunk(
   'courses/deleteCourse',
   async ({ id, currentPage }, { rejectWithValue, dispatch }) => {
      try {
         const response = await baseFetch({
            path: `api/courses/${id}`,
            method: 'DELETE',
         })
         dispatch(getAllCourses())
         dispatch(pagination(currentPage))
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
         dispatch(pagination(course.currentPage))
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
               teacherId: instructorId,
            },
         })
         dispatch(getAllCourses())
         return response
      } catch (error) {
         return rejectWithValue(error.message)
      }
   }
)

export const getInstructor = createAsyncThunk(
   'courses/getTeachers',
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

export const pagination = createAsyncThunk(
   'courses/pagination',
   async (currentPage, { rejectWithValue, dispatch }) => {
      try {
         const response = await baseFetch({
            path: `api/courses/pagination`,
            method: 'GET',
            params: {
               page: currentPage,
               size: 8,
            },
         })
         dispatch(coursesActions.getCoursesWithPagination(response))
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
      addNewCourse(state, action) {
         state.allCourses = action.payload
      },
      getCourse(state, action) {
         state.singleCourse = action.payload
      },
      getInstructors(state, action) {
         state.instructors = action.payload
      },
      getCoursesWithPagination(state, action) {
         state.courses = action.payload.responseList
         state.pages = action.payload.totalPage
         state.presentPage = action.payload.currentPage
      },
      clearCourses(state) {
         state.singleCourse = null
      },
   },
   extraReducers: {
      [uploadFile.pending]: setPending,
      [uploadFile.fulfilled]: setIsLoading,
      [uploadFile.rejected]: setIsLoading,
      [addNewCourse.pending]: setPending,
      [addNewCourse.fulfilled]: setIsLoading,
      [addNewCourse.rejected]: setIsLoading,
      [getAllCourses.pending]: setPending,
      [getAllCourses.fulfilled]: setIsLoading,
      [getAllCourses.rejected]: setIsLoading,
      [getSingleCourse.pending]: setPending,
      [getSingleCourse.fulfilled]: setIsLoading,
      [getSingleCourse.rejected]: setIsLoading,
      [updateFile.pending]: setPending,
      [updateFile.fulfilled]: setIsLoading,
      [updateFile.rejected]: setIsLoading,
      [deleteCourse.pending]: setPending,
      [deleteCourse.fulfilled]: setIsLoading,
      [deleteCourse.rejected]: setIsLoading,
      [editCourse.pending]: setPending,
      [editCourse.fulfilled]: setIsLoading,
      [editCourse.rejected]: setIsLoading,
      [getInstructor.pending]: setPending,
      [getInstructor.fulfilled]: setIsLoading,
      [getInstructor.rejected]: setIsLoading,
   },
})

export const coursesActions = coursesSlice.actions