import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { AppTable } from '../components/UI/table/AppTable'
import { ROUTES } from '../utils/constants/general'

export const AdminRoutes = () => {
   return (
      <div>
         <Routes>
            <Route path="/" element={<Navigate to={ROUTES.GROUPS} />} />
            <Route
               path={ROUTES.GROUPS}
               element={<AppTable columns={COLUMNS} data={DATA} />}
            />
            <Route path={ROUTES.COURSES} element={<div>Course</div>} />
            <Route path={ROUTES.TEACHERS} element={<div>TeacherPage</div>} />
            <Route path={ROUTES.STUDENTS} element={<div>Students</div>} />
         </Routes>
      </div>
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
