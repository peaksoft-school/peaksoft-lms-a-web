import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { baseFetch } from '../api/baseFetch'

const initState = {
   user: {
      role: null,
      email: null,
      token: null,
      firstName: null,
      lastName: null,
   },
   status: null,
   isLoading: null,
}
export const signIn = createAsyncThunk('auth/signIn', async (userInfo) => {
   try {
      const response = await baseFetch({
         path: 'api/authentication/signin',
         method: 'POST',
         body: userInfo,
      })
      return response
   } catch (error) {
      return error.message
   }
})

const setError = (state, action) => {
   state.status = 'rejected'
   state.error = action.payload
}

export const authSlice = createSlice({
   name: 'authentication',
   initialState: initState,
   reducers: {},
   extraReducers: {
      [signIn.pending]: (state) => {
         state.status = 'loading'
         state.error = null
      },
      [signIn.fulfilled]: (state, action) => {
         state.status = 'resolved'
         console.log(action.payload)
      },
      [signIn.rejected]: setError,
   },
})

export const authActions = authSlice.actions
