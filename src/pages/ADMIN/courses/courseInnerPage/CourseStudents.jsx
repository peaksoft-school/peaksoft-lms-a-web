import styled from '@emotion/styled/macro'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { baseFetch } from '../../../../api/baseFetch'
import { BreadCrumbs } from '../../../../components/UI/BreadCrumb/BreadCrumbs'
import { showErrorMessage } from '../../../../components/UI/notification/Notification'
import { AppTable } from '../../../../components/UI/table/AppTable'
import { getSingleCourse } from '../../../../store/courses-slice'
import { COURSE_STUDENTS } from '../../../../utils/constants/general'

export const CourseStudents = () => {
   const { id } = useParams()
   const dispatch = useDispatch()
   const { сourse } = useSelector((state) => state.courses)

   const [students, setStudents] = useState([])

   useEffect(() => {
      getCourseStudents()
      dispatch(getSingleCourse(id))
   }, [])

   const getCourseStudents = async () => {
      try {
         const response = await baseFetch({
            path: `api/courses/students/${id}`,
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
         name: сourse?.courseName,
      },
      {
         path: '/instructors',
         name: 'Студенты',
      },
   ]

   return (
      <Container>
         <BreadCrumbs pathsArray={pathsArray} />
         <AppTable columns={COURSE_STUDENTS} data={students} />
      </Container>
   )
}
const Container = styled.div`
   margin-top: -18px;
`
