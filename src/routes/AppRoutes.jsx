import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { InstructorDashboard } from '../layout/Dashboard/InstructorDashboard'
import { StudentDashboard } from '../layout/Dashboard/StudentDashboard'
import { AdminPage } from '../pages/AdminPage'

export const AppRoutes = () => {
   return (
      <Routes>
         <Route path="/" element={<div>login</div>} />
         <Route
            path="*"
            element={<div style={{ textAlign: 'center' }}>page not found</div>}
         />
         <Route path="admin/*" element={<AdminPage />}>
            <Route path="groups" element={<div>GroupsPage</div>} />
            <Route path="courses" element={<div>CoursePage</div>} />
            <Route path="teachers" element={<div>TeacherPage</div>} />
            <Route path="students" element={<div>Students</div>} />
         </Route>
         <Route path="instructor" element={<InstructorDashboard />}>
            <Route path="mycourses" />
         </Route>
         <Route path="student" element={<StudentDashboard />}>
            <Route path="studentcourses" element={<div>students course</div>} />
         </Route>
      </Routes>
   )
}
