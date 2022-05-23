import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from './authSlice'
import { groupsSlice } from './groupSlice'
import { teachersSlice } from './teachers-slice'

export const store = configureStore({
   reducer: {
      auth: authSlice.reducer,
      groups: groupsSlice.reducer,
      teachers: teachersSlice.reducer,
   },
})
