/* eslint-disable react/no-unstable-nested-components */
import styled from '@emotion/styled'
import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
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
import { CREATE_STUDENT, EDIT_STUDENT } from '../../../utils/constants/general'

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
   const [searchParamsForCreate, setSearchParamsForCreateStudents] =
      useSearchParams()
   const [searchParamsForEditStudents, setSearchParamsForEditStudents] =
      useSearchParams()

   const showAddStudentsModal = searchParamsForCreate.get(CREATE_STUDENT)
   const showEditStudentsModal = searchParamsForEditStudents.get(EDIT_STUDENT)

   const closeCreateStudentModal = () => {
      setSearchParamsForCreateStudents('')
   }

   const closeEditStudentsModal = () => {
      setSearchParamsForEditStudents('')
   }

   const openStudentsModal = () => {
      setSearchParamsForCreateStudents({ [CREATE_STUDENT]: true })
   }

   const addStudentsHandler = (value) => {
      dispatch(addStudents(value))
   }

   const sendEditedStudentInfo = (singleStudentsData) => {
      const student = {
         id: singleStudent.id,
         data: singleStudentsData,
      }
      dispatch(editStudents(student))
   }

   const deleteStudentHandler = (id) => {
      dispatch(deleteStudents(id))
   }

   const editStudentsInfoHandler = (id) => {
      dispatch(getSingleStudent(id))
      setSearchParamsForEditStudents({ [EDIT_STUDENT]: true, studentId: id })
   }
   useEffect(() => {
      dispatch(getStudents())
   }, [])

   useEffect(() => {
      const studentId = searchParamsForEditStudents.get('studentId')
      if (studentId) {
         dispatch(getSingleStudent(studentId))
      }
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
               <EditIcon
                  onClick={() => {
                     if (item) {
                        editStudentsInfoHandler(item.id)
                     }
                  }}
               />
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
            <AddStudents onOpenStudentsModal={openStudentsModal} />
         </StyledButtonsContainer>
         <StudentsModalForm
            showAddStudentsModal={showAddStudentsModal}
            showAddStudentsModalHandler={closeCreateStudentModal}
            addStudentsHandler={addStudentsHandler}
         />
         {singleStudent && (
            <StudentsEditModal
               showEditStudentsModal={showEditStudentsModal}
               closeEditStudentsModal={closeEditStudentsModal}
               editStudentsHandler={sendEditedStudentInfo}
               singleStudent={singleStudent}
            />
         )}
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
