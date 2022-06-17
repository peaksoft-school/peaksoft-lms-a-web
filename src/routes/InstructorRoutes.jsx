import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { InstrutorCourses } from '../components/instructor/primerPage/InstructorCourses'
import { ROUTES } from '../utils/constants/general'

const Materials = React.lazy(() =>
   import('../components/instructor/innerPage/materials/Materials')
)
const Test = React.lazy(() =>
   import('../components/instructor/lesson/test/Test')
)
const Students = React.lazy(() =>
   import('../components/instructor/innerPage/students/Students')
)
const Task = React.lazy(() => import('../components/instructor/task/Task'))
const EditTask = React.lazy(() =>
   import('../components/instructor/task/EditTask')
)
const InstructorTests = React.lazy(() =>
   import('../components/instructor/lesson/innerPage/Test/InstructorTests')
)
const VideoInnerPage = React.lazy(() =>
   import('../components/instructor/innerPage/materials/video/VideoInnerPage')
)
const PresentationInnerPage = React.lazy(() =>
   import('../components/instructor/lesson/presentation/PresentationInnerPage')
)
const TaskInnerPage = React.lazy(() =>
   import('../components/instructor/lesson/innerPage/Task/TaskInnerPage')
)

export const InstructorRoutes = () => {
   return (
      <div>
         <Routes>
            <Route
               path="/*"
               element={<Navigate to={ROUTES.INSTRUCTOR_COURSES} />}
            />
            <Route
               path={ROUTES.INSTRUCTOR_COURSES}
               element={<InstrutorCourses />}
            />
            <Route
               path={`${ROUTES.INSTRUCTOR_COURSES}/:id/materials`}
               element={<Materials />}
            />
            <Route
               path={`/${ROUTES.INSTRUCTOR_COURSES}/:id/materials/video/:videoId`}
               element={<VideoInnerPage />}
            />
            <Route
               path={`/${ROUTES.INSTRUCTOR_COURSES}/:id/materials/presentation/:presentationId`}
               element={<PresentationInnerPage />}
            />
            <Route
               path={`${ROUTES.INSTRUCTOR_COURSES}/:id/materials/create_test/:lessonId`}
               element={<Test />}
            />
            <Route
               path={`${ROUTES.INSTRUCTOR_COURSES}/:id/materials/edit_test/:testId`}
               element={<Test />}
            />
            <Route
               path={`${ROUTES.INSTRUCTOR_COURSES}/:id/students`}
               element={<Students />}
            />
            <Route
               path={`${ROUTES.INSTRUCTOR_COURSES}/:id/materials/create_task/:lessonId`}
               element={<Task />}
            />
            <Route
               path={`${ROUTES.INSTRUCTOR_COURSES}/:id/materials/edit_task/:taskId`}
               element={<EditTask />}
            />
            <Route
               path={`${ROUTES.INSTRUCTOR_COURSES}/:id/materials/test/:lessonId/:testId`}
               element={<InstructorTests />}
            />
            <Route
               path={`${ROUTES.INSTRUCTOR_COURSES}/:id/materials/task/:taskId`}
               element={<TaskInnerPage />}
            />
         </Routes>
      </div>
   )
}
