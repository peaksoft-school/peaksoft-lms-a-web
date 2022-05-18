import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { baseFetch } from '../api/baseFetch'
import { fileFetch } from '../api/fileFetch'

const initState = {
   studentData: [],
   groups: [],
   isLoading: null,
   singleStudent: null,
}

export const addStudents = createAsyncThunk(
   'students/addStudents',
   async ({ value, id }, { rejectWithValue, dispatch }) => {
      try {
         const response = await baseFetch({
            path: 'api/students/withGroup',
            method: 'POST',
            body: { ...value, groupId: id },
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
      dispatch(studentsActions.clearSingleStudentData())
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
   async ({ id, data, groupid }, { rejectWithValue, dispatch }) => {
      try {
         const response = await baseFetch({
            path: `api/students/${id}`,
            method: 'PUT',
            body: { ...data, groupId: groupid },
         })
         dispatch(getStudents())
         return response
      } catch (error) {
         return rejectWithValue(error.message)
      }
   }
)
export const sendStudentsAsExcel = createAsyncThunk(
   'students/sendStudents',
   async ({ file, id }, { rejectWithValue, dispatch }) => {
      try {
         const formData = new FormData()
         formData.append('file', file)
         const response = await fileFetch({
            path: `api/students/import/${id}`,
            method: 'POST',
            body: formData,
         })
         dispatch(getStudents())
         return response
      } catch (error) {
         return rejectWithValue(error.message)
      }
   }
)
export const getGroups = createAsyncThunk(
   'students/getGroups',
   async (_, { rejectWithValue, dispatch }) => {
      try {
         const response = await baseFetch({
            path: 'api/groups',
            method: 'GET',
         })
         dispatch(studentsActions.getGroups(response))
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
      clearSingleStudentData(state) {
         state.singleStudent = null
      },
      getGroups(state, action) {
         state.groups = action.payload
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
      [sendStudentsAsExcel.pending]: setPending,
      [sendStudentsAsExcel.fulfilled]: setFulfilled,
      [sendStudentsAsExcel.rejected]: setError,
   },
})

export const studentsActions = studentsSlice.actions
