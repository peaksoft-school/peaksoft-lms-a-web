import { configureStore } from '@reduxjs/toolkit'
import { coursesSlice } from './courses-slice'
import { authSlice } from './authSlice'
import { groupsSlice } from './groupSlice'
import { studentsSlice } from './studentsSlice'
import { teachersSlice } from './teachers-slice'
import { linkSlice } from './INSTRUCTOR/linkSlice'

export const store = configureStore({
   reducer: {
      courses: coursesSlice.reducer,
      auth: authSlice.reducer,
      groups: groupsSlice.reducer,
      students: studentsSlice.reducer,
      teachers: teachersSlice.reducer,
      link: linkSlice.reducer,
   },
})
