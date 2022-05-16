/* eslint-disable react/no-unstable-nested-components */
import styled from '@emotion/styled'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ReactComponent as EditIcon } from '../../../assets/icons/editIcon.svg'
import { ReactComponent as RemoveIcon } from '../../../assets/icons/removeIcon.svg'
import {
   addStudents,
   deleteStudents,
   editStudents,
   getSingleStudent,
   getStudents,
} from '../../../store/studentsSlice'
import { Select } from '../../UI/select/Select'
import { AppTable } from '../../UI/table/AppTable'
import { AddStudents } from './AddStudents'
import { StudentsEditModal } from './StudentEditModal'
import { StudentsModalForm } from './StudentsModalForm'

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

export const Students = () => {
   const dispatch = useDispatch()
   const { studentData, singleStudent } = useSelector((state) => state.students)

   const [showAddStudentsModal, setshowAddStudentsModal] = useState(false)
   const [showEditStudentsModal, setshowEditStudentsModal] = useState(false)

   const showAddStudentsModalHandler = () => {
      setshowAddStudentsModal((prevState) => !prevState)
   }
   const showEditStudentsModalHandler = () => {
      setshowEditStudentsModal((prevState) => !prevState)
   }

   const addStudentsHandler = (value) => {
      showAddStudentsModalHandler()
      dispatch(addStudents(value))
   }

   const sendEditedStudentInfo = () => {
      dispatch(editStudents(singleStudent.id))
   }

   const deleteStudentHandler = (id) => {
      const student = studentData.find((item) => item.id === id)
      dispatch(deleteStudents(student.id))
   }
   const editStudentsInfoHandler = (id) => {
      const student = studentData.find((item) => item.id === id)
      dispatch(getSingleStudent(student.id))
   }
   useEffect(() => {
      dispatch(getStudents())
   }, [])

   const COLUMNS = [
      {
         title: 'ID',
         accessKey: 'id',
      },
      {
         title: 'Имя Фамилия',
         accessKey: 'fullName',
      },
      {
         title: 'Группа',
         accessKey: 'groupName',
      },
      {
         title: 'Формат обучения',
         accessKey: 'studyFormat',
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
         action: (item) => (
            <StyledActions>
               <EditIcon onClick={() => editStudentsInfoHandler(item.id)} />
               <RemoveIcon onClick={() => deleteStudentHandler(item.id)} />
            </StyledActions>
         ),
      },
   ]
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
         <StudentsModalForm
            showAddStudentsModal={showAddStudentsModal}
            showAddStudentsModalHandler={showAddStudentsModalHandler}
            addStudentsHandler={addStudentsHandler}
         />
         <StudentsEditModal
            showEditStudentsModal={showEditStudentsModal}
            showEditStudentsModalHandler={showEditStudentsModalHandler}
            editStudentsHandler={sendEditedStudentInfo}
         />
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
