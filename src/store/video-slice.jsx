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
export const videoSlice = createSlice({
   name: 'videos',
   initialState: {},
   reducers: {},
})

export const videoActions = videoSlice.actions
