import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { baseFetch } from '../api/baseFetch'

const initState = {
   lessons: [],
   lesson: null,
   course: null,
   isLoading: null,
}

export const addLesson = createAsyncThunk(
   'materials/addLesson',
   async ({ lessonData, id }, { rejectWithValue }) => {
      try {
         const response = await baseFetch({
            path: `api/lessons/${id}`,
            method: 'POST',
            body: lessonData,
         })
         return response
      } catch (error) {
         return rejectWithValue(error.message)
      }
   }
)

export const getLessons = createAsyncThunk(
   'materials/getLessons',
   async (_, { rejectWithValue, dispatch }) => {
      try {
         const response = await baseFetch({
            path: 'api/lessons',
            method: 'GET',
         })
         dispatch(materialsActions.getLessons(response))

         return response
      } catch (error) {
         return rejectWithValue(error.message)
      }
   }
)

export const getLesson = createAsyncThunk(
   'materials/getLesson',
   async (id, { rejectWithValue, dispatch }) => {
      try {
         const response = await baseFetch({
            path: `api/lessons/${id}`,
            method: 'GET',
         })
         dispatch(materialsActions.getLesson(response))
         return response
      } catch (error) {
         return rejectWithValue(error.message)
      }
   }
)
export const getCourse = createAsyncThunk(
   'materials/getCourse',
   async (id, { rejectWithValue, dispatch }) => {
      try {
         const response = await baseFetch({
            path: `api/courses/${id}`,
            method: 'GET',
         })
         dispatch(materialsActions.getCourse(response))
         return response
      } catch (error) {
         return rejectWithValue(error.message)
      }
   }
)

export const editLesson = createAsyncThunk(
   'materials/editLesson',
   async ({ id, lessonData }, { rejectWithValue }) => {
      try {
         const response = await baseFetch({
            path: `api/lessons/${id}`,
            method: 'PUT',
            body: lessonData,
         })
         return response
      } catch (error) {
         return rejectWithValue(error.message)
      }
   }
)

export const deleteLesson = createAsyncThunk(
   'materials/deleteLesson',
   async (id, { rejectWithValue }) => {
      try {
         const response = await baseFetch({
            path: `api/lessons/${id}`,
            method: 'DELETE',
         })
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

export const materialsSlice = createSlice({
   name: 'materials',
   initialState: initState,
   reducers: {
      getLessons(state, action) {
         state.lessons = action.payload
      },
      getLesson(state, action) {
         state.lesson = action.payload
      },
      getCourse(state, action) {
         state.course = action.payload
      },
   },
   extraReducers: {
      [getLessons.pending]: setPending,
      [getLessons.fulfilled]: setFulfilled,
      [getLessons.rejected]: setError,
   },
})

export const materialsActions = materialsSlice.actions
