import styled from '@emotion/styled'
import { useState } from 'react'
import { ReactComponent as EditIcon } from '../../../assets/icons/editIcon.svg'
import { ReactComponent as RemoveIcon } from '../../../assets/icons/removeIcon.svg'
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
      title: 'Online',
   },
   {
      id: 'OFFLINE',
      title: 'Offline',
   },
]
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
      title: 'Группа',
      accessKey: 'group',
   },
   {
      title: 'Формат обучения',
      accessKey: 'formatOfEdu',
   },
   {
      title: 'Номер телефона',
      accessKey: 'phoneNumber',
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
const DATA = [
   {
      id: 1,
      name: 'Baya Asanova',
      group: 'JS-4',
      formatOfEdu: 'Online',
      phoneNumber: '0700777999',
      email: 'baya@gmail.com',
      password: '12345',
   },
   {
      id: 2,
      name: 'Baya Asanova',
      group: 'JS-4',
      formatOfEdu: 'Online',
      phoneNumber: '0700777999',
      email: 'baya@gmail.com',
      password: '12345',
   },
   {
      id: 3,
      name: 'Baya Asanova',
      group: 'JS-4',
      formatOfEdu: 'Online',
      phoneNumber: '0700777999',
      email: 'baya@gmail.com',
   },
   {
      id: 4,
      name: 'Baya Asanova',
      group: 'JS-4',
      formatOfEdu: 'Online',
      phoneNumber: '0700777999',
      email: 'baya@gmail.com',
   },
   {
      id: 5,
      name: 'Baya Asanova',
      group: 'JS-4',
      formatOfEdu: 'Online',
      phoneNumber: '0700777999',
      email: 'baya@gmail.com',
   },
   {
      id: 6,
      name: 'Baya Asanova',
      group: 'JS-4',
      formatOfEdu: 'Online',
      phoneNumber: '0700777999',
      email: 'baya@gmail.com',
   },
   {
      id: 7,
      name: 'Baya Asanova',
      group: 'JS-4',
      formatOfEdu: 'Online',
      phoneNumber: '0700777999',
      email: 'baya@gmail.com',
   },
   {
      id: 8,
      name: 'Baya Asanova',
      group: 'JS-4',
      formatOfEdu: 'Online',
      phoneNumber: '0700777999',
      email: 'baya@gmail.com',
   },
   {
      id: 9,
      name: 'Baya Asanova',
      group: 'JS-4',
      formatOfEdu: 'Online',
      phoneNumber: '0700777999',
      email: 'baya@gmail.com',
   },
   {
      id: 10,
      name: 'Baya Asanova',
      group: 'JS-4',
      formatOfEdu: 'Online',
      phoneNumber: '0700777999',
      email: 'baya@gmail.com',
   },
]
export const Students = () => {
   const [showAddStudentsModal, setshowAddStudentsModal] = useState(false)
   const showAddStudentsModalHandler = () => {
      setshowAddStudentsModal((prevState) => !prevState)
   }
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
               <Input placeholder="Имя" />
               <Input placeholder="Фамилия" />
               <MaskedInput />
               <Input placeholder="Email" />
               <Input placeholder="Пароль" />
               <Select options={options} placeholder="Группа" />
               <Select options={options} placeholder="Формат обучения" />
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
                  >
                     Добавить
                  </Button>
               </StyledModalButtonContainer>
            </StyledChildrenOfModal>
         </BasicModal>
         <AppTable data={DATA} columns={COLUMNS} />
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
