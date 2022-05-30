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
   async ({ lessonId, text, link }, { rejectWithValue, dispatch }) => {
      try {
         const response = await baseFetch({
            path: `api/links/${lessonId}`,
            method: 'POST',
            body: { text, link },
         })
         dispatch(linkActions.getLinkData(response))
         return response
      } catch (error) {
         return rejectWithValue(error.message)
      }
   }
)

export const linkSlice = createSlice({
   name: 'lessons',
   initialState,
   reducers: {
      getLinkData: (state, action) => {
         state.newLinkData = action.payload
      },
   },
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
