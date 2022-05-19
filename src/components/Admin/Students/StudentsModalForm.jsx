import styled from '@emotion/styled'
import React, { useEffect, useState } from 'react'
import { useInput } from '../../../hooks/usuInput/useInput'
import { STUDY_FORMAT_OPTION } from '../../../utils/constants/general'
import { Button } from '../../UI/button/Button'
import { Input } from '../../UI/input/Input'
import { MaskedInput } from '../../UI/input/MaskedInput'
import { BasicModal } from '../../UI/modal/BasicModal'
import { Select } from '../../UI/select/Select'

export const StudentsModalForm = ({
   showAddStudentsModal,
   showAddStudentsModalHandler,
   addStudentsHandler,
   groupOptions,
}) => {
   const { value, onChange, onClear } = useInput({
      firstName: '',
      lastName: '',
      phoneNumber: '',
      email: '',
      password: '',
      group: '',
      studyFormat: '',
   })

   const [disableButton, setDisableButton] = useState(false)
   const [selectedOption, setSelectedOption] = useState('')

   const addStudents = () => {
      addStudentsHandler(value, selectedOption)
      onClear()
   }

   const seletedOptionHandler = (option) => {
      setSelectedOption(option.id)
   }
   const seletedOption = () => {}
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
         isModalOpen={Boolean(showAddStudentsModal)}
         title="Добавить студента"
         onClose={showAddStudentsModalHandler}
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
               options={groupOptions[0]}
               placeholder="Группа"
               name="group"
               value={value.group}
               selectedOption={seletedOptionHandler}
               onChange={onChange}
            />
            <Select
               options={STUDY_FORMAT_OPTION}
               placeholder="Формат обучения"
               name="studyFormat"
               value={value.studyFormat}
               selectedOption={seletedOption}
               onChange={onChange}
            />
            <StyledModalButtonContainer>
               <Button
                  background="none"
                  border="1px solid #3772FF"
                  color="#3772FF"
                  onClick={showAddStudentsModalHandler}
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
                  Добавить
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
