import React, { useEffect, useMemo, useState } from 'react'
import styled from '@emotion/styled'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { Card } from '../../UI/card/Card'
import { ReactComponent as PinIcon } from '../../../assets/icons/pinnedIcon.svg'
import { ReactComponent as EditIcon } from '../../../assets/icons/edit.svg'
import { ReactComponent as TrashIcon } from '../../../assets/icons/trashIcon.svg'
import { Button } from '../../UI/button/Button'
import ConfirmModal from '../../UI/modal/ConfirmModal'
import { AssignTeacher } from './AssignTeacher'
import { EditCourse } from './EditCourse'
import { AddNewCourse } from './AddNewCourse'
import {
   coursesActions,
   deleteCourse,
   getAllCourses,
   getInstructor,
   getSingleCourse,
   pagination,
} from '../../../store/courses-slice'
import {
   ADD_COURSE,
   APPOINT_TEACHER,
   DELETE_COURSE,
   EDIT_COURSE,
} from '../../../utils/constants/general'
import { Pagination } from '../../UI/pagination/Pagination'
import { Notification } from '../../UI/notification/Notification'

export const Courses = () => {
   const dispatch = useDispatch()
   const { сourse, instructors, pages, courses, isSuccess, error } =
      useSelector((state) => state.courses)

   const [courseId, setCourseId] = useState()
   const [currentPage, setCurrentPage] = useState(1)
   const [searchParams, setSearchParams] = useSearchParams()

   const showAddCourseModal = searchParams.get(ADD_COURSE)
   const showEditCourseModal = searchParams.get(EDIT_COURSE)
   const showAppointTeacherModal = searchParams.get(APPOINT_TEACHER)
   const showConfirmModal = searchParams.get(DELETE_COURSE)

   useEffect(() => {
      dispatch(getAllCourses())

      const courseId = searchParams.get('courseId')
      if (courseId) {
         dispatch(getSingleCourse(courseId))
      }

      const teacherId = searchParams.get('teacherId')
      if (teacherId) {
         dispatch(getInstructor())
      }

      dispatch(pagination(currentPage))
   }, [])

   const addCourseHandler = () => {
      setSearchParams({ [ADD_COURSE]: true })
   }

   const assignTeacher = (id) => {
      setSearchParams({
         [APPOINT_TEACHER]: true,
         teacherId: id,
      })
      setCourseId(id)
      dispatch(getInstructor())
   }

   const getCourseId = (id) => {
      setSearchParams({ [DELETE_COURSE]: true })
      setCourseId(id)
   }

   const editCourse = (id) => {
      dispatch(getSingleCourse(id))
      setSearchParams({
         [EDIT_COURSE]: true,
         courseId: id,
      })
   }

   const deleteHandler = () => {
      dispatch(deleteCourse({ id: courseId, currentPage }))
      closeModal()
   }

   const onChangeHandler = (currentPage) => {
      setSearchParams(`page=${currentPage}`)
      setCurrentPage(currentPage)
      dispatch(pagination(currentPage))
   }

   const closeModal = () => {
      setSearchParams(false)
   }

   useEffect(() => {
      setTimeout(() => {
         dispatch(coursesActions.showSuccessMessage(false))
      }, 1555)
   }, [isSuccess])

   useEffect(() => {
      setTimeout(() => {
         dispatch(coursesActions.showErrorMessage(false))
      }, 2500)
   }, [error])

   const options = useMemo(
      () => [
         {
            id: '1',
            action: (course) => assignTeacher(course.id),
            content: (
               <StyledIcon>
                  <PinIcon />
                  <p>Назначить учителя</p>
               </StyledIcon>
            ),
         },
         {
            id: '2',
            action: (course) => editCourse(course.id),
            content: (
               <StyledIcon>
                  <EditIcon />
                  <p>Редактировать</p>
               </StyledIcon>
            ),
         },
         {
            id: '3',
            action: (course) => getCourseId(course.id),
            content: (
               <StyledIcon>
                  <TrashIcon />
                  <p>Удалить</p>
               </StyledIcon>
            ),
         },
      ],
      []
   )
   return (
      <Wrapper>
         <AddNewCourse
            isModalOpen={showAddCourseModal}
            closeModal={closeModal}
            addCourseHandler={addCourseHandler}
            currentPage={currentPage}
         />
         <Container>
            {courses.map((course) => (
               <StyledCard key={course.id}>
                  <Card
                     options={options}
                     image={course.image}
                     title={course.courseName}
                     description={course.description}
                     date={course.dateOfStart}
                     card={course}
                  />
               </StyledCard>
            ))}
         </Container>
         {instructors && (
            <AssignTeacher
               isModalOpen={Boolean(showAppointTeacherModal)}
               closeModal={closeModal}
               instructors={instructors}
               id={courseId}
            />
         )}

         {сourse && (
            <EditCourse
               isModalOpen={Boolean(showEditCourseModal)}
               closeModal={closeModal}
               сourse={сourse}
               currentPage={currentPage}
            />
         )}

         <ConfirmModal
            isConfirmModalOpen={Boolean(showConfirmModal)}
            closeConfirmModal={closeModal}
            title="Вы уверены, что хотите удалить курс... ?"
         >
            <StyledButton>
               <Button
                  background="none"
                  border="1px solid #3772FF"
                  color="#3772FF"
                  onClick={closeModal}
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
            </StyledButton>
         </ConfirmModal>
         {pages && (
            <StyledPagination>
               <Pagination
                  count={pages}
                  page={currentPage}
                  onChange={(_, num) => onChangeHandler(num)}
               />
            </StyledPagination>
         )}
         {isSuccess && <Notification message={isSuccess} />}
         {error && <Notification message={error} status="error" />}
      </Wrapper>
   )
}

const Wrapper = styled.div`
   position: relative;
   height: 880px;
   margin: 0 auto;
`
const StyledPagination = styled.div`
   margin-top: 20px;
`
const StyledCard = styled.div`
   min-width: 270px;
   min-height: 300px;
   max-height: 330px;
`
const Container = styled.div`
   cursor: pointer;
   flex-wrap: wrap;
   gap: 40px;
   grid-row: 40px;
   display: grid;
   grid-template-columns: repeat(4, 1fr);
   grid-template-rows: repeat(2, 1fr);
   grid-column-gap: 40px;
   grid-row-gap: 40px;
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
   margin: 10px 0;
   justify-content: space-between;
`
