import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Test } from '../components/instructor/lesson/test/Test'
import { InstrutorCourses } from '../components/instructor/primerPage/InstructorCourses'
import { Materials } from '../components/instructor/innerPage/materials/Materials'
import { ROUTES } from '../utils/constants/general'
import { Students } from '../components/instructor/innerPage/students/Students'
import { TaskInnerPage } from '../components/instructor/lesson/innerPage/Task/TaskInnerPage'
import { LessonVideo } from '../components/instructor/innerPage/materials/video/LessonVideo'
import { InstructorTests } from '../components/instructor/lesson/innerPage/Test/InstructorTests'

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
               path={`${ROUTES.INSTRUCTOR_COURSES}/:id/materials/task/:taskId`}
               element={<TaskInnerPage />}
            />
            <Route
               path={`${ROUTES.INSTRUCTOR_COURSES}/:id/materials/lesson_video/:lessonId`}
               element={<LessonVideo />}
            />
            <Route
               path={`${ROUTES.INSTRUCTOR_COURSES}/:id/materials/test/:lessonId/:testId`}
               element={<InstructorTests />}
            />
         </Routes>
      </div>
   )
}
