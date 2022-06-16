import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { baseFetch } from '../api/baseFetch'
import { AUTH_KEY } from '../utils/constants/general'
import { localStorageHelper } from '../utils/helpers/general'

const initState = {
   user: {},
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
         localStorageHelper.store(AUTH_KEY, response)
         return response
      } catch (error) {
         return rejectWithValue(error.message)
      }
   }
)
export const logOut = createAsyncThunk('auth/logOut', async () => {
   localStorageHelper.clear(AUTH_KEY)
})

const userData = localStorageHelper.laod(AUTH_KEY)
   ? { ...initState, user: localStorageHelper.laod(AUTH_KEY) }
   : initState

export const authSlice = createSlice({
   name: 'authentication',
   initialState: userData,
   reducers: {},
   extraReducers: {
      [signIn.pending]: (state) => {
         state.isLoading = true
      },
      [signIn.fulfilled]: (state, action) => {
         state.isInvalid = false
         state.user = action.payload
         state.isLoading = false
      },
      [signIn.rejected]: (state) => {
         state.isInvalid = true
         state.isLoading = false
      },
      [logOut.pending]: (state) => {
         state.isLoading = true
      },
      [logOut.fulfilled]: (state) => {
         state.user = {}
         state.isLoading = false
      },
   },
})

export const authActions = authSlice.actions
