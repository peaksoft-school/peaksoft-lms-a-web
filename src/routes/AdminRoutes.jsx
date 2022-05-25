import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Students } from '../components/admin/Students/Students'
import { Teachers } from '../components/admin/teachers/Teachers'
import { Courses } from '../components/admin/courses/Courses'
import { CourseInstructors } from '../pages/ADMIN/courses/courseInnerPage/CourseInstructors'
import { CourseStudents } from '../pages/ADMIN/courses/courseInnerPage/CourseStudents'
import { ROUTES } from '../utils/constants/general'

export const AdminRoutes = () => {
   return (
      <div>
         <Routes>
            <Route path="/*" element={<Navigate to={ROUTES.GROUPS} />} />
            <Route path={ROUTES.GROUPS} element={<div>groups</div>} />
            <Route path={ROUTES.COURSES} element={<Courses />} />
            <Route path={ROUTES.TEACHERS} element={<Teachers />} />
            <Route path={ROUTES.STUDENTS} element={<Students />} />
            <Route
               path={`/${ROUTES.COURSES}/:id/course_instructors`}
               element={<CourseInstructors />}
            />
            <Route
               path={`${ROUTES.COURSES}/:id/course_students`}
               element={<CourseStudents />}
            />
         </Routes>
      </div>
   )
}
