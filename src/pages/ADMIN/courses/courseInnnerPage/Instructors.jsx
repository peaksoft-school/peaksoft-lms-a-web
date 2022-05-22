import React from 'react'
import { useSelector } from 'react-redux'
import { BreadCrumbs } from '../../../../components/UI/breadCrumb/BreadCrumbs'
import { AppTable } from '../../../../components/UI/table/AppTable'

export const Instructors = () => {
   const { teachersData } = useSelector((state) => state.teachers)
   return (
      <div>
         <BreadCrumbs pathsArray={pathsArray} />
         <AppTable columns={COLUMNS} data={teachersData} />
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
      id: 1,
      title: 'ID',
      accessKey: 'id',
   },
   {
      id: 2,
      title: 'Имя Фамилия',
      accessKey: 'fullName',
   },
   {
      id: 3,
      title: 'Специализация',
      accessKey: 'specialization',
   },
   {
      id: 4,
      title: 'Номер телефона',
      accessKey: 'phoneNumber',
   },
   {
      id: 5,
      title: 'E-mail',
      accessKey: 'email',
   },
]
