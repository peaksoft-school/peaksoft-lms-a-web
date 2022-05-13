import { configureStore } from '@reduxjs/toolkit'
import { coursesSlice } from './coursesSlice'
import { authSlice } from './authSlice'

export const store = configureStore({
   reducer: {
      courses: coursesSlice.reducer,
      auth: authSlice.reducer,
   },
})
