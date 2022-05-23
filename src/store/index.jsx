import { configureStore } from '@reduxjs/toolkit'
import { coursesSlice } from './courses-slice'
import { authSlice } from './authSlice'
import { studentsSlice } from './studentsSlice'
import { teachersSlice } from './teachers-slice'

export const store = configureStore({
   reducer: {
      courses: coursesSlice.reducer,
      auth: authSlice.reducer,
      students: studentsSlice.reducer,
      teachers: teachersSlice.reducer,
   },
})
