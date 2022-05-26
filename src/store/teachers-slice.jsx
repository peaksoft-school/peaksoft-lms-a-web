import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { baseFetch } from '../api/baseFetch'

const initialState = {
   teacherData: [],
   isLoading: null,
   singleTeacher: null,
   actualPage: null,
   generalPage: null,
}

export const addTeacher = createAsyncThunk(
   'teachers/addTeachers',
   async ({ value }, { rejectWithValue }) => {
      try {
         const response = await baseFetch({
            path: 'api/instructors',
            method: 'POST',
            body: value,
         })
         return response
      } catch (error) {
         return rejectWithValue(error.message)
      }
   }
)

export const deleteTeacher = createAsyncThunk(
   'teachers/deleteTeacher',
   async (id, { rejectWithValue }) => {
      try {
         const response = await baseFetch({
            path: `api/instructors/${id}`,
            method: 'DELETE',
         })
         return response
      } catch (error) {
         return rejectWithValue(error.message)
      }
   }
)

export const getSingleTeacher = createAsyncThunk(
   'teachers/getSingleTeacher',
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
   async ({ id, data }, { rejectWithValue }) => {
      try {
         const response = await baseFetch({
            path: `api/instructors/${id}`,
            method: 'PUT',
            body: data,
         })
         return response
      } catch (error) {
         return rejectWithValue(error.message)
      }
   }
)

export const getTeachersWithPagination = createAsyncThunk(
   'teachers/getTeachersWithPagination',
   async ({ page }, { rejectWithValue, dispatch }) => {
      try {
         const response = await baseFetch({
            path: 'api/instructors/pagination',
            method: 'GET',
            params: {
               page,
               size: 10,
            },
         })
         dispatch(getTeacherData(response))
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

export const teachersSlice = createSlice({
   name: 'teachers',
   initialState,
   reducers: {
      getTeacherData(state, action) {
         state.teacherData = action.payload.responseList
         state.generalPage = action.payload.totalPage
         state.actualPage = action.payload.currentPage
      },
      setSingleTeacher(state, action) {
         state.singleTeacher = action.payload
      },
      clearTeacher(state) {
         state.singleTeacher = null
      },
   },
   extraReducers: {
      [getTeachersWithPagination.pending]: setPending,
      [getTeachersWithPagination.fulfilled]: setFulfilled,
      [getTeachersWithPagination.error]: setError,
   },
})

export const { getTeacherData, clearTeacher, setSingleTeacher } =
   teachersSlice.actions

export const instructorActions = teachersSlice.actions
