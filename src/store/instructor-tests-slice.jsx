import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { baseFetch } from '../api/baseFetch'

const initialState = {
   tests: {},
}

export const getInstructorTests = createAsyncThunk(
   'instructorTests/getInstructorTests',
   async (id, { rejectWithValue, dispatch }) => {
      try {
         const response = await baseFetch({
            path: `api/tests/get/${id}`,
            method: 'GET',
         })
         dispatch(setInstructorTests(response))
         return response
      } catch (error) {
         return rejectWithValue(error.message)
      }
   }
)

const setIsLoading = (state) => {
   state.isLoading = false
}
const setPending = (state) => {
   state.isLoading = true
}

export const instructorTestsSlice = createSlice({
   name: 'instructorTests',
   initialState,
   reducers: {
      setInstructorTests(state, action) {
         state.tests = action.payload
      },
   },
   extraReducers: {
      [getInstructorTests.pending]: setPending,
      [getInstructorTests.rejected]: setIsLoading,
      [getInstructorTests.fulfilled]: setPending,
   },
})

export const { setInstructorTests } = instructorTestsSlice.actions
