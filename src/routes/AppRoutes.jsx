import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { ROUTES } from '../utils/constants/general'
import { AdminLayout } from '../layout/adminLayout/AdminLayout'
import { InstructorLayout } from '../layout/instructorLayout/InstructorLayout'
import { StudentLayout } from '../layout/studentLayout/StudentLayout'
import { PrivateRoute } from './privateRoutes/privateRoute'
import { Login } from '../pages/Login/Login'

export const AppRoutes = () => {
   const { role } = useSelector((state) => state.auth.user)
   const isAuthorized = true

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
                  role={role && 'ADMIN'}
               />
            }
         />
         <Route
            path={ROUTES.INSTRUCTOR}
            element={
               <PrivateRoute
                  Component={<InstructorLayout />}
                  isAuthorized={isAuthorized}
                  role={role && 'INSTRUCTOR'}
               />
            }
         />
         <Route
            path={ROUTES.STUDENT}
            element={
               <PrivateRoute
                  Component={<StudentLayout />}
                  isAuthorized={isAuthorized}
                  role={role && 'STUDENT'}
               />
            }
         />
      </Routes>
   )
}
