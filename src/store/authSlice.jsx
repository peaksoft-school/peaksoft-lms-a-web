import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { baseFetch } from '../api/baseFetch'

const initState = {
   user: {},
   status: null,
   error: null,
   isLoading: null,
}
export const signIn = createAsyncThunk('auth/signIn', async (userInfo) => {
   try {
      const response = await baseFetch({
         path: 'authentication',
         method: 'POST',
         body: userInfo,
      })
      return response
   } catch (error) {
      return error.message
   }
})

export const authSlice = createSlice({
   name: 'authentication',
   initialState: initState,
   reducers: {},
   extraReducers: {
      [signIn.pending]: (state) => {
         state.status = 'loading'
      },
      [signIn.fulfilled]: (state, action) => {
         state.status = 'resolved'
         state.user = action.payload
      },
      [signIn.rejected]: (state, action) => {
         state.status = 'rejected'
         state.error = action.payload
      },
   },
})

export const authActions = authSlice.actions
