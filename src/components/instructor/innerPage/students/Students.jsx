import React, { useEffect, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import styled from '@emotion/styled'
import { AppTable } from '../../../UI/table/AppTable'
import { STUDENTS_INFO } from '../../../../utils/constants/general'
import {
   getSingleCourse,
   getStudentsByGroup,
} from '../../../../store/instructor-courses'
import { BreadCrumbs } from '../../../UI/BreadCrumb/BreadCrumbs'

export const Students = () => {
   const dispatch = useDispatch()
   const { newGroupStudents, singleCourse } = useSelector(
      (state) => state.instructorCourses
   )
   const { id } = useParams()

   useEffect(() => {
      dispatch(getStudentsByGroup(id))
      dispatch(getSingleCourse(id))
   }, [])

   const pathArray = useMemo(() => [
      { path: 'instructor/instructor_course', name: 'Курсы' },
      { path: 'instructor/primer_page', name: singleCourse?.courseName },
      { path: 'instructor/instructor_course', name: 'Студенты' },
   ])
   return (
      <Container>
         <BreadCrumbs pathsArray={pathArray} />
         <AppTable data={newGroupStudents} columns={STUDENTS_INFO} />
      </Container>
   )
}

const Container = styled.div`
   margin-top: 35px;
`
