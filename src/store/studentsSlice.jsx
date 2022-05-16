import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { baseFetch } from '../api/baseFetch'

const initState = {
   studentData: [],
   isLoading: null,
   singleStudent: null,
}

export const addStudents = createAsyncThunk(
   'students/addStudents',
   async (studentInfo, { rejectWithValue, dispatch }) => {
      try {
         const response = await baseFetch({
            path: 'api/students/withGroup',
            method: 'POST',
            body: { ...studentInfo, groupId: 1 },
         })
         dispatch(getStudents())
         return response
      } catch (error) {
         return rejectWithValue(error.message)
      }
   }
)
export const getStudents = createAsyncThunk(
   'students/getStudents',
   async (_, { rejectWithValue, dispatch }) => {
      try {
         const response = await baseFetch({
            path: 'api/students',
            method: 'GET',
         })
         dispatch(studentsActions.getStudentData(response))
         return response
      } catch (error) {
         return rejectWithValue(error.message)
      }
   }
)
export const getSingleStudent = createAsyncThunk(
   'students/getSingleStudent',
   async (studentId, { rejectWithValue, dispatch }) => {
      try {
         const response = await baseFetch({
            path: `api/students/${studentId}`,
            method: 'GET',
         })
         dispatch(studentsActions.getSingleStudentData(response))
         return response
      } catch (error) {
         return rejectWithValue(error.message)
      }
   }
)
export const deleteStudents = createAsyncThunk(
   'students/deleteStudents',
   async (studentId, { rejectWithValue, dispatch }) => {
      try {
         const response = await baseFetch({
            path: `api/students/${studentId}`,
            method: 'DELETE',
         })
         dispatch(getStudents())
         return response
      } catch (error) {
         return rejectWithValue(error.message)
      }
   }
)
export const editStudents = createAsyncThunk(
   'students/editStudents',
   async (studentId, { rejectWithValue, dispatch }) => {
      try {
         const response = await baseFetch({
            path: `api/students/${studentId}`,
            method: 'PUT',
         })
         dispatch(getStudents())
         return response
      } catch (error) {
         return rejectWithValue(error.message)
      }
   }
)

const setFulfilled = (state) => {
   state.isLoading = false
}
const setPending = (state) => {
   state.isLoading = true
}
const setError = (state) => {
   state.isLoading = false
}

export const studentsSlice = createSlice({
   name: 'students',
   initialState: initState,
   reducers: {
      getStudentData(state, action) {
         state.studentData = action.payload
      },
      getSingleStudentData(state, action) {
         state.singleStudent = action.payload
      },
   },
   extraReducers: {
      [addStudents.pending]: setPending,
      [addStudents.fulfilled]: setFulfilled,
      [addStudents.rejected]: setError,
      [getStudents.pending]: setPending,
      [getStudents.fulfilled]: setFulfilled,
      [getStudents.rejected]: setError,
      [deleteStudents.pending]: setPending,
      [deleteStudents.fulfilled]: setFulfilled,
      [deleteStudents.rejected]: setError,
      [editStudents.pending]: setPending,
      [editStudents.fulfilled]: setFulfilled,
      [editStudents.rejected]: setError,
   },
})

export const studentsActions = studentsSlice.actions
