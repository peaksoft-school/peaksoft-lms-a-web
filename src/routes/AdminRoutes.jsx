import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Students } from '../components/Admin/Students/Students'
import { ROUTES } from '../utils/constants/general'

export const AdminRoutes = () => {
   return (
      <Routes>
         <Route path="/*" element={<Navigate to={ROUTES.GROUPS} />} />
         <Route path={ROUTES.GROUPS} element={<div>groups</div>} />
         <Route path={ROUTES.COURSES} element={<div>Course</div>} />
         <Route path={ROUTES.TEACHERS} element={<div>TeacherPage</div>} />
         <Route path={ROUTES.STUDENTS} element={<Students />} />
      </Routes>
   )
}
