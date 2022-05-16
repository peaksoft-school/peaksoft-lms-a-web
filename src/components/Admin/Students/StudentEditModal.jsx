import styled from '@emotion/styled'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useInput } from '../../../hooks/usuInput/useInput'
import { Button } from '../../UI/button/Button'
import { Input } from '../../UI/input/Input'
import { MaskedInput } from '../../UI/input/MaskedInput'
import { BasicModal } from '../../UI/modal/BasicModal'
import { Select } from '../../UI/select/Select'

const options = [
   {
      id: 'ONLINE',
      title: 'ONLINE',
   },
   {
      id: 'OFFLINE',
      title: 'OFFLINE',
   },
]
const groupOptions = [
   {
      id: 'ONLINE',
      title: 'JS-4',
   },
   {
      id: 'OFFLINE',
      title: 'JAVA-4',
   },
]

export const StudentsEditModal = ({
   showEditStudentsModal,
   showEditStudentsModalHandler,
   editStudentsHandler,
}) => {
   const { email, phoneNumber, studyFormat, groupName, fullName } = useSelector(
      (state) => state.students.singleStudent
   )
   const { value, onChange, onClear } = useInput({
      firstName: '',
      lastName: '',
      phoneNumber: phoneNumber || '',
      email: email || '',
      password: '',
      group: groupName || '',
      studyFormat: studyFormat || '',
   })

   const [disableButton, setDisableButton] = useState(false)

   const addStudents = () => {
      editStudentsHandler(value)
      onClear()
   }

   useEffect(() => {
      if (
         value.firstName.length > 0 &&
         value.lastName.length > 0 &&
         value.phoneNumber.length > 0 &&
         value.email.length > 0 &&
         value.password.length > 0 &&
         value.group.length > 0 &&
         value.studyFormat.length > 0
      ) {
         setDisableButton(true)
      } else {
         setDisableButton(false)
      }
   }, [value])

   return (
      <BasicModal
         isModalOpen={showEditStudentsModal}
         title="Добавить студента"
         onClose={showEditStudentsModalHandler}
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
               options={groupOptions}
               placeholder="Группа"
               name="group"
               value={value.group}
               onChange={onChange}
            />
            <Select
               options={options}
               placeholder="Формат обучения"
               name="studyFormat"
               value={value.studyFormat}
               onChange={onChange}
            />
            <StyledModalButtonContainer>
               <Button
                  background="none"
                  border="1px solid #3772FF"
                  color="#3772FF"
                  onClick={showEditStudentsModalHandler}
               >
                  Отмена
               </Button>
               <Button
                  background="#3772FF"
                  bgHover="#1D60FF"
                  bgActive="#6190FF"
                  onClick={addStudents}
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
