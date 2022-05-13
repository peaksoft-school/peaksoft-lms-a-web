/* eslint-disable react/no-unstable-nested-components */
import React, { useState } from 'react'
import styled from '@emotion/styled'
import { ReactComponent as EyeIcon } from '../../../assets/icons/eyeIcon.svg'
import { ReactComponent as EditIcon } from '../../../assets/icons/editIcon.svg'
import { ReactComponent as RemoveIcon } from '../../../assets/icons/removeIcon.svg'
import { Button } from '../../UI/button/Button'
import ConfirmModal from '../../UI/modal/ConfirmModal'
import { AppTable } from '../../UI/table/AppTable'
import { TeachersHeader } from './TeachersHeader'

export const TeachersPanel = () => {
   const [isModalOpen, setIsOpenModal] = useState(false)
   const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)
   const [teachersData, setTeachersData] = useState(DATA)

   const COLUMNS = [
      {
         title: 'ID',
         accessKey: 'id',
      },
      {
         title: 'Имя Фамилия',
         accessKey: 'name',
      },
      {
         title: 'Специализация',
         accessKey: 'specialization',
      },
      {
         title: 'Номер телефона',
         accessKey: 'mobile_phone',
      },
      {
         title: 'E-mail',
         accessKey: 'email',
      },
      {
         title: 'Пароль',
         accessKey: 'password',
      },
      {
         title: 'Действия',
         accessKey: '',
         action: () => (
            <StyledActions>
               <EyeIcon />
               <EditIcon />
               <RemoveIcon onClick={() => setIsConfirmModalOpen(true)} />
            </StyledActions>
         ),
      },
   ]
   const handleClose = () => {
      setIsOpenModal(false)
      setIsConfirmModalOpen(false)
   }

   return (
      <>
         <TeachersHeader
            setIsOpenModal={setIsOpenModal}
            isModalOpen={isModalOpen}
            handleClose={handleClose}
            setStudentsData={setTeachersData}
         />
         <ConfirmModal
            title="Вы уверены, что хотите удалить учителя...?"
            isConfirmModalOpen={isConfirmModalOpen}
            onModalClose={() => setIsConfirmModalOpen(false)}
            closeConfirmModal={handleClose}
         >
            <Button
               background="#3772FF"
               bgHover="#1D60FF"
               bgActive="#6190FF"
               onClick={() => setIsConfirmModalOpen(false)}
            >
               Отмена
            </Button>
            <Button background="#C91E1E" bgHover="#B62727" bgActive="#E13A3A">
               Удалить
            </Button>
         </ConfirmModal>
         <AppTable columns={COLUMNS} data={teachersData} />
      </>
   )
}

let DATA = [
   {
      id: 1,
      name: 'Baya Asanova',
      specialization: 'Front End',
      mobile_phone: '0700777999',
      email: 'baya@gmail.com',
      password: '123qwe',
   },
]

const StyledActions = styled.span`
   cursor: pointer;
   display: flex;
   border: none;
   align-items: center;
   justify-content: space-between;
   margin: 20px;
`
