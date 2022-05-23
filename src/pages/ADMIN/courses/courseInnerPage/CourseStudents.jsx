import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { baseFetch } from '../../../../api/baseFetch'
import { BreadCrumbs } from '../../../../components/UI/breadCrumb/BreadCrumbs'
import { showErrorMessage } from '../../../../components/UI/notification/Notification'
import { AppTable } from '../../../../components/UI/table/AppTable'
import { COURSE_STUDENTS } from '../../../../utils/constants/general'

export const CourseStudents = () => {
   const params = useParams()

   const { courses } = useSelector((state) => state.courses)

   const [students, setStudents] = useState([])
   const [course, setCourse] = useState('')

   useEffect(() => {
      getCourseStudents()

      courses.filter((el) => {
         if (el.id == params.id) {
            setCourse(el.courseName)
         }
         return el
      })
   }, [])

   const getCourseStudents = async () => {
      try {
         const response = await baseFetch({
            path: `api/courses/students/${params.id}`,
            method: 'GET',
         })
         setStudents(response)
      } catch (error) {
         showErrorMessage(error)
      }
   }

   const pathsArray = [
      {
         path: 'admin/courses',
         name: 'курсы',
      },
      {
         path: 'courses',
         name: course,
      },
      {
         path: '/instructors',
         name: 'Студенты',
      },
   ]

   return (
      <div>
         <BreadCrumbs pathsArray={pathsArray} />
         <AppTable columns={COURSE_STUDENTS} data={students} />
      </div>
   )
}
