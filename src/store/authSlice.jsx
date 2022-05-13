import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { baseFetch } from '../api/baseFetch'
import { localStorageHelper } from '../utils/helpers/general'

const initState = {
   user: {},
   status: null,
   error: null,
   isLoading: null,
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
export const logOut = createAsyncThunk('auth/logOut', async () => {
   localStorageHelper.clear('@peaksoft-lms')
})

const userData = localStorageHelper.laod('@peaksoft-lms')
   ? { ...initState, user: localStorageHelper.laod('@peaksoft-lms') }
   : initState

export const authSlice = createSlice({
   name: 'authentication',
   initialState: userData,
   reducers: {},
   extraReducers: {
      [signIn.pending]: (state) => {
         state.status = 'loading'
      },
      [signIn.fulfilled]: (state, action) => {
         state.status = 'resolved'
         state.isInvalid = false
         state.user = action.payload
      },
      [signIn.rejected]: (state, action) => {
         state.status = 'rejected'
         state.isInvalid = true
         state.error = action.payload
      },
      [logOut.fulfilled]: (state) => {
         state.user = {}
      },
   },
})

export const authActions = authSlice.actions
