import React, { useEffect, useMemo, useState } from 'react'
import styled from '@emotion/styled'
import { useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Card } from '../../UI/card/Card'
import { ReactComponent as CourseStudent } from '../../../assets/icons/courseStudent.svg'
import { ReactComponent as CourseGroup } from '../../../assets/icons/courseGroup.svg'
import {
   APPOINT_TEACHER,
   DELETE_COURSE,
   EDIT_COURSE,
} from '../../../utils/constants/general'
import { getSingleCourse } from '../../../store/courses-slice'
import { getInstructorCourses } from '../../../store/primer-page-slice'

export const PrimerPage = () => {
   const dispatch = useDispatch()
   const { instructorCourseData } = useSelector(
      (state) => state.instructorCourses
   )
   const [searchParams, setSearchParams] = useSearchParams()
   const [courseId, setCourseId] = useState()

   const assignTeacher = (id) => {
      setSearchParams({
         [APPOINT_TEACHER]: true,
         teacherId: id,
      })
      setCourseId(id)
   }
   useEffect(() => {
      dispatch(getInstructorCourses())
   }, [])
   const getCourseId = (id) => {
      setSearchParams({ [DELETE_COURSE]: true })
      setCourseId(id)
   }

   const editCourse = (id) => {
      dispatch(getSingleCourse(id))
      setSearchParams({
         [EDIT_COURSE]: true,
         courseId: id,
      })
   }

   const options = useMemo(() => [
      {
         id: 'one',
         action: (id) => assignTeacher(id),
         content: (
            <StyledIcon>
               <CourseStudent />
               <p>Добавить студента в курс</p>ы
            </StyledIcon>
         ),
      },
      {
         id: 'two',
         action: (id) => editCourse(id),
         content: (
            <StyledIcon>
               <CourseGroup />
               <p>Добавить группу в курс</p>
            </StyledIcon>
         ),
      },
   ])
   return (
      <Wrapper>
         <Container>
            {instructorCourseData.map((course) => (
               <Card
                  key={course.id}
                  options={options}
                  image={course.image}
                  title={course.courseName}
                  description={course.description}
                  date={course.dateOfStart}
                  id={course.id}
                  path={`${course.id}/course_instructors`}
               />
            ))}
         </Container>
      </Wrapper>
   )
}

const Wrapper = styled.div`
   position: relative;
   height: 880px;
   margin: 0 auto;
`
const Container = styled.div`
   cursor: pointer;
   flex-wrap: wrap;
   grid-row: 30px;
   display: grid;
   grid-template-columns: repeat(4, 1fr);
   grid-template-rows: repeat(2, 1fr);
   grid-column-gap: 30px;
   grid-row-gap: 30px;
`
const StyledIcon = styled.div`
   display: flex;
   & p {
      margin-left: 8px;
   }
`
