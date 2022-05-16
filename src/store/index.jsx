import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from './authSlice'
import { studentsSlice } from './studentsSlice'

export const store = configureStore({
   reducer: {
      auth: authSlice.reducer,
      students: studentsSlice.reducer,
   },
})
