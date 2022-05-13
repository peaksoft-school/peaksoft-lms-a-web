import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { TeachersPanel } from '../components/admin/teachersPanel/TeachersPanel'
import { ROUTES } from '../utils/constants/general'

export const AdminRoutes = () => {
   return (
      <div>
         <Routes>
            <Route path="/" element={<Navigate to={ROUTES.GROUPS} />} />
            <Route path={ROUTES.GROUPS} element={<div>groups</div>} />
            <Route path={ROUTES.COURSES} element={<div>Course</div>} />
            <Route path={ROUTES.TEACHERS} element={<TeachersPanel />} />
            <Route path={ROUTES.STUDENTS} element={<div>Students</div>} />
         </Routes>
      </div>
   )
}
