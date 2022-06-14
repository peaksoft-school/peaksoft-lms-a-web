import styled from '@emotion/styled'
import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { ReactComponent as EditIcon } from '../../../assets/icons/editIcon.svg'
import { ReactComponent as RemoveIcon } from '../../../assets/icons/removeIcon.svg'
import {
   addStudent,
   deleteStudent,
   editStudent,
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
   DELETE_STUDENT,
} from '../../../utils/constants/general'
import { UploadExcel } from './UploadExcelModal'
import { ConfirmModalOnDelete } from './ConfirmModalOnDelete'
import {
   showErrorMessage,
   showSuccessMessage,
} from '../../UI/notification/Notification'
import { Spinner } from '../../UI/Spinner/Spinner'

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
   const {
      studentData,
      singleStudent,
      groups,
      totalPages,
      presentPage,
      isLoading,
   } = useSelector((state) => state.students)

   const [searchParams, setSearchParams] = useSearchParams()

   const [currentPage, setCurrentPage] = useState(1)
   const [studyFormat, setStudyFormat] = useState('ALL')
   const [deletedStudentId, setDeletedStudentId] = useState(null)

   const showConfirmModal = searchParams.get(DELETE_STUDENT)
   const showAddStudentsModal = searchParams.get(CREATE_STUDENT)
   const showEditStudentsModal = searchParams.get(EDIT_STUDENT)
   const showUploadStudentsModal = searchParams.get(UPLOAD_STUDENT)

   const closeModals = () => {
      setSearchParams({ page: currentPage })
   }

   const openStudentsModal = () => {
      setSearchParams({ [CREATE_STUDENT]: true })
      dispatch(getGroups())
   }

   const openUploadStudentsModal = () => {
      setSearchParams({ [UPLOAD_STUDENT]: true })
   }

   const addStudentHandler = (value, groupId, onClear) => {
      dispatch(addStudent({ value, id: groupId }))
         .unwrap()
         .then(() => {
            showSuccessMessage('Cтудент успешно создан')
            closeModals()
            dispatch(
               getStudentsWithPagination({ page: currentPage, studyFormat })
            )
            onClear()
         })
         .catch(() => {
            showErrorMessage('Не удалось добавить cтудентa')
         })
   }

   const sendEditedStudentInfo = (singleStudentsData, groupId, onClear) => {
      dispatch(
         editStudent({
            id: singleStudent.id,
            data: singleStudentsData,
            groupid: groupId,
         })
      )
         .unwrap()
         .then(() => {
            showSuccessMessage('Изменения успешно сохранены')
            closeModals()
            dispatch(
               getStudentsWithPagination({ page: currentPage, studyFormat })
            )
            onClear()
         })
         .catch(() => {
            showErrorMessage('Не удалось изменить данные')
         })
   }

   const deleteHandler = (id) => {
      setDeletedStudentId(id)
      setSearchParams({ [DELETE_STUDENT]: true })
   }

   const deleteStudentHandler = () => {
      dispatch(deleteStudent(deletedStudentId))
         .unwrap()
         .then(() => {
            showSuccessMessage('Cтудент успешно удален')
            closeModals()
            dispatch(
               getStudentsWithPagination({ page: currentPage, studyFormat })
            )
         })
         .catch(() => {
            showErrorMessage('Не удалось удалить cтудентa')
         })
   }

   const editStudentInfoHandler = (id) => {
      dispatch(getSingleStudent(id))
      dispatch(getGroups())
      setSearchParams({ [EDIT_STUDENT]: true, studentId: id })
   }

   const uploadStudentsAsExcelFileHandler = (groupId, excelFile) => {
      dispatch(getGroups())
      dispatch(
         sendStudentsAsExcel({
            file: excelFile,
            id: groupId,
         })
      )
         .unwrap()
         .then(() => {
            showSuccessMessage('Данные успешно сохранены')
            closeModals()
            dispatch(
               getStudentsWithPagination({ page: currentPage, studyFormat })
            )
         })
         .catch((error) => {
            showErrorMessage(error)
         })
   }

   const paginationHandler = (event, value) => {
      setCurrentPage(value)
      dispatch(getStudentsWithPagination({ page: value, studyFormat }))
   }

   const changeStudyFormatHandler = (option) => {
      setStudyFormat(option.title)
      dispatch(
         getStudentsWithPagination({
            page: currentPage,
            studyFormat: option.title,
         })
      )
         .unwrap()
         .catch(() => {
            showErrorMessage('Что-то пошло не так, попробуйте еще раз')
         })
   }

   useEffect(() => {
      const studentId = searchParams.get('studentId')
      const pageNumber = searchParams.get('page')

      paginationHandler('', pageNumber || 1)
      dispatch(getGroups())
      if (studentId) {
         dispatch(getSingleStudent(studentId))
         dispatch(getGroups())
      }
      if (showConfirmModal) {
         closeModals()
      }
   }, [])

   useEffect(() => {
      const page = searchParams.get('page')
      if (page) {
         setSearchParams({ page: currentPage || '1' })
      }
   }, [currentPage])

   const COLUMNS = useMemo(
      () => [
         {
            title: 'ID',
            accessKey: 'id',
            id: 1,
         },
         {
            title: 'Имя Фамилия',
            accessKey: 'fullName',
            id: 2,
         },
         {
            title: 'Группа',
            accessKey: 'groupName',
            id: 3,
         },
         {
            title: 'Формат обучения',
            accessKey: 'studyFormat',
            id: 4,
         },
         {
            title: 'Номер телефона',
            accessKey: 'phoneNumber',
            id: 5,
         },
         {
            title: 'E-mail',
            accessKey: 'email',
            id: 6,
         },
         {
            title: 'Действия',
            accessKey: 'actions',
            id: 7,
            action: (item) => (
               <StyledActions key={item.email}>
                  <EditIcon
                     onClick={() => {
                        if (item) {
                           editStudentInfoHandler(item.id)
                        }
                     }}
                  />
                  <RemoveIcon onClick={() => deleteHandler(item.id)} />
               </StyledActions>
            ),
         },
      ],
      []
   )
   const groupOptions = groups.map((el) => {
      return {
         id: el.id,
         title: el.groupName,
      }
   })
   return (
      <div>
         <StyledButtonsContainer>
            <StyledFormatOfEdu>
               <Select
                  options={STUDY_FORMAT_OPTION}
                  placeholder="Формат обучения"
                  selectedOption={changeStudyFormatHandler}
                  type="second"
               />
            </StyledFormatOfEdu>
            <AddStudents
               onOpenStudentsModal={openStudentsModal}
               onOpenUploadStudentsModal={openUploadStudentsModal}
            />
         </StyledButtonsContainer>
         <StudentsModalForm
            showModal={showAddStudentsModal}
            onClose={closeModals}
            onAdd={addStudentHandler}
            groups={groupOptions}
         />
         {singleStudent && (
            <StudentsEditModal
               showModal={Boolean(showEditStudentsModal)}
               onClose={closeModals}
               onEdit={sendEditedStudentInfo}
               student={singleStudent}
               groups={groupOptions}
            />
         )}
         <ConfirmModalOnDelete
            showModal={Boolean(showConfirmModal)}
            onDelete={deleteStudentHandler}
            onClose={closeModals}
         />
         <UploadExcel
            onUpload={uploadStudentsAsExcelFileHandler}
            onClose={closeModals}
            showModal={Boolean(showUploadStudentsModal)}
            groups={groupOptions}
         />
         {(isLoading && <Spinner />) || (
            <AppTable
               data={studentData}
               columns={COLUMNS}
               pagination={{
                  count: totalPages,
                  onChange: paginationHandler,
                  defaultPage: presentPage,
               }}
            />
         )}
      </div>
   )
}
const StyledButtonsContainer = styled.div`
   width: 100%;
   height: 65px;
   display: flex;
   justify-content: space-between;
   align-items: center;
   margin-top: 6px;
`
const StyledFormatOfEdu = styled.div`
   width: 202px;
   display: flex;
   justify-content: start;
`
const StyledActions = styled.td`
   cursor: pointer;
   display: flex;
   border: none;
   align-items: center;
   justify-content: space-around;
   margin: 20px;
`
