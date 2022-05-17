import React, { useState } from 'react'
import styled from '@emotion/styled'
import { useDispatch, useSelector } from 'react-redux'
import { Card } from '../../UI/card/Card'
import { ReactComponent as PinIcon } from '../../../assets/icons/pinnedIcon.svg'
import { ReactComponent as EditIcon } from '../../../assets/icons/edit.svg'
import { ReactComponent as TrashIcon } from '../../../assets/icons/trashIcon.svg'
import { Button } from '../../UI/button/Button'
import ConfirmModal from '../../UI/modal/ConfirmModal'
import { AppointTeacher } from './AppointTeacher'
import { EditCourse } from './EditCourse'
import { AddNewCourse } from './AddNewCourse'
import { deleteCourse, getAllCourses } from '../../../store/coursesSlice'

export const CourseCards = () => {
   const dispatch = useDispatch()
   const courses = useSelector((state) => state.courses.course)
   const [isModalOpen, setIsModalOpen] = useState(false)
   const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)
   const [isEditModalOpen, setIsEditModalOpen] = useState(false)
   const [cards, setCard] = useState(null)
   const [cardss, setCasrd] = useState({})
   const [cardsss, setCasrds] = useState({})

   const options = [
      {
         id: '1',
         action: (course) => opens(course),
         content: (
            <StyledIcon>
               <PinIcon />
               <p>Назначить учителя</p>
            </StyledIcon>
         ),
      },
      {
         id: '2',
         action: (course) => edit(course),
         content: (
            <StyledIcon>
               <EditIcon />
               <p>Редактировать</p>
            </StyledIcon>
         ),
      },
      {
         id: '3',
         action: (course) => open(course),
         content: (
            <StyledIcon>
               <TrashIcon />
               <p>Удалить</p>
            </StyledIcon>
         ),
      },
   ]
   const open = (course) => {
      setIsConfirmModalOpen(true)
      setCard(course)
   }
   const opens = (course) => {
      setIsModalOpen(true)
      setCasrd(course)
   }
   const edit = (course) => {
      setIsEditModalOpen(true)
      setCasrds(course)
   }

   const closeModalHandler = () => {
      setIsModalOpen(false)
      setIsConfirmModalOpen(false)
      setIsEditModalOpen(false)
   }
   const deletehandler = () => {
      dispatch(deleteCourse(cards.id))
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
         />
         <EditCourse
            isEditModalOpen={isEditModalOpen}
            closeEditModalHandler={closeModalHandler}
            course={cardsss}
         />
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
                  onClick={deletehandler}
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
