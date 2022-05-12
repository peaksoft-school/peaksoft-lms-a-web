/* eslint-disable react/no-unstable-nested-components */
import React, { useEffect, useState } from 'react'
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
   const [registerIsValid, setRegisterIsValid] = useState(false)
   const [studentsData, setStudentsData] = useState(DATA)

   const { value, onChange, onClear } = useInput({
      firstName: '',
      lastName: '',
      number: '',
      email: '',
      password: '',
      specialization: '',
      id: Math.random().toString(),
   })
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
               <RemoveIcon onClick={() => setIsConfirmModalOpen(false)} />
            </StyledActions>
         ),
      },
   ]
   const handleClose = () => {
      setIsOpenModal(true)
   }
   useEffect(() => {
      setRegisterIsValid(
         value.firstName.trim().length > 0 &&
            value.lastName.trim().length > 0 &&
            value.number.trim().length > 0 &&
            value.email.trim().length > 0 &&
            value.password.trim().length > 0 &&
            value.specialization.trim().length > 0
      )
   }, [value])
   const onSubmit = (e) => {
      e.preventDefault()
      setStudentsData((prevData) => [
         ...prevData,
         {
            id: value.id,
            name: `${value.firstName} ${value.lastName}`,
            specialization: value.specialization,
            mobile_phone: value.number,
            email: value.email,
            password: value.password,
         },
      ])
      onClear()
      setIsOpenModal(false)
   }
   return (
      <>
         <StyledButton>
            <Button
               background="#3772FF"
               bgHover="#1D60FF"
               bgActive="#6190FF"
               onClick={() => setIsOpenModal(true)}
            >
               + Добавить учителя
            </Button>
         </StyledButton>
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
         <BasicModal
            isModalOpen={isModalOpen}
            onClose={handleClose}
            title="Добавить учителя"
         >
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
            <StyledModalButton>
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
                     onClick={onSubmit}
                     disabled={!registerIsValid}
                  >
                     Добавить
                  </Button>
               </div>
            </StyledModalButton>
         </BasicModal>
      </>
   )
}

const StyledInput = styled(Input)`
   margin: 5px;
`
const StyledMaskedInput = styled(MaskedInput)`
   margin: 5px;
`
const StyledButton = styled(Button)`
   display: flex;
   justify-content: end;
   width: 100%;
   padding: 0;
   margin-top: 10px;
`
const StyledModalButton = styled.div`
   display: flex;
   justify-content: end;
   width: 100%;
   margin-top: 16px;
   div {
      width: 245px;
      display: flex;
      justify-content: space-around;
   }
   :disabled {
      background-color: red;
   }
   :enabled {
      background-color: violet;
   }
`
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
