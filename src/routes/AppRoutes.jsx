import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { AppTable } from '../components/UI/Table/AppTable'
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
            <Route
               path={ROUTES.GROUPS}
               element={<AppTable columns={COLUMNS} data={DATA} />}
            />
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

const COLUMNS = [
   {
      title: 'ID',
      accessKey: 'id',
   },
   {
      title: 'Имя Фамилия',
      accessKey: 'name',
   },
   {
      title: 'Группа',
      accessKey: 'group',
   },
   {
      title: 'Формат обучения',
      accessKey: 'study_format',
   },
   {
      title: 'Номер телефона',
      accessKey: 'mobile_phone',
   },
   {
      title: 'E-mail',
      accessKey: 'email',
   },
]

let DATA = [
   {
      id: 1,
      name: 'John Smith',
      group: 'JS-4',
      study_format: 'Онлайн',
      mobile_phone: '0222232312',
      email: 'user@gmail.com',
      password: 'hjdj4343',
   },
   {
      id: 2,
      name: 'John Smith',
      group: 'JS-4',
      study_format: 'Онлайн',
      mobile_phone: '0222232312',
      email: 'user@gmail.com',
      password: 'hjdj4343',
   },
   {
      id: 3,
      name: 'John Smith',
      group: 'JS-4',
      study_format: 'Онлайн',
      mobile_phone: '0222232312',
      email: 'user@gmail.com',
      password: 'hjdj4343',
   },
   {
      id: 4,
      name: 'John Smith',
      group: 'JS-4',
      study_format: 'Онлайн',
      mobile_phone: '0222232312',
      email: 'user@gmail.com',
      password: 'hjdj4343',
   },
]
