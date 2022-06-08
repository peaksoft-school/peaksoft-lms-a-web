import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { baseFetch } from '../api/baseFetch'

export const addVideo = createAsyncThunk(
   'videos/addVideo',
   async ({ video, lessonId }, { rejectWithValue }) => {
      try {
         const response = await baseFetch({
            path: `api/videos/${lessonId}`,
            method: 'POST',
            body: video,
         })
         return response
      } catch (error) {
         return rejectWithValue(error.message)
      }
   }
)
export const deleteVideo = createAsyncThunk(
   'videos/deleteVideo',
   async (id, { rejectWithValue }) => {
      try {
         const response = await baseFetch({
            path: `api/videos/${id}`,
            method: 'DELETE',
         })
         return response
      } catch (error) {
         return rejectWithValue(error.message)
      }
   }
)
export const getSingleVideo = createAsyncThunk(
   'videos/getSingleVideo',
   async (id, { rejectWithValue, dispatch }) => {
      console.log(id)
      try {
         const response = await baseFetch({
            path: `api/videos/${id}`,
            method: 'GET',
         })
         dispatch(videoActions.getSingleVideo(response))
         return response
      } catch (error) {
         return rejectWithValue(error.message)
      }
   }
)

const initState = {
   singleVideo: null,
}
export const videoSlice = createSlice({
   name: 'videos',
   initialState: initState,
   reducers: {
      getSingleVideo: (state, action) => {
         state.singleVideo = action.payload
      },
   },
})

export const videoActions = videoSlice.actions
