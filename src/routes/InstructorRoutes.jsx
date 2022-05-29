import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { CourseDetailPage } from '../components/instructor/primerPage/CourseDetailPage'
import { PrimerPage } from '../components/instructor/primerPage/PrimerPage'
import { ROUTES } from '../utils/constants/general'

export const InstructorRoutes = () => {
   return (
      <div>
         <Routes>
            <Route
               path="/*"
               element={<Navigate to={ROUTES.INSTRUCTOR_COURSES} />}
            />
            <Route path={ROUTES.INSTRUCTOR_COURSES} element={<PrimerPage />} />
            <Route
               path={`/${ROUTES.INSTRUCTOR_COURSES}/:id/primer_page`}
               element={<CourseDetailPage />}
            />
         </Routes>
      </div>
   )
}
