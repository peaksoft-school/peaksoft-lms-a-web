import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { baseFetch } from '../../../../api/baseFetch'
import { BreadCrumbs } from '../../../../components/UI/breadCrumb/BreadCrumbs'
import { AppTable } from '../../../../components/UI/table/AppTable'
import { getAllCourses } from '../../../../store/courses-slice'

export const Students = () => {
   const dispatch = useDispatch()
   const params = useParams()
   const { courses } = useSelector((state) => state.courses)
   const [students, setStudents] = useState([])
   const [course, setCourse] = useState('')

   useEffect(() => {
      courses.filter((el) => {
         if (el.id == params.id) {
            setCourse(el.courseName)
         }
         return el
      })
   }, [])

   const pathsArray = [
      {
         path: 'admin/course',
         name: 'курсы',
      },
      {
         path: 'admin/course',
         name: course,
      },
      {
         path: '/instructors',
         name: 'Студенты',
      },
   ]

   useEffect(() => {
      dispatch(getAllCourses(1))
      getCourseStudents()
   }, [])

   const getCourseStudents = async () => {
      try {
         const response = await baseFetch({
            path: `api/courses/students/${params.id}`,
            method: 'GET',
         })
         setStudents(response)
      } catch (error) {
         console.log(error)
      }
   }
   return (
      <div>
         <BreadCrumbs pathsArray={pathsArray} />
         <AppTable columns={COLUMNS} data={students} />
      </div>
   )
}

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
