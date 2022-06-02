import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { LessonTest } from '../components/instructor/lesson/test/LessonTest'
import { InstrutorCourses } from '../components/instructor/primerPage/InstructorCourses'
import { Materials } from '../components/instructor/innerPage/materials/Materials'
import { ROUTES } from '../utils/constants/general'
import { Students } from '../components/instructor/innerPage/students/Students'

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
               element={<LessonTest />}
            />
            <Route
               path={`${ROUTES.INSTRUCTOR_COURSES}/:id/students`}
               element={<Students />}
            />
         </Routes>
      </div>
   )
}
