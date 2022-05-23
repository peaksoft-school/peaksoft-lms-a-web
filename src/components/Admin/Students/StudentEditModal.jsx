import styled from '@emotion/styled'
import React, { useEffect, useState } from 'react'
import { useInput } from '../../../hooks/usuInput/useInput'
import { STUDY_FORMAT_OPTION } from '../../../utils/constants/general'
import { Button } from '../../UI/button/Button'
import { Input } from '../../UI/input/Input'
import { MaskedInput } from '../../UI/input/MaskedInput'
import { BasicModal } from '../../UI/modal/BasicModal'
import { Select } from '../../UI/select/Select'

export const StudentsEditModal = ({
   showModal,
   onClose,
   onEdit,
   student,
   groups,
}) => {
   const { email, phoneNumber, studyFormat, fullName } = student
   const [firstName, lastName] = fullName.split(' ')
   const { value, onChange, onClear } = useInput({
      firstName: firstName || '',
      lastName: lastName || '',
      phoneNumber: phoneNumber || '',
      email: email || '',
      password: '',
      groupName: '',
      studyFormat: studyFormat || '',
   })
   const [disableButton, setDisableButton] = useState(false)
   const [selectedOption, setSelectedOption] = useState('')

   const editStudents = () => {
      onEdit(value, selectedOption)
      onClear()
   }

   const seletedOptionHandler = (option) => {
      setSelectedOption(option.id)
   }
   const selectedOptionHandler = () => {}

   useEffect(() => {
      if (
         value.firstName.length > 0 &&
         value.lastName.length > 0 &&
         value.phoneNumber.length > 0 &&
         value.email.length > 0 &&
         value.groupName.length > 0 &&
         value.studyFormat.length > 0
      ) {
         setDisableButton(true)
      } else {
         setDisableButton(false)
      }
   }, [value])

   return (
      <BasicModal
         isModalOpen={Boolean(showModal)}
         title="Редактировать студента"
         onClose={onClose}
      >
         <StyledChildrenOfModal>
            <Input
               placeholder="Имя"
               name="firstName"
               value={value.firstName}
               onChange={onChange}
            />
            <Input
               placeholder="Фамилия"
               name="lastName"
               value={value.lastName}
               onChange={onChange}
            />
            <MaskedInput
               name="phoneNumber"
               value={value.phoneNumber}
               onChange={onChange}
            />
            <Input
               placeholder="Email"
               name="email"
               type="email"
               value={value.email}
               onChange={onChange}
            />
            <Input
               placeholder="Пароль"
               name="password"
               value={value.password}
               onChange={onChange}
            />
            <Select
               options={groups}
               placeholder="Группа"
               name="groupName"
               selectedOption={seletedOptionHandler}
               value={value.groupName}
               onChange={onChange}
            />
            <Select
               options={STUDY_FORMAT_OPTION}
               placeholder="Формат обучения"
               name="studyFormat"
               value={value.studyFormat}
               selectedOption={selectedOptionHandler}
               onChange={onChange}
            />
            <StyledModalButtonContainer>
               <Button
                  background="none"
                  border="1px solid #3772FF"
                  color="#3772FF"
                  onClick={onClose}
               >
                  Отмена
               </Button>
               <Button
                  background="#3772FF"
                  bgHover="#1D60FF"
                  bgActive="#6190FF"
                  onClick={editStudents}
                  disabled={!disableButton}
               >
                  Сохранять
               </Button>
            </StyledModalButtonContainer>
         </StyledChildrenOfModal>
      </BasicModal>
   )
}

const StyledChildrenOfModal = styled.div`
   width: 100%;
   height: 432px;
   display: flex;
   flex-direction: column;
   justify-content: space-between;
`
const StyledModalButtonContainer = styled.div`
   width: 100%;
   height: 40px;
   display: flex;
   justify-content: end;
   button {
      margin-left: 10px;
   }
`
