import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Students } from '../components/Admin/Students/Students'
import { Teachers } from '../components/Admin/teachers/Teachers'
import { ROUTES } from '../utils/constants/general'

export const AdminRoutes = () => {
   return (
      <Routes>
         <Route path="/*" element={<Navigate to={ROUTES.GROUPS} />} />
         <Route path={ROUTES.GROUPS} element={<div>groups</div>} />
         <Route path={ROUTES.COURSES} element={<div>Course</div>} />
         <Route path={ROUTES.TEACHERS} element={<Teachers />} />
         <Route path={ROUTES.STUDENTS} element={<Students />} />
      </Routes>
   )
}
