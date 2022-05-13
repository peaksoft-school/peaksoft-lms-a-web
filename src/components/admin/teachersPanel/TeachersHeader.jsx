import styled from '@emotion/styled'
import React, { useEffect, useState } from 'react'
import { useInput } from '../../../hooks/useInput/useInput'
import { Button } from '../../UI/button/Button'
import { Input } from '../../UI/input/Input'
import { MaskedInput } from '../../UI/input/MaskedInput'
import { BasicModal } from '../../UI/modal/BasicModal'

export const TeachersHeader = ({
   setIsOpenModal,
   isModalOpen,
   handleClose,
   setStudentsData,
}) => {
   const [registerIsValid, setRegisterIsValid] = useState(false)

   const { value, onChange, onClear } = useInput({
      firstName: '',
      lastName: '',
      number: '',
      email: '',
      password: '',
      specialization: '',
      id: Math.random().toString(),
   })
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

const StyledButton = styled(Button)`
   display: flex;
   justify-content: end;
   width: 100%;
   padding: 0;
   margin-top: 10px;
`
const StyledInput = styled(Input)`
   margin: 5px;
`
const StyledMaskedInput = styled(MaskedInput)`
   margin: 5px;
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
