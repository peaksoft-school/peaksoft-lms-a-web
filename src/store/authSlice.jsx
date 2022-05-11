import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { baseFetch } from '../api/baseFetch'

const initState = {
   user: {},
   status: null,
   error: null,
   isLoading: null,
}
export const signIn = createAsyncThunk(
   'auth/signIn',
   async (userInfo, { rejectWithValue }) => {
      try {
         const response = await baseFetch({
            path: '/api/authentication/signin',
            method: 'POST',
            body: userInfo,
         })
         if (!response.ok) {
            throw new Error('Something went wrong.Try later')
         }
         return response
      } catch (error) {
         return rejectWithValue(error.message)
      }
   }
)

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
