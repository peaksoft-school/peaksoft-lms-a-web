import React, { useEffect, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import styled from '@emotion/styled'
import { AppTable } from '../../UI/table/AppTable'
import {
   getGroupsStudents,
   getSingleGroup,
   groupsPagination,
} from '../../../store/groupSlice'
import { BreadCrumbs } from '../../UI/breadCrumb/BreadCrumbs'
import { Spinner } from '../../UI/Spinner/Spinner'

const GroupDetailPage = () => {
   const dispatch = useDispatch()
   const { studentsIState, singleGroup, isLoading } = useSelector(
      (state) => state.groups
   )

   const { id } = useParams()

   useEffect(() => {
      dispatch(getGroupsStudents(id))
      dispatch(groupsPagination(1))
      dispatch(getSingleGroup(id))
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

   const pathsArray = [
      {
         path: 'admin/groups',
         name: 'Группы',
      },
      {
         path: 'admin/group_students',
         name: singleGroup?.groupName,
      },
      {
         path: 'admin/groups',
         name: 'Студенты',
      },
   ]

   return (
      <Container>
         <BreadCrumbs pathsArray={pathsArray} />
         {(isLoading && <Spinner />) || (
            <AppTable data={studentsIState} columns={STUDENTS_INFO} />
         )}
      </Container>
   )
}

export default GroupDetailPage

const Container = styled.div`
   margin-top: 38px;
`
