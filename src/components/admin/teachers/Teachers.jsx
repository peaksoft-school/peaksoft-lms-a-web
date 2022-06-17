import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { ReactComponent as EditIcon } from '../../../assets/icons/editIcon.svg'
import { ReactComponent as RemoveIcon } from '../../../assets/icons/removeIcon.svg'
import { Button } from '../../UI/button/Button'
import ConfirmModal from '../../UI/modal/ConfirmModal'
import { AppTable } from '../../UI/table/AppTable'
import { Spinner } from '../../UI/Spinner/Spinner'
import {
   addTeacher,
   deleteTeacher,
   editTeacher,
   getSingleTeacher,
   getTeachersWithPagination,
} from '../../../store/teachers-slice'
import { EditTeacher } from './EditTeacher'
import {
   ADD_TEACHERS,
   DELETE_TEACHER,
   EDIT_TEACHER,
} from '../../../utils/constants/general'
import { AddNewTeacher } from './AddNewTeacher'
import {
   showErrorMessage,
   showSuccessMessage,
} from '../../UI/notification/Notification'

const Teachers = () => {
   const dispatch = useDispatch()
   const { teacherData, singleTeacher, generalPage, actualPage, isLoading } =
      useSelector((state) => state.teachers)

   const [searchParams, setSearchParams] = useSearchParams()

   const [currentPage, setCurrentPage] = useState(1)
   const [teacherId, setTeacherId] = useState(null)

   const deleteTeacherModal = searchParams.get(DELETE_TEACHER)
   const addTeacherModal = searchParams.get(ADD_TEACHERS)
   const editTeacherModal = searchParams.get(EDIT_TEACHER)

   const handleClose = () => {
      setSearchParams({ page: currentPage })
   }

   const addModalHandler = () => {
      setSearchParams({ [ADD_TEACHERS]: true })
   }
   const editModalHandler = (id) => {
      dispatch(getSingleTeacher(id))
      setSearchParams({ [EDIT_TEACHER]: true, teacherId: id })
   }
   const deleteModalHandler = (id) => {
      setTeacherId(id)
      setSearchParams({ [DELETE_TEACHER]: true })
   }
   const paginationHandler = (event, value) => {
      setCurrentPage(value)
      dispatch(getTeachersWithPagination({ page: value, size: 10 }))
   }

   const addTeacherHandler = (value, onClear) => {
      dispatch(addTeacher({ value }))
         .unwrap()
         .then(() => {
            showSuccessMessage('Учитель успешно создан')
            handleClose()
            dispatch(getTeachersWithPagination({ page: currentPage }))
            onClear()
         })
         .catch(() => {
            showErrorMessage('Не удалось добавить учителя')
         })
   }

   const editTeacherHandler = (singleTeacherData, onClear) => {
      dispatch(
         editTeacher({
            id: singleTeacher.id,
            data: singleTeacherData,
         })
      )
         .unwrap()
         .then(() => {
            showSuccessMessage('Изменения успешно сохранены')
            handleClose()
            dispatch(getTeachersWithPagination({ page: currentPage }))
            onClear()
         })
         .catch(() => {
            showErrorMessage('Не удалось изменить данные')
         })
   }

   const deleteTeacherHandler = () => {
      dispatch(deleteTeacher(teacherId))
         .unwrap()
         .then(() => {
            showSuccessMessage('Учитель успешно удален')
            handleClose()
            dispatch(getTeachersWithPagination({ page: currentPage }))
         })
         .catch(() => {
            showErrorMessage('Не удалось удалить учителя')
         })
   }

   useEffect(() => {
      const teacherId = searchParams.get('teacherId')
      const pageNumber = searchParams.get('page')

      paginationHandler('', pageNumber || 1)
      if (teacherId) {
         dispatch(getSingleTeacher(teacherId))
      }
      if (deleteTeacherModal) {
         handleClose()
      }
   }, [])

   useEffect(() => {
      const page = searchParams.get('page')
      if (page) {
         setSearchParams({ page: currentPage || '1' })
      }
   }, [currentPage])

   const COLUMNS = [
      {
         id: 'one',
         title: 'ID',
         accessKey: 'id',
      },
      {
         id: 'two',
         title: 'Имя Фамилия',
         accessKey: 'fullName',
      },
      {
         id: 'three',
         title: 'Специализация',
         accessKey: 'specialization',
      },
      {
         id: 'four',
         title: 'Номер телефона',
         accessKey: 'phoneNumber',
      },
      {
         id: 'five',
         title: 'E-mail',
         accessKey: 'email',
      },
      {
         id: 'six',
         title: 'Действия',
         accessKey: '',
         action: (teacher) => (
            <StyledActions key={teacher.id}>
               <EditIcon onClick={() => editModalHandler(teacher.id)} />
               <RemoveIcon
                  onClick={() => {
                     deleteModalHandler(teacher.id)
                  }}
               />
            </StyledActions>
         ),
      },
   ]

   return (
      <>
         <AddNewTeacher
            onAdd={addTeacherHandler}
            showModal={addTeacherModal}
            onClose={handleClose}
            addHandler={addModalHandler}
         />
         {singleTeacher && (
            <EditTeacher
               showModal={Boolean(editTeacherModal)}
               singleTeacher={singleTeacher}
               onClose={handleClose}
               onEdit={editTeacherHandler}
            />
         )}
         <ConfirmModal
            title="Вы уверены, что хотите удалить учителя?"
            isConfirmModalOpen={Boolean(deleteTeacherModal)}
            onModalClose={() => setSearchParams()}
            closeConfirmModal={handleClose}
         >
            <Button
               background="#3772FF"
               bgHover="#1D60FF"
               bgActive="#6190FF"
               onClick={() => setSearchParams()}
            >
               Отмена
            </Button>
            <Button
               background="#C91E1E"
               bgHover="#B62727"
               bgActive="#E13A3A"
               onClick={deleteTeacherHandler}
            >
               Удалить
            </Button>
         </ConfirmModal>
         {(isLoading && <Spinner />) || (
            <AppTable
               data={teacherData}
               columns={COLUMNS}
               pagination={{
                  count: generalPage,
                  onChange: paginationHandler,
                  defaultPage: actualPage,
               }}
            />
         )}
      </>
   )
}

export default Teachers

const StyledActions = styled.td`
   cursor: pointer;
   display: flex;
   border: none;
   align-items: center;
   justify-content: space-around;
   margin: 20px;
`
