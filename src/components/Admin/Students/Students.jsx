/* eslint-disable react/no-unstable-nested-components */
import styled from '@emotion/styled'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { ReactComponent as EditIcon } from '../../../assets/icons/editIcon.svg'
import { ReactComponent as RemoveIcon } from '../../../assets/icons/removeIcon.svg'
import {
   addStudents,
   deleteStudents,
   editStudents,
   getGroups,
   getSingleStudent,
   getStudentsWithPagination,
   sendStudentsAsExcel,
} from '../../../store/studentsSlice'
import { Select } from '../../UI/select/Select'
import { AppTable } from '../../UI/table/AppTable'
import { AddStudents } from './AddStudents'
import { StudentsEditModal } from './StudentEditModal'
import { StudentsModalForm } from './StudentsModalForm'
import {
   CREATE_STUDENT,
   EDIT_STUDENT,
   UPLOAD_STUDENT,
} from '../../../utils/constants/general'
import { UploadExcel } from './UploadExcelModal'

const STUDY_FORMAT_OPTION = [
   {
      id: 'ALL',
      title: 'ALL',
   },
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
   const { studentData, singleStudent, groups } = useSelector(
      (state) => state.students
   )
   const [searchParamsForCreate, setSearchParamsForCreateStudents] =
      useSearchParams()
   const [searchParamsForEditStudents, setSearchParamsForEditStudents] =
      useSearchParams()
   const [searchParamsForUploadStudents, setSearchParamsForUploadStudents] =
      useSearchParams()

   const [currentPage, setCurrentPage] = useState(1)
   const [studyFormat, setStudyFormat] = useState('OFFLINE')

   const showAddStudentsModal = searchParamsForCreate.get(CREATE_STUDENT)
   const showEditStudentsModal = searchParamsForEditStudents.get(EDIT_STUDENT)
   const showUploadStudentsModal =
      searchParamsForUploadStudents.get(UPLOAD_STUDENT)

   const closeCreateStudentModal = () => {
      setSearchParamsForCreateStudents('')
   }

   const closeEditStudentsModal = () => {
      setSearchParamsForUploadStudents('')
   }

   const closeUploadStudentsModal = () => {
      setSearchParamsForEditStudents('')
   }

   const openStudentsModal = () => {
      setSearchParamsForCreateStudents({ [CREATE_STUDENT]: true })
      dispatch(getGroups())
   }

   const openUploadStudentsModal = () => {
      setSearchParamsForUploadStudents({ [UPLOAD_STUDENT]: true })
   }

   const addStudentsHandler = (value, groupId) => {
      dispatch(
         addStudents({ value, id: groupId, page: currentPage, studyFormat })
      )
      closeEditStudentsModal()
   }

   const sendEditedStudentInfo = (singleStudentsData, groupId) => {
      dispatch(
         editStudents({
            id: singleStudent.id,
            data: singleStudentsData,
            groupid: groupId,
            page: currentPage,
            studyFormat,
         })
      )
   }

   const deleteStudentHandler = (id) => {
      dispatch(deleteStudents({ id, page: currentPage, studyFormat }))
   }

   const editStudentsInfoHandler = (id) => {
      dispatch(getSingleStudent(id))
      dispatch(getGroups())
      setSearchParamsForEditStudents({ [EDIT_STUDENT]: true, studentId: id })
   }

   const uploadStudentsAsExcelFileHandler = (groupId, excelFile) => {
      dispatch(
         sendStudentsAsExcel({
            file: excelFile,
            id: groupId,
            page: currentPage,
            studyFormat,
         })
      )
      dispatch(getGroups())
   }

   const paginationHandler = (event, value) => {
      setCurrentPage(value)
      dispatch(getStudentsWithPagination({ page: value, studyFormat }))
   }

   useEffect(() => {
      const studentId = searchParamsForEditStudents.get('studentId')
      // dispatch(getStudents())
      // getStudentsWithPagination({ page: 1, studyFormat: 'OFFLINE' })
      paginationHandler('', 1)
      dispatch(getGroups())
      if (studentId) {
         dispatch(getSingleStudent(studentId))
         dispatch(getGroups())
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
   const groupOptions = [
      groups.map((el) => {
         return {
            id: el.id,
            title: el.groupName,
         }
      }),
   ]
   return (
      <div>
         <StyledButtonsContainer>
            <StyledFormatOfEdu>
               <Select
                  options={STUDY_FORMAT_OPTION}
                  placeholder="Формат обучения"
                  type="second"
               />
            </StyledFormatOfEdu>
            <AddStudents
               onOpenStudentsModal={openStudentsModal}
               onOpenUploadStudentsModal={openUploadStudentsModal}
            />
         </StyledButtonsContainer>
         <StudentsModalForm
            showAddStudentsModal={showAddStudentsModal}
            showAddStudentsModalHandler={closeCreateStudentModal}
            addStudentsHandler={addStudentsHandler}
            groupOptions={groupOptions}
         />
         {singleStudent && (
            <StudentsEditModal
               showEditStudentsModal={showEditStudentsModal}
               closeEditStudentsModal={closeEditStudentsModal}
               editStudentsHandler={sendEditedStudentInfo}
               singleStudent={singleStudent}
               groupOptions={groupOptions}
            />
         )}
         <UploadExcel
            uploadStudentsHandler={uploadStudentsAsExcelFileHandler}
            colseUplaodStudentsModal={closeUploadStudentsModal}
            openUplaodModal={showUploadStudentsModal}
            groupOptions={groupOptions}
         />
         <AppTable
            data={studentData}
            columns={COLUMNS}
            pagination={{ count: 3, onChange: paginationHandler }}
         />
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
