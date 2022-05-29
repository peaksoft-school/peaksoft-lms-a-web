import styled from '@emotion/styled'
import { useEffect, useState } from 'react'
import { useInput } from '../../../hooks/useInput/useInput'
import { Button } from '../../UI/button/Button'
import { Input } from '../../UI/input/Input'
import { MaskedInput } from '../../UI/input/MaskedInput'
import { BasicModal } from '../../UI/modal/BasicModal'

export const EditTeacher = ({ showModal, onClose, onEdit, singleTeacher }) => {
   const { fullName, phoneNumber, email, specialization } = singleTeacher

   const [firstName, lastName] = fullName.split(' ')
   const { value, onChange, onClear } = useInput({
      firstName: firstName || '',
      lastName: lastName || '',
      phoneNumber: phoneNumber || '',
      email: email || '',
      password: '',
      specialization: specialization || '',
   })

   const [registerIsValid, setRegisterIsValid] = useState(false)

   const editTeacher = () => {
      onEdit(value, onClear)
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
      <BasicModal
         isModalOpen={Boolean(showModal)}
         onClose={onClose}
         title="Редактировать учителя"
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
                  onClick={onClose}
               >
                  Отмена
               </Button>
               <Button
                  background="#3772FF"
                  bgHover="#1D60FF"
                  bgActive="#6190FF"
                  onClick={editTeacher}
                  disabled={!registerIsValid}
               >
                  Сохранить
               </Button>
            </div>
         </StyledModalButton>
      </BasicModal>
   )
}

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
      width: 250px;
      display: flex;
      justify-content: space-around;
   }
`
