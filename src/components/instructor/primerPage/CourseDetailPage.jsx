import React, { useMemo, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import styled from '@emotion/styled'
import { AppTable } from '../../UI/table/AppTable'
import {
   getSingleCourses,
   getStudentsByGroup,
} from '../../../store/primer-page-slice'
import { BreadCrumbs } from '../../UI/BreadCrumb/BreadCrumbs'

export const CourseDetailPage = () => {
   const dispatch = useDispatch()
   const { newGroupStudents, singleCourse } = useSelector(
      (state) => state.instructorCourses
   )
   const { id } = useParams()

   useEffect(() => {
      dispatch(getStudentsByGroup(id))
      dispatch(getSingleCourses(id))
   }, [])

   const COURSE_INFO = useMemo(() => [
      { title: 'N', accessKey: 'id', id: 'one' },
      { title: 'Имя Фамилия', accessKey: 'fullName', id: 'two' },
      { title: 'Группа', accessKey: 'groupName', id: 'three' },
      { title: 'Формат обучения', accessKey: 'studyFormat', id: 'four' },
      { title: 'Номер телефона', accessKey: 'phoneNumber', id: 'five' },
      { title: 'E-mail', accessKey: 'email', id: 'six' },
   ])

   const pathArray = [
      { path: 'instructor/instructor_course', name: 'Курсы' },
      { path: 'instructor/primer_page', name: singleCourse?.courseName },
      { path: 'instructor/instructor_course', name: 'Студенты' },
   ]
   return (
      <Container>
         <BreadCrumbs pathsArray={pathArray} />
         <AppTable data={newGroupStudents} columns={COURSE_INFO} />
      </Container>
   )
}

const Container = styled.div`
   margin-top: 35px;
`
