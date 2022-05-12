import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { ROUTES } from '../utils/constants/general'

export const StudentRoutes = () => {
   return (
      <div>
         <Routes>
            <Route path="" element={<Navigate to={ROUTES.STUDENT_COURSES} />} />
            <Route
               path={ROUTES.STUDENT_COURSES}
               element={<div>students course</div>}
            />
         </Routes>
      </div>
   )
}
