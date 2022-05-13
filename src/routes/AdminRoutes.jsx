import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Courses } from '../components/admin/courses/Courses'
import { ROUTES } from '../utils/constants/general'

export const AdminRoutes = () => {
   return (
      <div>
         <Routes>
            <Route path="" element={<Navigate to={ROUTES.GROUPS} />} />
            <Route path={ROUTES.GROUPS} element={<div>groups</div>} />
            <Route path={ROUTES.COURSES} element={<Courses />} />
            <Route path={ROUTES.TEACHERS} element={<div>teachers</div>} />
            <Route path={ROUTES.STUDENTS} element={<div>Students</div>} />
         </Routes>
      </div>
   )
}
