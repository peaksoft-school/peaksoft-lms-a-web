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
   getSingleCourse,
   getTeachers,
   pagination,
} from '../../../store/courses-slice'
import {
   ADD_COURSE,
   APPOINT_TEACHER,
   DELETE_COURSE,
   EDIT_COURSE,
} from '../../../utils/constants/general'
import { Pagination } from '../../UI/pagination/Pagination'

export const CourseCards = () => {
   const dispatch = useDispatch()
   const { singleCourse, instructors, pages, courses } = useSelector(
      (state) => state.courses
   )

   const [courseId, setCourseId] = useState()
   const [currentPage, setCurrentPage] = useState(1)

   const [searchParamsForAddCourse, setSearchParamsForAddCourse] =
      useSearchParams()
   const [searchParamsForEditCourse, setSearchParamsForEditStudents] =
      useSearchParams()
   const [searchParamsForAppointTeacher, setSearchParamsForAppointTeacher] =
      useSearchParams()
   const [searchParamsForDeleteCourse, setSearchParamsForDeleteCourse] =
      useSearchParams()
   const [searchParamsCoursePages, setSearchParamsCoursePages] =
      useSearchParams()

   const showAddCourseModal = searchParamsForAddCourse.get(ADD_COURSE)
   const showEditCourseModal = searchParamsForEditCourse.get(EDIT_COURSE)
   const showAppointTeacherModal =
      searchParamsForAppointTeacher.get(APPOINT_TEACHER)
   const showConfirmModal = searchParamsForDeleteCourse.get(DELETE_COURSE)

   useEffect(() => {
      dispatch(getAllCourses())
      const courseId = searchParamsForEditCourse.get('courseId')
      if (courseId) {
         dispatch(getSingleCourse(courseId))
      }
      const teacherId = searchParamsForAppointTeacher.get('teacherId')
      if (teacherId) {
         dispatch(getTeachers())
      }
      dispatch(pagination(currentPage))
      setSearchParamsCoursePages(`page=${currentPage}`)
   }, [])

   const addCourseHandler = () => {
      setSearchParamsForAddCourse({ [ADD_COURSE]: true })
   }

   const assignTeacherHandler = (id) => {
      setSearchParamsForAppointTeacher({
         [APPOINT_TEACHER]: true,
         teacherId: id,
      })
      setCourseId(id)
      dispatch(getTeachers())
   }

   const getCourseIdHandler = (id) => {
      setSearchParamsForDeleteCourse({ [DELETE_COURSE]: true })
      setCourseId(id)
   }

   const editTeacherHandler = (id) => {
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

   const onChangeHandler = (currentPage) => {
      setSearchParamsCoursePages(`page=${currentPage}`)
      setCurrentPage(currentPage)
      dispatch(pagination(currentPage))
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
            {courses.map((card) => (
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
         {instructors && (
            <AssignTeacher
               isModalOpen={Boolean(showAppointTeacherModal)}
               closeHandler={closeModalHandler}
               teachers={instructors}
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
            <Pagination
               count={pages}
               page={currentPage}
               onChange={(_, num) => onChangeHandler(num)}
            />
         )}
      </Wrapper>
   )
}

const Wrapper = styled.div`
   position: relative;
   height: 850px;
   margin: 0 auto;
`

const StyledCard = styled.div`
   width: 270px;
`
const Container = styled.div`
   display: flex;
   cursor: pointer;
   flex-wrap: wrap;
   gap: 40px;
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
