import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { baseFetch } from '../../../../api/baseFetch'
import { BreadCrumbs } from '../../../../components/UI/breadCrumb/BreadCrumbs'
import { AppTable } from '../../../../components/UI/table/AppTable'

export const Instructors = () => {
   const params = useParams()
   const [teachers, setTeachers] = useState([])

   useEffect(() => {
      const getCourseTeachers = async () => {
         try {
            const response = await baseFetch({
               path: `api/courses/teachers/${params.id}`,
               method: 'GET',
            })
            setTeachers(response)
         } catch (error) {
            console.log(error)
         }
      }
      getCourseTeachers()
   }, [])
   return (
      <div>
         <BreadCrumbs pathsArray={pathsArray} />
         <AppTable columns={COLUMNS} data={teachers} />
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
