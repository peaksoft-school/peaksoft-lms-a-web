import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { ReactComponent as EditIcon } from '../../../assets/icons/editIcon.svg'
import { ReactComponent as RemoveIcon } from '../../../assets/icons/removeIcon.svg'
import { Button } from '../../UI/button/Button'
import ConfirmModal from '../../UI/modal/ConfirmModal'
import { AppTable } from '../../UI/table/AppTable'
import {
   deleteTeacher,
   getAllTeachers,
   getSingleTeacher,
   getTeachersPagination,
} from '../../../store/teachers-slice'
import { EditTeacher } from './EditTeacher'
import { DELETE_TEACHER, EDIT_TEACHER } from '../../../utils/constants/general'
import { AddNewTeachers } from './AddNewTeachers'

export const Teachers = () => {
   const dispatch = useDispatch()
   const { teachersData, singleTeacher } = useSelector(
      (state) => state.teachers
   )

   const [teacherId, setTeacherId] = useState()
   const [successNotification, setSuccessNotification] = useState(false)

   const [deleteSearchParams, setDeleteSearchParams] = useSearchParams()
   const [editSearchParams, setEditSearchParams] = useSearchParams()

   const [currentPage, setCurrentPage] = useState(1)

   const deleteTeacherModal = deleteSearchParams.get(DELETE_TEACHER)
   const editTeacherModal = editSearchParams.get(EDIT_TEACHER)

   const deleteHandler = () => {
      setDeleteSearchParams({ [DELETE_TEACHER]: true, teacher: teacherId })
      dispatch(deleteTeacher(teacherId))
      setDeleteSearchParams()
   }

   const handleClose = () => {
      setDeleteSearchParams()
   }

   const COLUMNS = [
      {
         id: 1,
         title: 'ID',
         accessKey: 'id',
      },
      {
         id: 2,
         title: 'Имя Фамилия',
         accessKey: 'fullName',
      },
      {
         id: 3,
         title: 'Специализация',
         accessKey: 'specialization',
      },
      {
         id: 4,
         title: 'Номер телефона',
         accessKey: 'phoneNumber',
      },
      {
         id: 5,
         title: 'E-mail',
         accessKey: 'email',
      },
      {
         id: 6,
         title: 'Действия',
         accessKey: '',
         action: (teacher) => (
            <StyledActions key={teacher.id}>
               <EditIcon onClick={() => editTeacherHandler(teacher.id)} />
               <RemoveIcon
                  onClick={() => {
                     deleteTeacherHandler(teacher.id)
                  }}
               />
            </StyledActions>
         ),
      },
   ]

   const deleteTeacherHandler = (id) => {
      setDeleteSearchParams({ [DELETE_TEACHER]: true, teacher: id })
      setTeacherId(id)
   }

   const editTeacherHandler = (id) => {
      setEditSearchParams({ [EDIT_TEACHER]: true, teacherId: id })
      dispatch(getSingleTeacher(id))
   }

   const paginationHandler = (event, value) => {
      setCurrentPage(value)
      dispatch(getTeachersPagination({ page: value }))
   }

   useEffect(() => {
      const teacherId = editSearchParams.get('teacherId')
      if (teacherId) {
         dispatch(getSingleTeacher(teacherId))
      }
      dispatch(getAllTeachers())
   }, [])

   return (
      <>
         <AddNewTeachers
            setSuccessNotification={setSuccessNotification}
            successNotification={successNotification}
         />
         {singleTeacher && (
            <EditTeacher
               singleTeacher={singleTeacher}
               editTeacherModal={editTeacherModal}
               setEditSearchParams={setEditSearchParams}
            />
         )}
         <ConfirmModal
            title="Вы уверены, что хотите удалить учителя...?"
            isConfirmModalOpen={Boolean(deleteTeacherModal)}
            onModalClose={() => setDeleteSearchParams()}
            closeConfirmModal={handleClose}
         >
            <Button
               background="#3772FF"
               bgHover="#1D60FF"
               bgActive="#6190FF"
               onClick={() => setDeleteSearchParams()}
            >
               Отмена
            </Button>
            <Button
               background="#C91E1E"
               bgHover="#B62727"
               bgActive="#E13A3A"
               onClick={deleteHandler}
            >
               Удалить
            </Button>
         </ConfirmModal>
         <AppTable
            columns={COLUMNS}
            data={teachersData}
            pagination={{ count: 3, onChange: paginationHandler }}
         />
      </>
   )
}

const StyledActions = styled.span`
   cursor: pointer;
   display: flex;
   border: none;
   align-items: center;
   justify-content: space-around;
   margin: 20px;
`
