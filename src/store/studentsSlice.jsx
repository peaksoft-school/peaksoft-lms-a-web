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
   async ({ value, id, page, studyFormat }, { rejectWithValue, dispatch }) => {
      try {
         const response = await baseFetch({
            path: 'api/students/withGroup',
            method: 'POST',
            body: { ...value, groupId: id },
         })
         dispatch(getStudentsWithPagination({ page, studyFormat }))
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
   async ({ id, page, studyFormat }, { rejectWithValue, dispatch }) => {
      try {
         const response = await baseFetch({
            path: `api/students/${id}`,
            method: 'DELETE',
         })
         dispatch(getStudentsWithPagination({ page, studyFormat }))
         return response
      } catch (error) {
         return rejectWithValue(error.message)
      }
   }
)
export const editStudents = createAsyncThunk(
   'students/editStudents',
   async (
      { id, data, groupid, page, studyFormat },
      { rejectWithValue, dispatch }
   ) => {
      try {
         const response = await baseFetch({
            path: `api/students/${id}`,
            method: 'PUT',
            body: { ...data, groupId: groupid },
         })
         dispatch(getStudentsWithPagination({ page, studyFormat }))
         return response
      } catch (error) {
         return rejectWithValue(error.message)
      }
   }
)
export const sendStudentsAsExcel = createAsyncThunk(
   'students/sendStudents',
   async ({ file, id, page, studyFormat }, { rejectWithValue, dispatch }) => {
      try {
         const formData = new FormData()
         formData.append('file', file)
         const response = await fileFetch({
            path: `api/students/import/${id}`,
            method: 'POST',
            body: formData,
         })
         dispatch(getStudentsWithPagination({ page, studyFormat }))
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
export const getStudentsWithPagination = createAsyncThunk(
   'students/getStudentsWithPagination',
   async ({ page, studyFormat }, { rejectWithValue, dispatch }) => {
      try {
         const response = await baseFetch({
            path: 'api/students/pagination',
            method: 'GET',
            params: {
               page,
               size: 10,
               studyFormat,
            },
         })
         dispatch(studentsActions.getStudentDataWithPagination(response))
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
      getStudentDataWithPagination(state, action) {
         state.studentData = action.payload.responseList
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
