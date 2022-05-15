import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { fileFetch } from '../api/fileFetch'

const initState = {
   course: [],
   isLoading: null,
}
export const addNewCourse = createAsyncThunk(
   'courses/addNewCourse',
   async (formData, { rejectWithValue }) => {
      console.log(formData)
      try {
         const response = await fileFetch({
            path: 'api/file',
            method: 'POST',
            body: {
               file: formData,
            },
         })

         return response
      } catch (error) {
         console.log(error)
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
