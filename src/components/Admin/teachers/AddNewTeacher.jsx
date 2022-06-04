import styled from '@emotion/styled'
import React, { useEffect, useState } from 'react'
import { Button } from '../../UI/button/Button'
import { Input } from '../../UI/input/Input'
import { MaskedInput } from '../../UI/input/MaskedInput'
import { BasicModal } from '../../UI/modal/BasicModal'
import { ReactComponent as AddIcon } from '../../../assets/icons/AddIcon.svg'
import { useInput } from '../../../hooks/usuInput/useInput'

export const AddNewTeacher = ({ onAdd, showModal, onClose, addHandler }) => {
   const { value, onChange, onClear } = useInput({
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      password: '',
      specialization: '',
   })

   const [registerIsValid, setRegisterIsValid] = useState(false)

   const addTeacher = () => {
      onAdd(value, onClear)
   }

   useEffect(() => {
      setRegisterIsValid(
         value.firstName.length > 0 &&
            value.lastName.length > 0 &&
            value.phoneNumber.length > 0 &&
            value.email.length > 0 &&
            value.password.length > 0 &&
            value.specialization.length > 0
      )
   }, [value])

   return (
      <>
         <StyledButton>
            <Button
               background="#3772FF"
               bgHover="#1D60FF"
               bgActive="#6190FF"
               onClick={addHandler}
            >
               <StyledAddIcon /> Добавить учителя
            </Button>
         </StyledButton>
         <BasicModal
            isModalOpen={Boolean(showModal)}
            onClose={onClose}
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
               name="phoneNumber"
               value={value.phoneNumber}
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
                     onClick={onClose}
                  >
                     Отмена
                  </Button>
                  <Button
                     background="#3772FF"
                     bgHover="#1D60FF"
                     bgActive="#6190FF"
                     onClick={addTeacher}
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

const StyledButton = styled.div`
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
const StyledAddIcon = styled(AddIcon)`
   margin-right: 4px;
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
`
