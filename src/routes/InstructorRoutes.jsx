import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { LessonTest } from '../components/insructor/lesson/test/LessonTest'
import { Materials } from '../components/instructor/innerPage/materials/Materials'
import { ROUTES } from '../utils/constants/general'

export const InstructorRoutes = () => {
   return (
      <div>
         <Routes>
            <Route
               path="/*"
               element={<Navigate to={ROUTES.INSTRUCTOR_COURSES} />}
            />
            <Route path={ROUTES.INSTRUCTOR_COURSES} element={<LessonTest />} />
            <Route
               path={`${ROUTES.INSTRUCTOR_COURSES}/:id/materials`}
               element={<Materials />}
            />
            <Route
               path={`${ROUTES.INSTRUCTOR_COURSES}/:id/students`}
               element={<div>Baiaaly</div>}
            />
         </Routes>
      </div>
   )
}
