import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { ROUTES } from '../utils/constants/general'
import { AdminLayout } from '../layout/adminLayout/AdminLayout'
import { InstructorLayout } from '../layout/instructorLayout/InstructorLayout'
import { StudentLayout } from '../layout/studentLayout/StudentLayout'
import { PrivateRoute } from './privateRoutes/privateRoute'

export const AppRoutes = () => {
   const isAuthorized = true

   return (
      <Routes>
         <Route path="/" element={<div>login</div>} />
         <Route path="*" element={<div>page not found</div>} />
         <Route
            path={ROUTES.ADMIN}
            element={
               <PrivateRoute
                  Component={<AdminLayout />}
                  isAuthorized={isAuthorized}
               />
            }
         />
         <Route
            path={ROUTES.INSTRUCTOR}
            element={
               <PrivateRoute
                  Component={<InstructorLayout />}
                  isAuthorized={isAuthorized}
               />
            }
         />
         <Route
            path={ROUTES.STUDENT}
            element={
               <PrivateRoute
                  Component={<StudentLayout />}
                  isAuthorized={isAuthorized}
               />
            }
         />
      </Routes>
   )
}
