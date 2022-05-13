import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { ROUTES } from '../utils/constants/general'
import { AdminLayout } from '../layout/adminLayout/AdminLayout'
import { InstructorLayout } from '../layout/instructorLayout/InstructorLayout'
import { StudentLayout } from '../layout/studentLayout/StudentLayout'
import { PrivateRoute } from './privateRoutes/privateRoute'
import { Login } from '../pages/Login/Login'

export const AppRoutes = () => {
   const { user } = useSelector((state) => state.auth)
   return (
      <Routes>
         <Route
            path="/"
            element={
               <Navigate
                  to={ROUTES.ADMIN || ROUTES.INSTRUCTOR || ROUTES.STUDENT}
               />
            }
         />
         <Route path="*" element={<div>page not found</div>} />
         <Route path={ROUTES.LOGIN} element={<Login />} />
         <Route
            path={ROUTES.ADMIN}
            element={
               <PrivateRoute
                  Component={<AdminLayout />}
                  role={user.role === 'ADMIN' && true}
               />
            }
         />
         <Route
            path={ROUTES.INSTRUCTOR}
            element={
               <PrivateRoute
                  Component={<InstructorLayout />}
                  role={user.role === 'INSTRUCTOR' && true}
               />
            }
         />
         <Route
            path={ROUTES.STUDENT}
            element={
               <PrivateRoute
                  Component={<StudentLayout />}
                  role={user.role === 'STUDENT' && true}
               />
            }
         />
      </Routes>
   )
}
