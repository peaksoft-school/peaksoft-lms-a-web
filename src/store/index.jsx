import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from './authSlice'
import { studentsSlice } from './studentsSlice'
import { teachersSlice } from './teachers-slice'

export const store = configureStore({
   reducer: {
      auth: authSlice.reducer,
      students: studentsSlice.reducer,
      teachers: teachersSlice.reducer,
   },
})
