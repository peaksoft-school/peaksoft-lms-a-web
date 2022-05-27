import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { baseFetch } from '../../api/baseFetch'

const initialState = {
   newLinkData: [],
   isLoading: null,
   successMessage: null,
   error: null,
}

export const addLinkToLesson = createAsyncThunk(
   'lessons/addLinkToLesson',
   async ({ lessonId, text, link }, { rejectWithValue }) => {
      try {
         const response = await baseFetch({
            path: `api/lesson/link${lessonId}`,
            method: 'POST',
            body: { text, link },
         })
         return response
      } catch (error) {
         return rejectWithValue(error.message)
      }
   }
)

export const linkSlice = createSlice({
   name: 'lessons',
   initialState,
   reducers: {},
   extraReducers: {
      [addLinkToLesson.pending]: (state) => {
         state.isLoading = true
      },
      [addLinkToLesson.fulfilled]: (state) => {
         state.isLoading = false
      },
      [addLinkToLesson.rejected]: (state) => {
         state.isLoading = false
      },
   },
})
export const linkActions = linkSlice.actions
