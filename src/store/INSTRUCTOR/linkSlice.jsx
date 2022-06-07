import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { baseFetch } from '../../api/baseFetch'
import { getLessons } from '../materials-slice'

const initialState = {
   newLinkData: [],
   oneSingleLink: null,
   isLoading: null,
   successMessage: null,
   error: null,
}
export const getAllLinks = createAsyncThunk(
   'lessons/getAllLinks',
   async (_, { rejectWithValue }) => {
      try {
         const response = await baseFetch({
            path: `api/links`,
            method: 'GET',
         })
         return response
      } catch (error) {
         return rejectWithValue(error.message)
      }
   }
)
export const getSingleLink = createAsyncThunk(
   'lessons/getSingleLink',
   async (id, { rejectWithValue, dispatch }) => {
      dispatch(linkActions.singleLink())
      try {
         const response = await baseFetch({
            path: `api/links/${id}`,
            method: 'GET',
         })
         dispatch(linkActions.getOneSingleLink(response))
         return response
      } catch (error) {
         return rejectWithValue(error.message)
      }
   }
)

export const addLinkToLesson = createAsyncThunk(
   'lessons/addLinkToLesson',
   async ({ lessonId, newLinkData }, { rejectWithValue, dispatch }) => {
      try {
         const response = await baseFetch({
            path: `api/links/${lessonId}`,
            method: 'POST',
            body: newLinkData,
         })
         dispatch(getLessons())
         return response
      } catch (error) {
         return rejectWithValue(error.message)
      }
   }
)

export const updateSingleLink = createAsyncThunk(
   'lessons/updateSingleLink',
   async ({ linkUpdateInfo, id }, { rejectWithValue }) => {
      try {
         const response = await baseFetch({
            path: `api/links/${id}`,
            method: 'PUT',
            body: linkUpdateInfo,
         })
         return response
      } catch (error) {
         return rejectWithValue(error.message)
      }
   }
)

export const deleteLink = createAsyncThunk(
   'lessons/ deleteLink',
   async (id, { rejectWithValue, dispatch }) => {
      try {
         const response = await baseFetch({
            path: `api/links/${id.id}`,
            method: 'DELETE',
         })
         dispatch(getLessons())

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
      getOneSingleLink: (state, action) => {
         state.oneSingleLink = action.payload
      },
      singleLink: (state) => {
         state.singleLink = null
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
      [getAllLinks.pending]: (state) => {
         state.isLoading = true
      },
      [getAllLinks.fulfilled]: (state, { payload }) => {
         state.isLoading = false
         state.newLinkData = payload
      },
      [getAllLinks.rejected]: (state) => {
         state.isLoading = false
      },
   },
})
export const linkActions = linkSlice.actions
