import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Courses } from '../components/admin/courses/Courses'
import { Teachers } from '../components/admin/teachers/Teachers'
import { Instructors } from '../pages/ADMIN/courses/courseInnnerPage/Instructors'
import { Students } from '../pages/ADMIN/courses/courseInnnerPage/Students'
import { ROUTES } from '../utils/constants/general'

export const AdminRoutes = () => {
   return (
      <div>
         <Routes>
            <Route path="/" element={<Navigate to={ROUTES.GROUPS} />} />
            <Route path={ROUTES.GROUPS} element={<div>groups</div>} />
            <Route path={ROUTES.COURSES} element={<Courses />} />
            <Route path={ROUTES.TEACHERS} element={<Teachers />} />
            <Route path={ROUTES.STUDENTS} element={<div>students</div>} />
            <Route
               path={`/${ROUTES.COURSES}/:id/instructors`}
               element={<Instructors />}
            />
            <Route
               path={`${ROUTES.COURSES}/:id/students`}
               element={<Students />}
            />
         </Routes>
      </div>
   )
}
