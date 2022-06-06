import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { baseFetch } from '../api/baseFetch'
import { fileFetch } from '../api/fileFetch'

const initState = {
   isLoading: null,
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

const setFulfilled = (state) => {
   state.isLoading = false
}
const setPending = (state) => {
   state.isLoading = true
}
const setError = (state) => {
   state.isLoading = false
}

export const materialsSlice = createSlice({
   name: 'presentation',
   initialState: initState,
   reducers: {},
   extraReducers: {
      [addPresentation.pending]: setPending,
      [addPresentation.fulfilled]: setFulfilled,
      [addPresentation.rejected]: setError,
   },
})
