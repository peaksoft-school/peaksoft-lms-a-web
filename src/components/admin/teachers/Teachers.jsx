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
   addTeacher,
   deleteTeacher,
   getSingleTeacher,
   getTeachersWithPagination,
} from '../../../store/teachers-slice'
import { EditTeacher } from './EditTeacher'
import { DELETE_TEACHER, EDIT_TEACHER } from '../../../utils/constants/general'
import { AddNewTeachers } from './AddNewTeachers'

export const Teachers = () => {
   const dispatch = useDispatch()
   const { teachersData, singleTeacher, generalPage, actualPage } = useSelector(
      (state) => state.teachers
   )

   const [teacherId, setTeacherId] = useState()

   const [searchParams, setSearchParams] = useSearchParams()

   const [currentPage, setCurrentPage] = useState(1)

   const deleteTeacherModal = searchParams.get(DELETE_TEACHER)
   const editTeacherModal = searchParams.get(EDIT_TEACHER)

   const addTeacherHandler = (value) => {
      dispatch(addTeacher({ value, page: currentPage }))
   }

   const deleteHandler = () => {
      setSearchParams({ [DELETE_TEACHER]: true, teacher: teacherId })
      dispatch(deleteTeacher(teacherId))
      setSearchParams()
   }

   const handleClose = () => {
      setSearchParams()
   }

   const deleteTeacherHandler = (id) => {
      setSearchParams({ [DELETE_TEACHER]: true, teacher: id })
      setTeacherId(id)
   }

   const editTeacherHandler = (id) => {
      setSearchParams({ [EDIT_TEACHER]: true, teacherId: id })
      dispatch(getSingleTeacher(id))
   }

   const paginationHandler = (event, value) => {
      setCurrentPage(value)
      dispatch(getTeachersWithPagination({ page: value, size: 10 }))
   }

   useEffect(() => {
      const teacherId = searchParams.get('teacherId')
      if (teacherId) {
         dispatch(getSingleTeacher(teacherId))
      }
      dispatch(getTeachersWithPagination({ page: currentPage, size: 10 }))
   }, [])

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

   return (
      <>
         <AddNewTeachers onAdd={addTeacherHandler} />
         {singleTeacher && (
            <EditTeacher
               singleTeacher={singleTeacher}
               editTeacherModal={editTeacherModal}
               setEditSearchParams={setSearchParams}
            />
         )}
         <ConfirmModal
            title="Вы уверены, что хотите удалить учителя...?"
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
               onClick={deleteHandler}
            >
               Удалить
            </Button>
         </ConfirmModal>
         <AppTable
            columns={COLUMNS}
            data={teachersData}
            pagination={{
               count: generalPage,
               onChange: paginationHandler,
               defaultPage: actualPage,
            }}
         />
      </>
   )
}

const StyledActions = styled.td`
   cursor: pointer;
   display: flex;
   border: none;
   align-items: center;
   justify-content: space-around;
   margin: 20px;
`
