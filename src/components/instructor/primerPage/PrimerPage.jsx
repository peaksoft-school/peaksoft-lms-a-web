import React, { useEffect, useMemo, useState } from 'react'
import styled from '@emotion/styled'
import { useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Card } from '../../UI/card/Card'
import { ReactComponent as CourseStudent } from '../../../assets/icons/courseStudent.svg'
import { ReactComponent as CourseGroup } from '../../../assets/icons/courseGroup.svg'
import {
   ADD_COURSES,
   ADD_GROUP,
   ADD_STUDENT,
} from '../../../utils/constants/general'
import {
   addGroupToCourse,
   getGroupStudents,
   // addGroupToCourse,
   getInstructorCourses,
   getStudents,
} from '../../../store/primer-page-slice'
import { AddStudent } from './AddStudent'
import { AddGroup } from './AddGroup'

export const PrimerPage = () => {
   const dispatch = useDispatch()

   const { instructorCourseData, groupStudents, students } = useSelector(
      (state) => state.instructorCourses
   )
   console.log(instructorCourseData)
   const [courseId, setCourseId] = useState()
   const [searchParams, setSearchParams] = useSearchParams()
   const [groupId, setGroupId] = useState()
   const showAddStudentModal = searchParams.get(ADD_STUDENT)
   const showAddGroupModal = searchParams.get(ADD_GROUP)

   const showAddCourses = searchParams.get(ADD_COURSES)

   const addGroupHandler = (value, groupId) => {
      dispatch(addGroupToCourse({ value, groupId, courseId: 1 }))
   }

   const addStudent = () => {
      setSearchParams({
         [ADD_STUDENT]: true,
      })
      dispatch(getStudents())
   }
   const addGroup = (id) => {
      setSearchParams({
         [ADD_GROUP]: true,
      })
      dispatch(getGroupStudents())
      setGroupId(id)
   }
   const handleClose = () => {
      setSearchParams(false)
   }

   const options = useMemo(() => [
      {
         id: 'one',
         action: () => addStudent(),
         content: (
            <StyledIcon>
               <CourseStudent />
               <p>Добавить студента в курс</p>
            </StyledIcon>
         ),
      },
      {
         id: 'two',
         action: (id) => addGroup(id),
         content: (
            <StyledIcon>
               <CourseGroup />
               <p>Добавить группу в курс</p>
            </StyledIcon>
         ),
      },
   ])

   useEffect(() => {
      dispatch(getInstructorCourses())
      dispatch(getGroupStudents())
      dispatch(getStudents())
   }, [])

   const groupOptions = groupStudents.map((el) => {
      return {
         id: el.id,
         title: el.groupName,
      }
   })

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
                  path={`${course.id}/primer_page`}
               />
            ))}
         </Container>
         <AddStudent
            isModalOpen={Boolean(showAddStudentModal)}
            onClose={handleClose}
            students={students}
         />
         <AddGroup
            isModalOpen={Boolean(showAddGroupModal)}
            onClose={handleClose}
            groups={groupOptions}
            onAdd={addGroupHandler}
         />
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
