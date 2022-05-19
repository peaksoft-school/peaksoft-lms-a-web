import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from './authSlice'
import { teachersSlice } from './teachers-slice'

export const store = configureStore({
   reducer: {
      auth: authSlice.reducer,
      teachers: teachersSlice.reducer,
   },
})
