import styled from '@emotion/styled'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ReactComponent as EditIcon } from '../../../assets/icons/editIcon.svg'
import { ReactComponent as RemoveIcon } from '../../../assets/icons/removeIcon.svg'
import { useInput } from '../../../hooks/usuInput/useInput'
import { addStudents, getStudents } from '../../../store/studentsSlice'
import { Button } from '../../UI/button/Button'
import { Input } from '../../UI/input/Input'
import { MaskedInput } from '../../UI/input/MaskedInput'
import { BasicModal } from '../../UI/modal/BasicModal'
import { Select } from '../../UI/select/Select'
import { AppTable } from '../../UI/table/AppTable'
import { AddStudents } from './AddStudents'

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
const COLUMNS = [
   {
      title: 'ID',
      accessKey: 'id',
   },
   {
      title: 'Имя Фамилия',
      accessKey: 'lastName',
   },
   {
      title: 'Группа',
      accessKey: 'studyFormat',
   },
   {
      title: 'Формат обучения',
      accessKey: 'studyFormat',
   },
   {
      title: 'Номер телефона',
      accessKey: 'mobilePhone',
   },
   {
      title: 'E-mail',
      accessKey: 'email',
   },
   {
      title: 'Действия',
      accessKey: 'actions',
      action: () => (
         <StyledActions>
            <EditIcon />
            <RemoveIcon />
         </StyledActions>
      ),
   },
]

export const Students = () => {
   const dispatch = useDispatch()
   const { studentData } = useSelector((state) => state.students)

   const { value, onChange, onClear } = useInput({
      firstName: '',
      lastName: '',
      mobilePhone: '',
      email: '',
      password: '',
      group: '',
      studyFormat: '',
   })
   const [showAddStudentsModal, setshowAddStudentsModal] = useState(false)
   // const [disabledButtonWhen]

   const showAddStudentsModalHandler = () => {
      setshowAddStudentsModal((prevState) => !prevState)
   }

   const addStudentsHandler = () => {
      onClear()
      showAddStudentsModalHandler()
      dispatch(addStudents(value))
      dispatch(getStudents())
   }
   useEffect(() => {
      dispatch(getStudents())
   }, [])
   return (
      <div>
         <StyledButtonsContainer>
            <StyledFormatOfEdu>
               <Select
                  options={options}
                  placeholder="Формат обучения"
                  type="second"
               />
            </StyledFormatOfEdu>
            <AddStudents onOpenStudentsModal={showAddStudentsModalHandler} />
         </StyledButtonsContainer>
         <BasicModal
            isModalOpen={showAddStudentsModal}
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
                  name="mobilePhone"
                  value={value.mobilePhone}
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
                     onClick={showAddStudentsModalHandler}
                  >
                     Отмена
                  </Button>
                  <Button
                     background="#3772FF"
                     bgHover="#1D60FF"
                     bgActive="#6190FF"
                     onClick={addStudentsHandler}
                  >
                     Добавить
                  </Button>
               </StyledModalButtonContainer>
            </StyledChildrenOfModal>
         </BasicModal>
         <AppTable data={studentData} columns={COLUMNS} />
      </div>
   )
}
const StyledButtonsContainer = styled.div`
   width: 100%;
   height: 88px;
   display: flex;
   justify-content: space-between;
   align-items: center;
`
const StyledFormatOfEdu = styled.div`
   width: 202px;
   display: flex;
   justify-content: start;
`
const StyledActions = styled.span`
   cursor: pointer;
   display: flex;
   border: none;
   align-items: center;
   justify-content: space-around;
   margin: 20px;
`
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
