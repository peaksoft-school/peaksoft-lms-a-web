/* eslint-disable react/no-unstable-nested-components */
import React, { useState } from 'react'
import styled from '@emotion/styled'
import { ReactComponent as EyeIcon } from '../../../assets/icons/eyeIcon.svg'
import { ReactComponent as EditIcon } from '../../../assets/icons/editIcon.svg'
import { ReactComponent as RemoveIcon } from '../../../assets/icons/removeIcon.svg'
import { BasicModal } from '../../UI/BasicModal'
import { Input } from '../../UI/Input'
import { Button } from '../../UI/Button'
import { MaskedInput } from '../../UI/MaskedInput'
import { useInput } from '../../../hooks/useInput/useInput'
import { AppTable } from '../../UI/AppTable'
import { ConfirmModal } from '../../UI/ConfirmModal'

export const TeachersPanel = () => {
   const [isModalOpen, setIsOpenModal] = useState(false)
   const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)
   const { value, onChange } = useInput({
      firstName: '',
      lastName: '',
      number: '',
      email: '',
      password: '',
      specialization: '',
   })
   const [studentsData, setStudentsData] = useState(DATA)
   const COLUMNS = [
      {
         title: 'ID',
         accessKey: 'id',
      },
      {
         title: 'Имя фамилия',
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
   return (
      <>
         <Button
            background="#3772FF"
            bgHover="#1D60FF"
            bgActive="#6190FF"
            onClick={() => setIsOpenModal(true)}
         >
            + Добавить учителя
         </Button>
         <ConfirmModal
            title="Вы уверены, что хотите удалить эту группу?"
            isConfirmModalOpen={isConfirmModalOpen}
            onModalClose={() => setIsConfirmModalOpen(false)}
         >
            <p>Вы уверены, что хотите удалить группу...?</p>
            <Button background="#3772FF" bgHover="#1D60FF" bgActive="#6190FF">
               Отмена
            </Button>
            <Button>Удалить</Button>
         </ConfirmModal>
         <AppTable columns={COLUMNS} data={studentsData} />
         {isModalOpen && (
            <BasicModal isModalOpen={isModalOpen} title="Добавить учителя">
               <StyledInput
                  placeholder="Имя"
                  type="text"
                  name="firstName"
                  value={value.firstName}
                  onChange={onChange}
               />
               <StyledInput
                  placeholder="Фамилия"
                  type="text"
                  name="lastName"
                  value={value.lastName}
                  onChange={onChange}
               />
               <StyledMaskedInput
                  name="number"
                  value={value.number}
                  onChange={onChange}
               />
               <StyledInput
                  placeholder="Email"
                  type="email"
                  name="email"
                  value={value.email}
                  onChange={onChange}
               />
               <StyledInput
                  placeholder="Пароль"
                  type="password"
                  name="password"
                  value={value.password}
                  onChange={onChange}
               />
               <StyledInput
                  placeholder="Специализация"
                  type="text"
                  name="specialization"
                  value={value.specialization}
                  onChange={onChange}
               />
               <StyledButton>
                  <div>
                     <Button
                        background="none"
                        bgHover="#1D60FF1A"
                        bgActive="#6190FF4D"
                        border="1px solid #1D60FF"
                        color="#3772FF"
                        onClick={() => setIsOpenModal(false)}
                     >
                        Отмена
                     </Button>
                     <Button
                        background="#3772FF"
                        bgHover="#1D60FF"
                        bgActive="#6190FF"
                     >
                        Добавить
                     </Button>
                  </div>
               </StyledButton>
            </BasicModal>
         )}
      </>
   )
}

const StyledInput = styled(Input)`
   margin: 5px;
`
const StyledMaskedInput = styled(MaskedInput)`
   margin: 5px;
`
const StyledButton = styled.div`
   display: flex;
   justify-content: end;
   width: 100%;
   margin-top: 16px;
   div {
      width: 240px;
      display: flex;
      justify-content: space-around;
   }
`
let DATA = [
   {
      id: 1,
      name: 'Baya Asanova',
      specialization: 'Front End',
      study_format: 'Онлайн',
      mobile_phone: '0700777999',
      email: 'baya@gmail.com',
      password: '123qwe',
   },
   {
      id: 2,
      name: 'Baya Asanova',
      specialization: 'Front End',
      study_format: 'Онлайн',
      mobile_phone: '0700777999',
      email: 'baya@gmail.com',
      password: '123qwe',
   },
   {
      id: 3,
      name: 'Baya Asanova',
      specialization: 'Front End',
      study_format: 'Онлайн',
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
