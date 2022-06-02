import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { baseFetch } from '../api/baseFetch'

const initialState = {
   courses: [],
   newGroupStudents: [],
   newStudents: [],
   groupOfStudents: [],
   singleCourse: [],
   students: [],
   isLoading: null,
}

export const getCoursesOfInstructor = createAsyncThunk(
   'instructorCourses/getCoursesOfInstructor',
   async (_, { rejectWithValue, dispatch }) => {
      try {
         const response = await baseFetch({
            path: `api/instructors/courses`,
            method: 'GET',
         })
         dispatch(setCoursesOfInstructor(response))
         return response
      } catch (error) {
         return rejectWithValue(error.message)
      }
   }
)
export const addGroupToCourse = createAsyncThunk(
   'instructorCourses/addGroupToCourse',
   async ({ groupId, courseId }, { rejectWithValue }) => {
      try {
         const response = await baseFetch({
            path: `api/groups/accept-to-course`,
            method: 'PUT',
            params: {
               groupId,
               courseId,
            },
         })
         return response
      } catch (error) {
         return rejectWithValue(error.message)
      }
   }
)
export const addStudentToCourse = createAsyncThunk(
   'instructorCourses/addStudentToCourse',
   async ({ studentId, courseId }, { rejectWithValue }) => {
      try {
         const response = await baseFetch({
            path: `api/students/accept-to-course`,
            method: 'PUT',
            params: {
               courseId,
               studentId,
            },
         })
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
export const getGroupOfStudents = createAsyncThunk(
   'instructorCourses/getGroupOfStudents',
   async (_, { rejectWithValue, dispatch }) => {
      try {
         const response = await baseFetch({
            path: 'api/groups',
            method: 'GET',
         })
         dispatch(setGroupOfStudents(response))
         return response
      } catch (error) {
         return rejectWithValue(error.message)
      }
   }
)
export const getStudentsByGroup = createAsyncThunk(
   'instructorCourses/getStudentsByGroup',
   async (id, { rejectWithValue, dispatch }) => {
      try {
         const response = await baseFetch({
            path: `api/courses/students/${id}`,
            method: 'GET',
         })
         dispatch(setCourseByStudents(response))
         return response
      } catch (error) {
         return rejectWithValue(error.message)
      }
   }
)
export const getStudents = createAsyncThunk(
   'instructorCourses/getStudents',
   async (_, { rejectWithValue, dispatch }) => {
      try {
         const response = await baseFetch({
            path: 'api/students',
            method: 'GET',
         })
         dispatch(setStudents(response))
         return response
      } catch (error) {
         return rejectWithValue(error.message)
      }
   }
)
export const searchStudentsByName = createAsyncThunk(
   'instructorCourses/searchStudentsByName',
   async (name, { rejectWithValue, dispatch }) => {
      try {
         const response = await baseFetch({
            path: `api/students/firstname/${name}`,
            method: 'GET',
         })
         dispatch(getSearchResults(response))
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
      setCoursesOfInstructor(state, action) {
         state.courses = action.payload
      },
      setCourseByStudents(state, action) {
         state.newGroupStudents = action.payload
      },
      setGroupOfStudents(state, action) {
         state.groupOfStudents = action.payload
      },
      setStudents(state, action) {
         state.students = action.payload
      },
      getSearchResults(state, action) {
         state.students = action.payload
      },
      clearCourse(state) {
         state.singleCourse = null
      },
      setSingleCourse(state, action) {
         state.singleCourse = action.payload
      },
   },
   extraReducers: {
      [getCoursesOfInstructor.pending]: setPending,
      [getCoursesOfInstructor.rejected]: setIsLoading,
      [getCoursesOfInstructor.fulfilled]: setPending,
      [addGroupToCourse.pending]: setPending,
      [addGroupToCourse.rejected]: setIsLoading,
      [addGroupToCourse.fulfilled]: setPending,
      [getGroupOfStudents.pending]: setPending,
      [getGroupOfStudents.rejected]: setIsLoading,
      [getGroupOfStudents.fulfilled]: setPending,
      [getStudents.pending]: setPending,
      [getStudents.rejected]: setIsLoading,
      [getStudents.fulfilled]: setPending,
   },
})

export const {
   setCoursesOfInstructor,
   setCourseByStudents,
   setGroupOfStudents,
   getSearchResults,
   setSingleCourse,
   setStudents,
   clearCourse,
} = instructorCoursesSlice.actions
