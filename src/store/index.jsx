import { configureStore } from '@reduxjs/toolkit'
import teachersSlice from './teachers-slice'

export default configureStore({
   reducer: {
      teachers: teachersSlice,
   },
})
