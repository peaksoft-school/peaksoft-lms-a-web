import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { baseFetch } from '../api/baseFetch'
import { fileFetch } from '../api/fileFetch'

const initState = {
   course: [],
   isLoading: null,
}

export const addNewCourse = createAsyncThunk(
   'courses/addNewCourse',
   async (file, { rejectWithValue }) => {
      const formData = new FormData()
      formData.append('file', file)
      try {
         const response = await fileFetch({
            path: 'api/file',
            method: 'POST',
            body: formData,
         })
         return response
      } catch (error) {
         return rejectWithValue(error.message)
      }
   }
)

export const coursesSlice = createSlice({
   name: 'courses',
   initialState: initState,
   reducers: {
      addNewCourse(state, action) {
         state.course.push(action.payload)
      },
   },
   extraReducers: {
      [addNewCourse.pending]: (state) => {
         state.isLoading = true
      },
      [addNewCourse.fulfilled]: (state) => {
         state.isLoading = false
      },
      [addNewCourse.rejected]: (state) => {
         state.isLoading = false
      },
   },
})

export const coursesActions = coursesSlice.actions
