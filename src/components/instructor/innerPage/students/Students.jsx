import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useSearchParams } from 'react-router-dom'
import styled from '@emotion/styled'
import { AppTable } from '../../../UI/table/AppTable'
import { ReactComponent as AddStudentIcon } from '../../../../assets/icons/addStudent.svg'
import { ReactComponent as AddGroupIcon } from '../../../../assets/icons/addGroup.svg'
import {
   showErrorMessage,
   showSuccessMessage,
} from '../../../UI/notification/Notification'
import {
   ADD_GROUP,
   ADD_STUDENT,
   STUDENTS_INFO,
} from '../../../../utils/constants/general'
import {
   addGroupToCourse,
   addStudentToCourse,
   getGroupOfStudents,
   getSingleCourse,
   getStudents,
   getStudentsByCourse,
} from '../../../../store/INSTRUCTOR/instructor-courses'
import { BreadCrumbs } from '../../../UI/BreadCrumb/BreadCrumbs'
import { Button } from '../../../UI/button/Button'
import { AddStudent } from '../../primerPage/AddStudent'
import { AddStudentsOfGroup } from '../../primerPage/AddStudentsOfGroup'

export const Students = () => {
   const dispatch = useDispatch()
   const { newStudentsOfCourse, singleCourse, students, groupOfStudents } =
      useSelector((state) => state.instructorCourses)
   const [searchParams, setSearchParams] = useSearchParams()
   const showAddStudentModal = searchParams.get(ADD_STUDENT)
   const showAddGroupModal = searchParams.get(ADD_GROUP)

   const { id } = useParams()

   const handleClose = () => {
      setSearchParams(false)
   }
   const addStudentHandler = (studentId) => {
      dispatch(addStudentToCourse({ studentId, id }))
         .unwrap()
         .then(() => {
            showSuccessMessage('Студент успешно добавлен')
            dispatch(getStudentsByCourse(id))
         })
         .catch(() => {
            showErrorMessage('Не удалось добавить студента')
         })
   }
   const addGroupHandler = (groupId) => {
      dispatch(addGroupToCourse({ groupId, id }))
         .unwrap()
         .then(() => {
            showSuccessMessage('Группа успешно добавлена')
            handleClose()
            dispatch(getStudentsByCourse(id))
         })
         .catch(() => {
            showErrorMessage('Не удалось добавить группу')
         })
   }

   const openAddStudentModal = () => {
      setSearchParams({
         [ADD_STUDENT]: true,
      })
      dispatch(getStudents())
   }
   const openAddGroupModal = () => {
      setSearchParams({
         [ADD_GROUP]: true,
      })
      dispatch(getGroupOfStudents())
   }

   const breadcrumbs = [
      { path: 'instructor/instructor_course', name: 'Курсы' },
      { path: 'instructor/students', name: singleCourse?.courseName },
      { path: 'instructor/instructor_course', name: 'Студенты' },
   ]

   const filteredStudents = students.filter(
      (item) => !newStudentsOfCourse.some((el) => item.id === el.id)
   )

   const filteredGroups = groupOfStudents.filter(
      (item) => !newStudentsOfCourse.some((el) => item.id === el.id)
   )
   const groups = filteredGroups.map((el) => {
      return {
         id: el.id,
         title: el.groupName,
      }
   })

   useEffect(() => {
      dispatch(getSingleCourse(id))
      dispatch(getStudentsByCourse(id))
   }, [])

   return (
      <>
         <Container>
            <StyledBreadCrumbs>
               <BreadCrumbs pathsArray={breadcrumbs} />
            </StyledBreadCrumbs>
            <StyledButton>
               <Button
                  background="none"
                  bgHover="#1D60FF1A"
                  bgActive="#6190FF4D"
                  border="1px solid #1D60FF"
                  color="#3772FF"
                  onClick={openAddStudentModal}
               >
                  <StyledAddStudent />
                  Добавить студента в курс
               </Button>
               <Button
                  background="#3772FF"
                  bgHover="#1D60FF"
                  bgActive="#6190FF"
                  onClick={openAddGroupModal}
               >
                  <StyledAddGroup /> Добавить группу в курс
               </Button>
            </StyledButton>
            <AddStudent
               isModalOpen={Boolean(showAddStudentModal)}
               onClose={handleClose}
               students={filteredStudents}
               onAdd={addStudentHandler}
            />
            <AddStudentsOfGroup
               isModalOpen={Boolean(showAddGroupModal)}
               onClose={handleClose}
               groups={groups}
               onAdd={addGroupHandler}
            />
         </Container>
         <AppTable data={newStudentsOfCourse} columns={STUDENTS_INFO} />
      </>
   )
}

const Container = styled.div`
   display: flex;
   justify-content: space-between;
   margin: 7px;
`
const StyledBreadCrumbs = styled.div`
   margin-top: 40px;
`
const StyledButton = styled.div`
   display: flex;
   justify-content: space-around;
   width: 535px;
   height: 45px;
   margin-top: 5px;
`
const StyledAddStudent = styled(AddStudentIcon)`
   margin-right: 10px;
`
const StyledAddGroup = styled(AddGroupIcon)`
   margin-right: 10px;
`
