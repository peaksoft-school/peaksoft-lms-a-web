import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { baseFetch } from '../api/baseFetch'

const initialState = {
   teachersData: [],
   isLoading: null,
   singleTeacher: null,
   currentPage: null,
   totalPage: null,
}

export const addTeacher = createAsyncThunk(
   'teachers/addTeachers',
   async (teacherInfo, { rejectWithValue, dispatch }) => {
      try {
         const response = await baseFetch({
            path: 'api/instructors',
            method: 'POST',
            body: teacherInfo,
         })
         // dispatch(getDataStudentPagination({ page }))
         dispatch(getAllTeachers())
         return response
      } catch (error) {
         return rejectWithValue(error.message)
      }
   }
)

export const getAllTeachers = createAsyncThunk(
   'teachers/getTeachers',
   async (_, { rejectWithValue }) => {
      try {
         const response = await baseFetch({
            path: 'api/instructors',
            method: 'GET',
         })
         return response
      } catch (error) {
         return rejectWithValue(error.message)
      }
   }
)

export const deleteTeacher = createAsyncThunk(
   'teachers/deleteTeacher',
   async (id, { rejectWithValue, dispatch }) => {
      try {
         const response = await baseFetch({
            path: `api/instructors/${id}`,
            method: 'DELETE',
         })
         // dispatch(getDataStudentPagination({ page }))
         dispatch(getAllTeachers())
         return response
      } catch (error) {
         return rejectWithValue(error.message)
      }
   }
)

export const getSingleTeacher = createAsyncThunk(
   'teachers/getSingleTeachers',
   async (id, { rejectWithValue, dispatch }) => {
      dispatch(clearTeacher())
      try {
         const response = await baseFetch({
            path: `api/instructors/${id}`,
            method: 'GET',
         })
         dispatch(setSingleTeacher(response))
         return response
      } catch (error) {
         return rejectWithValue(error.message)
      }
   }
)

export const editTeacher = createAsyncThunk(
   'teachers/updateTeacher',
   async ({ id, teacherInfo }, { rejectWithValue, dispatch }) => {
      try {
         const response = await baseFetch({
            path: `api/instructors/${id}`,
            method: 'PUT',
            body: teacherInfo,
         })
         dispatch(getAllTeachers())
         return response
      } catch (error) {
         return rejectWithValue(error.message)
      }
   }
)
export const getTeachersPagination = createAsyncThunk(
   'teachers/getTeachersPagination',
   async (page, { rejectWithValue, dispatch }) => {
      try {
         const response = await baseFetch({
            path: 'api/instructors/pagination',
            method: 'GET',
            params: {
               page,
               size: 10,
            },
         })
         dispatch(getDataStudentPagination(response))
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

export const teachersSlice = createSlice({
   name: 'teachers',
   initialState,
   reducers: {
      setSingleTeacher(state, action) {
         state.singleTeacher = action.payload
      },
      clearTeacher(state) {
         state.singleTeacher = null
      },
      getDataStudentPagination(state, action) {
         state.teachersData = action.payload.responseList
         state.currentPage = action
      },
   },
   extraReducers: {
      [addTeacher.pending]: (state) => {
         state.isLoading = true
      },
      [addTeacher.fulfilled]: setPending,
      [addTeacher.rejected]: setIsLoading,
      [getAllTeachers.pending]: setPending,
      [getAllTeachers.fulfilled]: (state, action) => {
         state.teachersData = action.payload
         state.isLoading = false
      },
      [getAllTeachers.rejected]: setIsLoading,
      [editTeacher.fulfilled]: (state, action) => {
         state.singleTeacher = action.payload
      },
   },
})

export const {
   removeTeacher,
   clearTeacher,
   setSingleTeacher,
   getDataStudentPagination,
} = teachersSlice.actions
export const instructorActions = teachersSlice.actions
