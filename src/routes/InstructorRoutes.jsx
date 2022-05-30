import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { CourseDetailPage } from '../components/instructor/primerPage/CourseDetailPage'
import { CoursePrimerPage } from '../components/instructor/primerPage/CoursePrimerPage'
import { LessonCard } from '../components/UI/lessonCard/LessonCard'
import { ROUTES } from '../utils/constants/general'

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
               element={<CoursePrimerPage />}
            />
            <Route
               path={`/${ROUTES.INSTRUCTOR_COURSES}/:id/primer_page`}
               element={<CourseDetailPage />}
            />
            <Route path={ROUTES.INSTRUCTOR_COURSES} element={<LessonCard />} />
         </Routes>
      </div>
   )
}
