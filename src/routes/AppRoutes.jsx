import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { InstructorDashboard } from '../layout/Dashboard/InstructorDashboard'
import { StudentDashboard } from '../layout/Dashboard/StudentDashboard'
import { AdminPage } from '../pages/AdminPage'
import { ROUTES } from '../utils/constants/general'

export const AppRoutes = () => {
   return (
      <Routes>
         <Route path="/" element={<div>login</div>} />
         <Route
            path="*"
            element={<div style={{ textAlign: 'center' }}>page not found</div>}
         />
         <Route path={ROUTES.ADMIN} element={<AdminPage />}>
            <Route path={ROUTES.GROUPS} element={<div>GroupsPage</div>} />
            <Route path={ROUTES.COURSES} element={<div>CoursePage</div>} />
            <Route path={ROUTES.TEACHERS} element={<div>TeacherPage</div>} />
            <Route path={ROUTES.STUDENTS} element={<div>Students</div>} />
         </Route>
         <Route path={ROUTES.INSTRUCTOR} element={<InstructorDashboard />}>
            <Route path={ROUTES.INSTRUCTOR_COURSES} />
         </Route>
         <Route path={ROUTES.STUDENT} element={<StudentDashboard />}>
            <Route
               path={ROUTES.STUDENT_COURSES}
               element={<div>students course</div>}
            />
         </Route>
      </Routes>
   )
}
