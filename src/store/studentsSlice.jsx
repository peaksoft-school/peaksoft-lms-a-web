import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { baseFetch } from '../api/baseFetch'

const initState = {
   studentData: [],
   isLoading: null,
}

export const addStudents = createAsyncThunk(
   'students/addStudents',
   async (studentInfo, { rejectWithValue }) => {
      try {
         const response = await baseFetch({
            path: 'api/students',
            method: 'POST',
            body: studentInfo,
         })
         return response
      } catch (error) {
         return rejectWithValue(error.message)
      }
   }
)
export const getStudents = createAsyncThunk(
   'students/getStudents',
   async (_, { rejectWithValue }) => {
      try {
         const response = await baseFetch({
            path: 'api/students',
            method: 'GET',
         })
         return response
      } catch (error) {
         return rejectWithValue(error.message)
      }
   }
)

export const studentsSlice = createSlice({
   name: 'students',
   initialState: initState,
   reducers: {},
   extraReducers: {
      [addStudents.pending]: (state) => {
         state.isLoading = true
      },
      [addStudents.fulfilled]: (state) => {
         state.isLoading = false
      },
      [addStudents.rejected]: (state) => {
         state.isLoading = false
      },
      [getStudents.pending]: (state) => {
         state.isLoading = true
      },
      [getStudents.fulfilled]: (state, action) => {
         console.log(action.payload)
         state.studentData = action.payload
         state.isLoading = false
      },
      [getStudents.rejected]: (state) => {
         state.isLoading = false
      },
   },
})

export const studentsActions = studentsSlice.actions
