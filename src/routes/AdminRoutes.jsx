import React, { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import styled from '@emotion/styled'
import { GroupsPanel } from '../components/admin/GroupsPanel'
import { ROUTES } from '../utils/constants/general'
import { ReactComponent as PinIcon } from '../assets/icons/pinnedIcon.svg'
import { ReactComponent as EditIcon } from '../assets/icons/edit.svg'
import { ReactComponent as DeleteIcon } from '../assets/icons/trashIcon.svg'

export const AdminRoutes = () => {
   const [openDeleteConfirmModal, setOpenDeleteConfirmModal] = useState(false)

   const deletingModalHandler = () => {
      setOpenDeleteConfirmModal(true)
   }
   const options = [
      {
         id: 'wqqw',
         action: () => alert('hello'),
         content: (
            <Container>
               <PinIcon />
               <p>Назначить учителя</p>
            </Container>
         ),
      },
      {
         id: 'wqqdfcfw',
         action: () => alert('hello'),
         content: (
            <Container>
               <EditIcon />
               <p>Редактировать</p>
            </Container>
         ),
      },
      {
         id: 'wqqdfvfvw',
         action: () => deletingModalHandler(),
         content: (
            <Container>
               <DeleteIcon />
               <p>Удалить</p>
            </Container>
         ),
      },
   ]
   return (
      <div>
         <Routes>
            <Route path="/" element={<Navigate to={ROUTES.GROUPS} />} />
            <Route
               path={ROUTES.GROUPS}
               element={
                  <GroupsPanel
                     options={options}
                     openDeleteConfirmModal={openDeleteConfirmModal}
                  />
               }
            />
            <Route path={ROUTES.COURSES} element={<div>Course</div>} />
            <Route path={ROUTES.TEACHERS} element={<div>TeacherPage</div>} />
            <Route path={ROUTES.STUDENTS} element={<div>Students</div>} />
         </Routes>
      </div>
   )
}
const Container = styled.div`
   width: 180px;
   display: flex;
   align-items: center;

   &:hover {
      color: blue;
   }
   p {
      margin-left: 20px;
   }
`
