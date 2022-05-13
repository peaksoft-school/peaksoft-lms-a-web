import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { baseFetch } from '../api/baseFetch'

const initState = {
   user: {},
   status: null,
   error: null,
   isLoading: null,
   isAuth: false,
   isInvalid: false,
}
export const signIn = createAsyncThunk(
   'auth/signIn',
   async (userInfo, { rejectWithValue }) => {
      try {
         const response = await baseFetch({
            path: 'api/authentication',
            method: 'POST',
            body: userInfo,
         })
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
         state.isAuth = true
         state.isInvalid = false
         state.user = action.payload
      },
      [signIn.rejected]: (state, action) => {
         state.status = 'rejected'
         state.isInvalid = true
         state.error = action.payload
      },
   },
})

export const authActions = authSlice.actions
