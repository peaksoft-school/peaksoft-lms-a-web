import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { Card } from '../../UI/card/Card'
import { ReactComponent as PinIcon } from '../../../assets/icons/pinnedIcon.svg'
import { ReactComponent as EditIcon } from '../../../assets/icons/edit.svg'
import { ReactComponent as TrashIcon } from '../../../assets/icons/trashIcon.svg'
import { Button } from '../../UI/button/Button'
import ConfirmModal from '../../UI/modal/ConfirmModal'
import { AppointTeacher } from './AppointTeacher'
import { EditCourse } from './EditCourse'
import { AddNewCourse } from './AddNewCourse'
import {
   deleteCourse,
   getAllCourses,
   getSingleCourse,
   getTeachers,
   pagination,
} from '../../../store/coursesSlice'
import {
   ADD_COURSE,
   APPOINT_TEACHER,
   DELETE_COURSE,
   EDIT_COURSE,
} from '../../../utils/constants/general'

export const CourseCards = () => {
   const dispatch = useDispatch()
   const { allCourses, singleCourse, teachers } = useSelector(
      (state) => state.courses
   )

   const [courseId, setCourseId] = useState()

   const [searchParamsForAddCourse, setSearchParamsForAddCourse] =
      useSearchParams()
   const [searchParamsForEditCourse, setSearchParamsForEditStudents] =
      useSearchParams()
   const [searchParamsForAppointTeacher, setSearchParamsForAppointTeacher] =
      useSearchParams()
   const [searchParamsForDeleteCourse, setSearchParamsForDeleteCourse] =
      useSearchParams()

   const showAddCourseModal = searchParamsForAddCourse.get(ADD_COURSE)
   const showEditCourseModal = searchParamsForEditCourse.get(EDIT_COURSE)
   const showAppointTeacherModal =
      searchParamsForAppointTeacher.get(APPOINT_TEACHER)
   const showConfirmModal = searchParamsForDeleteCourse.get(DELETE_COURSE)

   const options = [
      {
         id: '1',
         action: (course) => appointTeacher(course.id),
         content: (
            <StyledIcon>
               <PinIcon />
               <p>Назначить учителя</p>
            </StyledIcon>
         ),
      },
      {
         id: '2',
         action: (course) => editTeacher(course.id),
         content: (
            <StyledIcon>
               <EditIcon />
               <p>Редактировать</p>
            </StyledIcon>
         ),
      },
      {
         id: '3',
         action: (course) => getCourseId(course),
         content: (
            <StyledIcon>
               <TrashIcon />
               <p>Удалить</p>
            </StyledIcon>
         ),
      },
   ]
   useEffect(() => {
      dispatch(getAllCourses())
   }, [])

   useEffect(() => {
      const courseId = searchParamsForEditCourse.get('courseId')
      if (courseId) {
         dispatch(getSingleCourse(courseId))
      }
   }, [])

   useEffect(() => {
      const teacherId = searchParamsForAppointTeacher.get('teacherId')
      if (teacherId) {
         dispatch(getTeachers())
      }
   }, [])
   useEffect(() => {
      dispatch(pagination())
   }, [])

   const getCourseId = (course) => {
      setSearchParamsForDeleteCourse({ [DELETE_COURSE]: true })
      setCourseId(course.id)
   }

   const appointTeacher = (id) => {
      setSearchParamsForAppointTeacher({
         [APPOINT_TEACHER]: true,
         teacherId: id,
      })
      setCourseId(id)
      dispatch(getTeachers())
   }

   const addCourse = () => {
      setSearchParamsForAddCourse({ [ADD_COURSE]: true })
   }

   const editTeacher = (id) => {
      dispatch(getSingleCourse(id))
      setSearchParamsForEditStudents({
         [EDIT_COURSE]: true,
         courseId: id,
      })
   }

   const closeModalHandler = () => {
      setSearchParamsForAddCourse(false)
      setSearchParamsForEditStudents(false)
      setSearchParamsForAppointTeacher(false)
      setSearchParamsForDeleteCourse(false)
   }

   const deleteCourseHandler = () => {
      dispatch(deleteCourse(courseId))
      closeModalHandler()
   }
   console.log(teachers)

   return (
      <div>
         <AddNewCourse
            isModalOpen={showAddCourseModal}
            closeModalHandler={closeModalHandler}
            addCourse={addCourse}
         />
         <Container>
            {allCourses.map((card) => (
               <StyledCard key={card.id}>
                  <Card
                     options={options}
                     image={card.image}
                     title={card.courseName}
                     description={card.description}
                     date={card.dateOfStart}
                     course={card}
                  />
               </StyledCard>
            ))}
         </Container>
         {teachers && (
            <AppointTeacher
               isModalOpen={Boolean(showAppointTeacherModal)}
               closeHandler={closeModalHandler}
               teachers={teachers}
               id={courseId}
            />
         )}

         {singleCourse && (
            <EditCourse
               isEditModalOpen={Boolean(showEditCourseModal)}
               closeEditModalHandler={closeModalHandler}
               singleCourse={singleCourse}
            />
         )}

         <ConfirmModal
            isConfirmModalOpen={Boolean(showConfirmModal)}
            closeConfirmModal={closeModalHandler}
            title="Вы уверены, что хотите удалить группу ... ?"
         >
            <StyledButton>
               <Button
                  background="none"
                  border="1px solid #3772FF"
                  color="#3772FF"
                  onClick={closeModalHandler}
               >
                  Отмена
               </Button>
               <Button
                  background="#C91E1E"
                  bgHover="#B62727"
                  bgActive="#E13A3A"
                  onClick={deleteCourseHandler}
               >
                  Удалить
               </Button>
            </StyledButton>
         </ConfirmModal>
      </div>
   )
}

const StyledCard = styled.div`
   width: 270px;
`
const Container = styled.div`
   display: flex;
   cursor: pointer;
   flex-wrap: wrap;
   gap: 15px;
`
const StyledIcon = styled.div`
   display: flex;
   & p {
      margin-left: 8px;
   }
`
const StyledButton = styled.div`
   width: 241px;
   display: flex;
   justify-content: space-between;
`
