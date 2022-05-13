import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState = {
   data: [
      {
         id: 1,
         name: 'Baya Asanova',
         specialization: 'Front End',
         mobile_phone: '0700777999',
         email: 'baya@gmail.com',
         password: '123qwe',
      },
   ],
   status: null,
   message: null,
}
export const addAsyncTeachers = createAsyncThunk()

const teachersSlice = createSlice({
   name: 'teachers',
   initialState,
   reducers: {
      addTeachers: {},
   },
})

export const { addTeachers } = teachersSlice.actions
export default teachersSlice
