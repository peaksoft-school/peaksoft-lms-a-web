import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { baseFetch } from '../../api/baseFetch'
import { getLessons } from './materials-slice'

export const addVideo = createAsyncThunk(
   'videos/addVideo',
   async ({ video, lessonId }, { rejectWithValue, dispatch }) => {
      try {
         const response = await baseFetch({
            path: `api/videos/${lessonId}`,
            method: 'POST',
            body: video,
         })
         dispatch(getLessons())
         return response
      } catch (error) {
         return rejectWithValue(error.message)
      }
   }
)
export const deleteVideo = createAsyncThunk(
   'videos/deleteVideo',
   async (id, { rejectWithValue, dispatch }) => {
      try {
         const response = await baseFetch({
            path: `api/videos/${id}`,
            method: 'DELETE',
         })
         dispatch(getLessons())
         return response
      } catch (error) {
         return rejectWithValue(error.message)
      }
   }
)
export const getSingleVideo = createAsyncThunk(
   'videos/getSingleVideo',
   async (id, { rejectWithValue, dispatch }) => {
      try {
         const response = await baseFetch({
            path: `api/videos/${id}`,
            method: 'GET',
         })
         dispatch(videoActions.setVideo(response))
         return response
      } catch (error) {
         return rejectWithValue(error.message)
      }
   }
)
export const editVideo = createAsyncThunk(
   'videos/editVideo',
   async ({ video, id }, { rejectWithValue }) => {
      try {
         const response = await baseFetch({
            path: `api/videos/${id}`,
            method: 'PUT',
            body: video,
         })
         return response
      } catch (error) {
         return rejectWithValue(error.message)
      }
   }
)

const initState = {
   singleVideo: null,
   isLoading: false,
}
export const videoSlice = createSlice({
   name: 'videos',
   initialState: initState,
   reducers: {
      setVideo: (state, action) => {
         state.singleVideo = action.payload
      },
   },
   extraReducers: {
      [addVideo.pending]: (state) => {
         state.isLoading = true
      },
      [addVideo.pending]: (state) => {
         state.isLoading = false
      },
      [addVideo.pending]: (state) => {
         state.isLoading = false
      },
      [deleteVideo.pending]: (state) => {
         state.isLoading = true
      },
      [deleteVideo.pending]: (state) => {
         state.isLoading = false
      },
      [deleteVideo.pending]: (state) => {
         state.isLoading = false
      },
   },
})

export const videoActions = videoSlice.actions
