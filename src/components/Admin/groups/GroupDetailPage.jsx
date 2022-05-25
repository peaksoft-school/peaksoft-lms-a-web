import React, { useEffect, useMemo, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { AppTable } from '../../UI/table/AppTable'
import { getGroupsStudents } from '../../../store/groupSlice'

export const GroupDetailPage = () => {
   const dispatch = useDispatch()
   const { studentsIState } = useSelector((state) => state.groups)

   const { id } = useParams()

   useEffect(() => {
      dispatch(getGroupsStudents(id))
   }, [])

   const STUDENTS_INFO = useMemo(() => [
      { title: 'ID', accessKey: 'id', id: 1 },
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
   ])

   return (
      <div>
         <AppTable data={studentsIState} columns={STUDENTS_INFO} />
      </div>
   )
}
