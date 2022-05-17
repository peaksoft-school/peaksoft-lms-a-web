/* eslint-disable no-useless-computed-key */
import React, { useState } from 'react'
import styled from '@emotion/styled'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { Card } from '../../UI/card/Card'
import { ReactComponent as PinIcon } from '../../../assets/icons/pinnedIcon.svg'
import { ReactComponent as EditIcon } from '../../../assets/icons/edit.svg'
import { ReactComponent as TrashIcon } from '../../../assets/icons/trashIcon.svg'
import { Button } from '../../UI/button/Button'
import ConfirmModal from '../../UI/modal/ConfirmModal'
import { AppointTeacher } from './AppointTeacher'
import { EditCourse } from './EditCourse'
import { AddNewCourse } from './AddNewCourse'
import { deleteCourse, getSingleCourse } from '../../../store/coursesSlice'

export const CourseCards = () => {
   const dispatch = useDispatch()

   const { courses, course } = useSelector((state) => state.courses)

   const [courseId, setCourseId] = useState({})
   const [isModalOpen, setIsModalOpen] = useState(false)
   const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)
   const [isEditModalOpen, setIsEditModalOpen] = useState(false)

   const [searchParamsForCreate, setSearchParamsForCreateStudents] =
      useSearchParams()
   const [searchParamsForEditStudents, setSearchParamsForEditStudents] =
      useSearchParams()

   const showAddStudentsModal = searchParamsForCreate.get('add_course')
   const showEditStudentsModal = searchParamsForEditStudents.get('edit_course')

   const options = [
      {
         id: '1',
         action: (course) => appointATeacher(course),
         content: (
            <StyledIcon>
               <PinIcon />
               <p>Назначить учителя</p>
            </StyledIcon>
         ),
      },
      {
         id: '2',
         action: (course) => editATeacher(course),
         content: (
            <StyledIcon>
               <EditIcon />
               <p>Редактировать</p>
            </StyledIcon>
         ),
      },
      {
         id: '3',
         action: (course) => getCourseId(course),
         content: (
            <StyledIcon>
               <TrashIcon />
               <p>Удалить</p>
            </StyledIcon>
         ),
      },
   ]

   const getCourseId = (course) => {
      setIsConfirmModalOpen(true)
      dispatch(getSingleCourse(course.id))
      setCourseId(course.id)
   }

   const appointATeacher = (course) => {
      setIsModalOpen(true)
      dispatch(getSingleCourse(course.id))
   }

   const editATeacher = (course) => {
      setIsEditModalOpen(true)
      dispatch(getSingleCourse(course.id))
      setSearchParamsForEditStudents({
         ['add_course']: true,
         courseId: course.id,
      })
   }

   const closeModalHandler = () => {
      setIsModalOpen(false)
      setIsConfirmModalOpen(false)
      setIsEditModalOpen(false)
   }

   const deleteCourseHandler = () => {
      dispatch(deleteCourse(courseId))
      closeModalHandler()
   }

   return (
      <div>
         <AddNewCourse />
         <Container>
            {courses.map((card) => (
               <StyledCard key={card.id}>
                  <Card
                     options={options}
                     image={card.image}
                     title={card.courseName}
                     description={card.description}
                     date={card.dateOfStart}
                     course={card}
                  />
               </StyledCard>
            ))}
         </Container>
         <AppointTeacher
            isModalOpen={isModalOpen}
            closeHandler={closeModalHandler}
            // teacher={appointTeacher}
         />
         {/* <EditCourse
            isEditModalOpen={isEditModalOpen}
            closeEditModalHandler={closeModalHandler}
            // course={editCourse}
         /> */}
         <ConfirmModal
            isConfirmModalOpen={isConfirmModalOpen}
            closeConfirmModal={closeModalHandler}
            title="Вы уверены, что хотите удалить группу ... ?"
         >
            <StyledButton>
               <Button
                  background="none"
                  border="1px solid #3772FF"
                  color="#3772FF"
                  onClick={closeModalHandler}
               >
                  Отмена
               </Button>
               <Button
                  background="#C91E1E"
                  bgHover="#B62727"
                  bgActive="#E13A3A"
                  onClick={deleteCourseHandler}
               >
                  Удалить
               </Button>
            </StyledButton>
         </ConfirmModal>
      </div>
   )
}

const StyledCard = styled.div`
   width: 270px;
`
const Container = styled.div`
   display: flex;
   cursor: pointer;
   flex-wrap: wrap;
   gap: 15px;
`
const StyledIcon = styled.div`
   display: flex;
   & p {
      margin-left: 8px;
   }
`
const StyledButton = styled.div`
   width: 241px;
   display: flex;
   justify-content: space-between;
`
