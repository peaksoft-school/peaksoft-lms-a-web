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
import { AssignTeacher } from './AssignTeacher'
import { EditCourse } from './EditCourse'
import { AddNewCourse } from './AddNewCourse'
import {
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

export const Courses = () => {
   const dispatch = useDispatch()
   const { singleCourse, instructors, pages, courses } = useSelector(
      (state) => state.courses
   )

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
      dispatch(getSingleCourse(courseId))
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

   const assignTeacherHandler = (id) => {
      setSearchParams({
         [APPOINT_TEACHER]: true,
         teacherId: id,
      })
      setCourseId(id)
      dispatch(getInstructor())
   }

   const getCourseIdHandler = (id) => {
      setSearchParams({ [DELETE_COURSE]: true })
      setCourseId(id)
   }

   const editTeacherHandler = (id) => {
      dispatch(getSingleCourse(id))
      setSearchParams({
         [EDIT_COURSE]: true,
         courseId: id,
      })
   }

   const deleteCourseHandler = () => {
      dispatch(deleteCourse({ id: courseId, currentPage }))
      closeModalHandler()
   }

   const onChangeHandler = (currentPage) => {
      setSearchParams(`page=${currentPage}`)
      setCurrentPage(currentPage)
      dispatch(pagination(currentPage))
   }
   const closeModalHandler = () => {
      setSearchParams(false)
   }
   const options = [
      {
         id: '1',
         action: (course) => assignTeacherHandler(course.id),
         content: (
            <StyledIcon>
               <PinIcon />
               <p>Назначить учителя</p>
            </StyledIcon>
         ),
      },
      {
         id: '2',
         action: (course) => editTeacherHandler(course.id),
         content: (
            <StyledIcon>
               <EditIcon />
               <p>Редактировать</p>
            </StyledIcon>
         ),
      },
      {
         id: '3',
         action: (course) => getCourseIdHandler(course.id),
         content: (
            <StyledIcon>
               <TrashIcon />
               <p>Удалить</p>
            </StyledIcon>
         ),
      },
   ]
   return (
      <Wrapper>
         <AddNewCourse
            isModalOpen={showAddCourseModal}
            closeModalHandler={closeModalHandler}
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
               closeModalHandler={closeModalHandler}
               instructors={instructors}
               id={courseId}
            />
         )}

         {singleCourse && (
            <EditCourse
               isEditModalOpen={Boolean(showEditCourseModal)}
               closeEditModalHandler={closeModalHandler}
               singleCourse={singleCourse}
               currentPage={currentPage}
            />
         )}

         <ConfirmModal
            isConfirmModalOpen={Boolean(showConfirmModal)}
            closeConfirmModal={closeModalHandler}
            title="Вы уверены, что хотите удалить курс... ?"
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
         {pages && (
            <StyledPagination>
               <Pagination
                  count={pages}
                  page={currentPage}
                  onChange={(_, num) => onChangeHandler(num)}
               />
            </StyledPagination>
         )}
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
