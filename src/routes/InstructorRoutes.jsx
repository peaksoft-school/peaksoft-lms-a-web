import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { InstrutorCourses } from '../components/instructor/primerPage/InstructorCourses'
import { Materials } from '../components/instructor/innerPage/materials/Materials'
import { ROUTES } from '../utils/constants/general'
import { Students } from '../components/instructor/innerPage/students/Students'
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
               path={`${ROUTES.INSTRUCTOR_COURSES}/:id/students`}
               element={<Students />}
            />
            <Route
               path={`${ROUTES.INSTRUCTOR_COURSES}/:id/materials/test/:testId`}
               element={<InstructorTests />}
            />
         </Routes>
      </div>
   )
}
