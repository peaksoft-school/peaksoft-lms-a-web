import { configureStore } from '@reduxjs/toolkit'
import { coursesSlice } from './coursesSlice'

export const store = configureStore({
   reducer: {
      courses: coursesSlice.reducer,
   },
})
