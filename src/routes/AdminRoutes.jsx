import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { GroupsPanel } from '../components/Admin/groups/GroupsPanel'
import { ROUTES } from '../utils/constants/general'

const GroupDetailPage = React.lazy(() =>
   import('../components/Admin/groups/GroupDetailPage')
)
const Courses = React.lazy(() => import('../components/Admin/courses/Courses'))
const Teachers = React.lazy(() =>
   import('../components/Admin/teachers/Teachers')
)
const Students = React.lazy(() =>
   import('../components/Admin/Students/Students')
)
const CourseInstructors = React.lazy(() =>
   import('../pages/ADMIN/courses/courseInnerPage/CourseInstructors')
)
const CourseStudents = React.lazy(() =>
   import('../pages/ADMIN/courses/courseInnerPage/CourseStudents')
)

export const AdminRoutes = () => {
   return (
      <Routes>
         <Route path="/*" element={<Navigate to={ROUTES.GROUPS} />} />
         <Route path={ROUTES.GROUPS} element={<GroupsPanel />} />
         <Route
            path={`/${ROUTES.GROUPS}/:id/group_students`}
            element={<GroupDetailPage />}
         />
         <Route exact path={ROUTES.COURSES} element={<Courses />} />
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
