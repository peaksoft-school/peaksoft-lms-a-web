import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { GroupsPanel } from '../components/admin/groups/GroupsPanel'
import { Teachers } from '../components/admin/teachers/Teachers'
import { Students } from '../components/admin/Students/Students'
import { ROUTES } from '../utils/constants/general'
import { GroupDetailPage } from '../components/admin/groups/GroupDetailPage'
import { Courses } from '../components/admin/courses/Courses'
import { CourseStudents } from '../pages/ADMIN/courses/courseInnerPage/CourseStudents'
import { CourseInstructors } from '../pages/ADMIN/courses/courseInnerPage/CourseInstructors'

export const AdminRoutes = () => {
   return (
      <Routes>
         <Route path="/*" element={<Navigate to={ROUTES.GROUPS} />} />
         <Route path={ROUTES.GROUPS} element={<GroupsPanel />} />
         <Route
            path={`/${ROUTES.GROUPS}/:id/group_students`}
            element={<GroupDetailPage />}
         />
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
   )
}
