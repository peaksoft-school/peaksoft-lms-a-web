import React from 'react'
import { useSelector } from 'react-redux'
import { BreadCrumbs } from '../../../../components/UI/breadCrumb/BreadCrumbs'
import { AppTable } from '../../../../components/UI/table/AppTable'

export const Students = () => {
   const studentData = useSelector((state) => state.students)
   console.log(studentData)
   return (
      <div>
         <BreadCrumbs pathsArray={pathsArray} />
         <AppTable columns={COLUMNS} data={studentData} />
      </div>
   )
}
const pathsArray = [
   {
      path: 'admin/courses',
      name: 'курсы',
   },
   {
      path: 'id1',
      name: 'администратор',
   },
   {
      path: '/instructors',
      name: 'Учителя',
   },
]
const COLUMNS = [
   {
      title: 'ID',
      accessKey: 'id',
      id: 1,
   },
   {
      title: 'Имя Фамилия',
      accessKey: 'fullName',
      id: 2,
   },
   {
      title: 'Группа',
      accessKey: 'groupName',
      id: 3,
   },
   {
      title: 'Формат обучения',
      accessKey: 'studyFormat',
      id: 4,
   },
   {
      title: 'Номер телефона',
      accessKey: 'phoneNumber',
      id: 5,
   },
   {
      title: 'E-mail',
      accessKey: 'email',
      id: 6,
   },
]
