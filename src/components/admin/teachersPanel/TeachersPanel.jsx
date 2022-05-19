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
} from '../../../store/teachers-slice'
import { UpdateTeacher } from './UpdateTeacher'
import { DELETE_TEACHER, EDIT_TEACHER } from '../../../utils/constants/general'
import { AddNewTeachers } from './AddNewTeachers'

export const TeachersPanel = () => {
   const dispatch = useDispatch()
   const { teachersData, singleTeacher } = useSelector(
      (state) => state.teachers
   )

   const [teacherId, setTeacherId] = useState()
   const [successNotification, setSuccessNotification] = useState(false)

   const [deleteSearchParams, setDeleteSearchParams] = useSearchParams()
   const [editSearchParams, setEditSearchParams] = useSearchParams()

   const deleteTeacherModal = deleteSearchParams.get(DELETE_TEACHER)
   const editTeacherModal = editSearchParams.get(EDIT_TEACHER)

   const deleteHandler = () => {
      setDeleteSearchParams({ [DELETE_TEACHER]: true, teacher: teacherId })
      setDeleteSearchParams()
      dispatch(deleteTeacher(teacherId))
      dispatch(getAllTeachers())
   }

   const handleClose = () => {
      setDeleteSearchParams()
   }

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
         title: 'Специализация',
         accessKey: 'specialization',
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
         accessKey: '',
         action: (teacher) => (
            <StyledActions>
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

   useEffect(() => {
      const teacherId = editSearchParams.get('teacherId')
      if (teacherId) {
         dispatch(getSingleTeacher(teacherId))
      }
      const id = deleteSearchParams.get('teacher')
      if (id) {
         dispatch(deleteTeacher())
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
            <UpdateTeacher
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
         <AppTable columns={COLUMNS} data={teachersData} />
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
