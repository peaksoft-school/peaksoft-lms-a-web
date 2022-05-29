import { Breadcrumbs } from '@mui/material'
import React, { useMemo, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { AppTable } from '../../UI/table/AppTable'
import {
   getGroupStudents,
   getSingleGroup,
} from '../../../store/primer-page-slice'

export const CourseDetailPage = () => {
   const dispatch = useDispatch()
   const { newGroupStudents, singleGroup } = useSelector(
      (state) => state.instructorCourses
   )
   const { id } = useParams()

   useEffect(() => {
      dispatch(getGroupStudents(id))
      dispatch(getSingleGroup(id))
   }, [])
   const COURSE_INFO = useMemo(() => [
      { title: 'N', accessKey: id, id: 'one' },
      { title: 'Имя Фамилия', accessKey: 'fullName', id: 'two' },
      { title: 'Группа', accessKey: 'groupName', id: 'three' },
      { title: 'Формат обучения', accessKey: 'studyFormat', id: 'four' },
      { title: 'Номер телефона', accessKey: 'phoneNumber', id: 'five' },
      { title: 'E-mail', accessKey: 'email', id: 'six' },
   ])
   const pathArray = [
      { path: 'instructor/instructor_course', name: 'Курсы' },
      { path: 'instructor/primer_page', name: singleGroup?.groupName },
      { path: 'instructor/instructor_course', name: 'Студенты' },
   ]
   return (
      <div>
         <Breadcrumbs pathArray={pathArray} />
         <AppTable data={newGroupStudents} columns={COURSE_INFO} />
      </div>
   )
}
