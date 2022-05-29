import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { baseFetch } from '../api/baseFetch'

const initialState = {
   instructorCourseData: [],
   newGroupStudents: [],
   groupStudents: [],
   singleGroup: [],
   students: [],
   isLoading: null,
}

export const getInstructorCourses = createAsyncThunk(
   'instructorCourses/getInstructorsCourses',
   async (id, { rejectWithValue, dispatch }) => {
      try {
         const response = await baseFetch({
            path: `api/instructors/courses`,
            method: 'GET',
         })
         dispatch(instructorCoursesData(response))
         return response
      } catch (error) {
         return rejectWithValue(error.message)
      }
   }
)
export const getSingleGroup = createAsyncThunk(
   'instructorCourses/getSingleGroup',
   async (id, { dispatch }) => {
      dispatch(singleGroupNull)
      try {
         const response = await baseFetch({
            path: `api/groups/${id}`,
         })
         dispatch(getSingleGroupValue(response))
         return response
      } catch (error) {
         return error.message
      }
   }
)
export const addGroupToCourse = createAsyncThunk(
   'instructorCourses/addGroupToCourse',
   async ({ value, groupId, courseId }, { rejectWithValue, dispatch }) => {
      try {
         const response = await baseFetch({
            path: `api/groups/accept-to-course`,
            method: 'PUT',
            body: { ...value, groupId, courseId },
         })
         dispatch(addGroupToCourse(response))
         return response
      } catch (error) {
         return rejectWithValue(error.message)
      }
   }
)
export const getGroupStudents = createAsyncThunk(
   'instructorCourses/getGroupStudents',
   async (_, { rejectWithValue, dispatch }) => {
      try {
         const response = await baseFetch({
            path: 'api/groups',
            method: 'GET',
         })
         dispatch(setStudentGroupData(response))
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
         dispatch(setStudentData(response))
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
         state.instructorCourseData = action.payload
      },
      addGroupToCourse(state, action) {
         state.newGroupStudents = action.payload
      },
      setStudentGroupData(state, action) {
         state.groupStudents = action.payload
      },
      setStudentData(state, action) {
         state.students = action.payload
      },
      singleGroupNull(state) {
         state.singleGroup = null
      },
      getSingleGroupValue(state, action) {
         state.singleGroup = action.payload
      },
   },
   extraReducers: {
      [getInstructorCourses.pending]: setPending,
      [getInstructorCourses.rejected]: setIsLoading,
      [getInstructorCourses.fulfilled]: setPending,
      [addGroupToCourse.pending]: setPending,
      [addGroupToCourse.rejected]: setIsLoading,
      [addGroupToCourse.fulfilled]: setPending,
      [getGroupStudents.pending]: setPending,
      [getGroupStudents.rejected]: setIsLoading,
      [getGroupStudents.fulfilled]: setPending,
      [getStudents.pending]: setPending,
      [getStudents.rejected]: setIsLoading,
      [getStudents.fulfilled]: setPending,
   },
})

export const {
   instructorCoursesData,
   setStudentGroupData,
   setStudentData,
   singleGroupNull,
   getSingleGroupValue,
} = instructorCoursesSlice.actions
