import { configureStore } from '@reduxjs/toolkit'
import { coursesSlice } from './courses-slice'
import { authSlice } from './authSlice'
import { groupsSlice } from './groupSlice'
import { studentsSlice } from './studentsSlice'
import { teachersSlice } from './teachers-slice'
import { instructorCoursesSlice } from './instructor-courses'
import { materialsSlice } from './materials-slice'
import { instructorTestsSlice } from './instructor-tests-slice'

export const store = configureStore({
   reducer: {
      courses: coursesSlice.reducer,
      auth: authSlice.reducer,
      groups: groupsSlice.reducer,
      students: studentsSlice.reducer,
      teachers: teachersSlice.reducer,
      instructorCourses: instructorCoursesSlice.reducer,
      materials: materialsSlice.reducer,
      instructorTests: instructorTestsSlice.reducer,
   },
})
