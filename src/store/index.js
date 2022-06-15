import { configureStore } from '@reduxjs/toolkit'
import { coursesSlice } from './courses-slice'
import { authSlice } from './authSlice'
import { groupsSlice } from './groupSlice'
import { studentsSlice } from './studentsSlice'
import { teachersSlice } from './teachers-slice'
import { taskSlice } from './INSTRUCTOR/task-slice'
import { createTestSlice } from './INSTRUCTOR/create-test-slice'
import { linkSlice } from './INSTRUCTOR/linkSlice'
import { instructorCoursesSlice } from './INSTRUCTOR/instructor-courses'
import { materialsSlice } from './INSTRUCTOR/materials-slice'
import { presentationSlice } from './INSTRUCTOR/presentation-slice'
import { videoSlice } from './INSTRUCTOR/video-slice'
import { instructorTestsSlice } from './INSTRUCTOR/instructor-tests-slice'

export const store = configureStore({
   reducer: {
      courses: coursesSlice.reducer,
      auth: authSlice.reducer,
      groups: groupsSlice.reducer,
      students: studentsSlice.reducer,
      teachers: teachersSlice.reducer,
      tasks: taskSlice.reducer,
      createTest: createTestSlice.reducer,
      link: linkSlice.reducer,
      instructorCourses: instructorCoursesSlice.reducer,
      materials: materialsSlice.reducer,
      presentation: presentationSlice.reducer,
      video: videoSlice.reducer,
      instructorTests: instructorTestsSlice.reducer,
   },
})
