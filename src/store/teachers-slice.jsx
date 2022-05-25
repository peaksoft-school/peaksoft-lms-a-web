import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { baseFetch } from '../api/baseFetch'

const initialState = {
   teachersData: [],
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
         // dispatch(getDataStudentPagination({ page }))
         // dispatch(getAllTeachers())
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
   async ({ id, value }, { rejectWithValue }) => {
      try {
         const response = await baseFetch({
            path: `api/instructors/${id}`,
            method: 'PUT',
            body: value,
         })
         return response
      } catch (error) {
         return rejectWithValue(error.message)
      }
   }
)
export const getTeachersWithPagination = createAsyncThunk(
   'teachers/getTeachersWithPagination',
   async ({ page, size }, { rejectWithValue, dispatch }) => {
      try {
         const response = await baseFetch({
            path: 'api/instructors/pagination',
            method: 'GET',
            params: {
               page,
               size,
            },
         })
         dispatch(getTeacherData(response))
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
      getTeacherData(state, action) {
         state.teachersData = action.payload.responseList
         state.generalPage = action.payload.totalPage
      },
      setSingleTeacher(state, action) {
         state.singleTeacher = action.payload
      },
      clearTeacher(state) {
         state.singleTeacher = null
      },
      getDataStudentPagination(state, action) {
         state.teachersData = action.payload.responseList
         state.actualPage = action.payload.currentPage
         state.generalPage = action.payload.totalPage
      },
   },
   extraReducers: {
      [addTeacher.pending]: (state) => {
         state.isLoading = true
      },
      [addTeacher.fulfilled]: (state) => {
         state.isLoading = false
      },
      [addTeacher.rejected]: setIsLoading,
      // [getAllTeachers.pending]: setPending,
      // [getAllTeachers.fulfilled]: (state, action) => {
      //    state.teachersData = action.payload
      //    state.isLoading = false
      // },
      // [getAllTeachers.rejected]: setIsLoading,
      [editTeacher.fulfilled]: (state, action) => {
         state.singleTeacher = action.payload
      },
   },
})

export const {
   getTeacherData,
   clearTeacher,
   setSingleTeacher,
   getDataStudentPagination,
} = teachersSlice.actions
export const instructorActions = teachersSlice.actions
