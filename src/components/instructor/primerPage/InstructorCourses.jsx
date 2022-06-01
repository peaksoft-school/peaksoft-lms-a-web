import React, { useEffect, useMemo, useState } from 'react'
import styled from '@emotion/styled'
import { useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Card } from '../../UI/card/Card'
import { ReactComponent as CourseStudent } from '../../../assets/icons/courseStudent.svg'
import { ReactComponent as CourseGroup } from '../../../assets/icons/courseGroup.svg'
import { ADD_GROUP, ADD_STUDENT } from '../../../utils/constants/general'
import {
   addGroupToCourse,
   addStudentToCourse,
   getCoursesOfInstructor,
   getGroupOfStudents,
   getStudents,
} from '../../../store/instructor-courses'
import { AddStudent } from './AddStudent'
import { AddStudentsOfGroup } from './AddStudentsOfGroup'
import {
   showErrorMessage,
   showSuccessMessage,
} from '../../UI/notification/Notification'

export const InstrutorCourses = () => {
   const dispatch = useDispatch()
   const { courses, groupOfStudents, students } = useSelector(
      (state) => state.instructorCourses
   )

   const [courseId, setCourseId] = useState()
   const [searchParams, setSearchParams] = useSearchParams()

   const showAddStudentModal = searchParams.get(ADD_STUDENT)
   const showAddGroupModal = searchParams.get(ADD_GROUP)

   const handleClose = () => {
      setSearchParams(false)
   }

   const addGroupHandler = (groupId) => {
      dispatch(addGroupToCourse({ groupId, courseId }))
         .unwrap()
         .then(() => {
            showSuccessMessage('Группа успешно добавлена')
            handleClose()
         })
         .catch(() => {
            showErrorMessage('Не удалось добавить группу')
         })
   }
   const addStudentHandler = (studentId) => {
      dispatch(addStudentToCourse({ studentId, courseId }))
         .unwrap()
         .then(() => {
            showSuccessMessage('Студент успешно добавлен')
            handleClose()
         })
         .catch(() => {
            showErrorMessage('Не удалось добавить студента')
         })
   }

   const addStudent = (id) => {
      setSearchParams({
         [ADD_STUDENT]: true,
      })
      dispatch(getStudents())
      setCourseId(id)
   }
   const addGroup = (id) => {
      setSearchParams({
         [ADD_GROUP]: true,
      })
      dispatch(getGroupOfStudents())
      setCourseId(id)
   }

   const options = useMemo(
      () => [
         {
            id: 'one',
            action: (id) => addStudent(id),
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
      ],
      []
   )

   useEffect(() => {
      dispatch(getCoursesOfInstructor())
      dispatch(getGroupOfStudents())
      dispatch(getStudents())
   }, [])

   const groupOptions = groupOfStudents.map((el) => {
      return {
         id: el.id,
         title: el.groupName,
      }
   })

   return (
      <Wrapper>
         <Container>
            {courses.map((course) => (
               <Card
                  key={course.id}
                  options={options}
                  image={course.image}
                  title={course.courseName}
                  description={course.description}
                  date={course.dateOfStart}
                  id={course.id}
                  path={`${course.id}/materials`}
               />
            ))}
         </Container>
         <AddStudent
            isModalOpen={Boolean(showAddStudentModal)}
            onClose={handleClose}
            students={students}
            onAdd={addStudentHandler}
         />
         <AddStudentsOfGroup
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
   justify-content: start;
   & p {
      margin-left: 8px;
   }
`
