import React, { useState } from 'react'
import styled from '@emotion/styled'
import { useSelector } from 'react-redux'
import { Card } from '../../UI/card/Card'
import { ReactComponent as PinIcon } from '../../../assets/icons/pinnedIcon.svg'
import { ReactComponent as EditIcon } from '../../../assets/icons/edit.svg'
import { ReactComponent as TrashIcon } from '../../../assets/icons/trashIcon.svg'
import { Button } from '../../UI/button/Button'
import ConfirmModal from '../../UI/modal/ConfirmModal'
import { AppointTeacher } from './AppointTeacher'
import { EditCourse } from './EditCourse'

export const CourseCards = () => {
   const courses = useSelector((state) => state.courses.course)
   const [isModalOpen, setIsModalOpen] = useState(false)
   const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)
   const [isEditModalOpen, setIsEditModalOpen] = useState(false)

   const options = [
      {
         id: '1',
         action: () => setIsModalOpen(true),
         content: (
            <StyledIcon>
               <PinIcon />
               <p>Назначить учителя</p>
            </StyledIcon>
         ),
      },
      {
         id: '2',
         action: () => setIsEditModalOpen(true),
         content: (
            <StyledIcon>
               <EditIcon />
               <p>Редактировать</p>
            </StyledIcon>
         ),
      },
      {
         id: '3',
         action: () => setIsConfirmModalOpen(true),
         content: (
            <StyledIcon>
               <TrashIcon />
               <p>Удалить</p>
            </StyledIcon>
         ),
      },
   ]

   const closeModalHandler = () => {
      setIsModalOpen(false)
   }
   const closeConfirmModalHandler = () => {
      setIsConfirmModalOpen(false)
   }
   const closeEditModalHandler = () => {
      setIsEditModalOpen(false)
   }

   return (
      <div>
         <Container>
            {courses.map((card) => (
               <StyledCard key={card.id}>
                  <Card
                     options={options}
                     image={card.image}
                     title={card.course_name}
                     description={card.description}
                     date={card.date_of_start}
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
            closeEditModalHandler={closeEditModalHandler}
         />
         <ConfirmModal
            isConfirmModalOpen={isConfirmModalOpen}
            closeConfirmModal={closeConfirmModalHandler}
            title="Вы уверены, что хотите удалить группу ... ?"
         >
            <StyledButton>
               <Button
                  background="none"
                  border="1px solid #3772FF"
                  color="#3772FF"
                  onClick={() => closeConfirmModalHandler()}
               >
                  Отмена
               </Button>
               <Button
                  background="#C91E1E"
                  bgHover="#B62727"
                  bgActive="#E13A3A"
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
   gap: 40px;
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
