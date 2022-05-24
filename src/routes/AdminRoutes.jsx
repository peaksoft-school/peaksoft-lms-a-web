import React from 'react'
import { useSelector } from 'react-redux'
import { Routes, Route, Navigate } from 'react-router-dom'
import { GroupsPanel } from '../components/admin/groups/GroupsPanel'
import { Teachers } from '../components/admin/teachers/Teachers'
import { Students } from '../components/admin/Students/Students'
import { ROUTES } from '../utils/constants/general'
import { GroupDetailPage } from '../components/admin/groups/GroupDetailPage'

export const AdminRoutes = () => {
   return (
      <Routes>
         <Route path="/*" element={<Navigate to={ROUTES.GROUPS} />} />
         <Route path={ROUTES.GROUPS} element={<GroupsPanel />} />
         <Route path="groups/:id" element={<GroupDetailPage />} />
         <Route path={ROUTES.COURSES} element={<div>Course</div>} />
         <Route path={ROUTES.TEACHERS} element={<Teachers />} />
         <Route path={ROUTES.STUDENTS} element={<Students />} />
      </Routes>
   )
}
