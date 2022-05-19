import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { baseFetch } from '../api/baseFetch'

const initialState = {
   teachersData: [],
   isLoading: null,
   singleTeacher: null,
}

export const addTeachers = createAsyncThunk(
   'teachers/addTeachers',
   async (teacherInfo, { rejectWithValue, dispatch }) => {
      try {
         const response = await baseFetch({
            path: 'api/instructors',
            method: 'POST',
            body: teacherInfo,
         })
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
      dispatch(editTeacher())
      try {
         const response = await baseFetch({
            path: `api/instructors/${id}`,
            method: 'GET',
         })
         dispatch(editTeacher(response))
         return response
      } catch (error) {
         return rejectWithValue(error.message)
      }
   }
)

export const updateTeacher = createAsyncThunk(
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
      editTeacher(state, action) {
         state.singleTeacher = action.payload
      },
   },
   extraReducers: {
      [addTeachers.pending]: (state) => {
         state.isLoading = true
      },
      [addTeachers.fulfilled]: setPending,
      [addTeachers.rejected]: setIsLoading,
      [getAllTeachers.pending]: setPending,
      [getAllTeachers.fulfilled]: (state, action) => {
         state.teachersData = action.payload
         state.isLoading = false
      },
      [getAllTeachers.rejected]: setIsLoading,
      [updateTeacher.fulfilled]: (state, action) => {
         state.singleTeacher = action.payload
      },
   },
})

export const { removeTeacher, editTeacher } = teachersSlice.actions
export const instructorActions = teachersSlice.actions
