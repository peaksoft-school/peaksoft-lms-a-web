import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { ROUTES } from '../utils/constants/general'
import { AdminLayout } from '../layout/adminLayout/AdminLayout'
import { InstructorLayout } from '../layout/instructorLayout/InstructorLayout'
import { StudentLayout } from '../layout/studentLayout/StudentLayout'
import { PrivateRoute } from './privateRoutes/privateRoute'
import { Login } from '../pages/Login/Login'

export const AppRoutes = () => {
   const isAuthorized = true
   const roles = {
      admin: 'admin',
      instructor: 'instructor',
      student: 'student',
   }

   return (
      <Routes>
         <Route path="/" element={<Login />} />
         <Route path="*" element={<div>page not found</div>} />
         <Route
            path={ROUTES.ADMIN}
            element={
               <PrivateRoute
                  Component={<AdminLayout />}
                  isAuthorized={isAuthorized}
                  role={roles.admin}
               />
            }
         />
         <Route
            path={ROUTES.INSTRUCTOR}
            element={
               <PrivateRoute
                  Component={<InstructorLayout />}
                  isAuthorized={isAuthorized}
                  role={roles.instructor}
               />
            }
         />
         <Route
            path={ROUTES.STUDENT}
            element={
               <PrivateRoute
                  Component={<StudentLayout />}
                  isAuthorized={isAuthorized}
                  role={roles.student}
               />
            }
         />
      </Routes>
   )
}
