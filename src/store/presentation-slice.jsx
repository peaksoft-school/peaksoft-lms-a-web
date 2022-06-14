import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { baseFetch } from '../api/baseFetch'
import { fileFetch } from '../api/fileFetch'

const initState = {
   isLoading: null,
   singlePresentation: null,
}

export const addPresentation = createAsyncThunk(
   'lesson/addPresentation',
   async ({ value, id, file }, { rejectWithValue }) => {
      try {
         const formData = new FormData()
         formData.append('file', file)

         const res = await fileFetch({
            path: 'api/file',
            method: 'POST',
            body: formData,
         })
         const convertedFile = await res.url.toString()

         const response = await baseFetch({
            path: `api/presentations/${id}`,
            method: 'POST',
            body: { ...value, presentationLink: convertedFile },
         })
         return response
      } catch (error) {
         return rejectWithValue(error.message)
      }
   }
)

export const editPresentation = createAsyncThunk(
   'lesson/editPresentation',
   async ({ value, id, file }, { rejectWithValue }) => {
      try {
         const formData = new FormData()
         formData.append('file', file)

         const res = await fileFetch({
            path: 'api/file',
            method: 'POST',
            body: formData,
         })
         const convertedFile = await res.url.toString()

         const response = await baseFetch({
            path: `api/presentations/${id}`,
            method: 'PUT',
            body: { ...value, presentationLink: convertedFile },
         })
         return response
      } catch (error) {
         return rejectWithValue(error.message)
      }
   }
)

export const getPresentation = createAsyncThunk(
   'lesson/getPresentation',
   async (id, { rejectWithValue, dispatch }) => {
      try {
         dispatch(presentationActions.getPresentation())
         const response = await baseFetch({
            path: `api/presentations/${id}`,
            method: 'GET',
         })
         dispatch(presentationActions.getPresentation(response))
         return response
      } catch (error) {
         return rejectWithValue(error.message)
      }
   }
)

export const deletePresentation = createAsyncThunk(
   'lesson/deletePresentation',
   async (id, { rejectWithValue }) => {
      try {
         const response = await baseFetch({
            path: `api/presentations/${id}`,
            method: 'DELETE',
         })
         return response
      } catch (error) {
         return rejectWithValue(error.message)
      }
   }
)

const setFulfilled = (state) => {
   state.isLoading = false
}
const setPending = (state) => {
   state.isLoading = true
}
const setError = (state) => {
   state.isLoading = false
}

export const presentationSlice = createSlice({
   name: 'presentation',
   initialState: initState,
   reducers: {
      getPresentation(state, action) {
         state.singlePresentation = action.payload
      },
   },
   extraReducers: {
      [addPresentation.pending]: setPending,
      [addPresentation.fulfilled]: setFulfilled,
      [addPresentation.rejected]: setError,
   },
})

export const presentationActions = presentationSlice.actions
