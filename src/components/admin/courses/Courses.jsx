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
   deleteCourse,
   getAllCourses,
   getInstructor,
   getSingleCourse,
} from '../../../store/courses-slice'
import {
   ADD_COURSE,
   APPOINT_TEACHER,
   DELETE_COURSE,
   EDIT_COURSE,
} from '../../../utils/constants/general'
import { Pagination } from '../../UI/pagination/Pagination'
import {
   showErrorMessage,
   showSuccessMessage,
} from '../../UI/notification/Notification'
import { Spinner } from '../../UI/Spinner/Spinner'

const Courses = () => {
   const dispatch = useDispatch()
   const { сourse, instructors, pages, courses, isLoading, courseTeachers } =
      useSelector((state) => state.courses)

   const [courseId, setCourseId] = useState()
   const [currentPage, setCurrentPage] = useState(1)
   const [searchParams, setSearchParams] = useSearchParams()

   const showAddCourseModal = searchParams.get(ADD_COURSE)
   const showEditCourseModal = searchParams.get(EDIT_COURSE)
   const showAppointTeacherModal = searchParams.get(APPOINT_TEACHER)
   const showConfirmModal = searchParams.get(DELETE_COURSE)

   useEffect(() => {
      const courseId = searchParams.get('courseId')
      if (courseId) {
         dispatch(getSingleCourse(courseId))
      }
      dispatch(getInstructor())
      dispatch(getAllCourses(currentPage))
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
      if (id) {
         dispatch(getSingleCourse(id))
      }
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
         .unwrap()
         .then(() => {
            showSuccessMessage('Вы удалили курс')
            dispatch(getAllCourses(currentPage))
            closeModal()
         })
         .catch(() => {
            showErrorMessage('Не удалось удалить курс')
         })
   }

   const onChangeHandler = (currentPage) => {
      setSearchParams(`page=${currentPage}`)
      setCurrentPage(currentPage)
      dispatch(getAllCourses(currentPage))
   }

   const closeModal = () => {
      setSearchParams('')
   }

   const options = useMemo(
      () => [
         {
            id: '1',
            action: (id) => assignTeacher(id),
            content: (
               <StyledIcon>
                  <PinIcon />
                  <p>Назначить учителя</p>
               </StyledIcon>
            ),
         },
         {
            id: '2',
            action: (id) => editCourse(id),
            content: (
               <StyledIcon>
                  <EditIcon />
                  <p>Редактировать</p>
               </StyledIcon>
            ),
         },
         {
            id: '3',
            action: (id) => getCourseId(id),
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
      <>
         <AddNewCourse
            isModalOpen={showAddCourseModal}
            closeModal={closeModal}
            addCourseHandler={addCourseHandler}
            currentPage={currentPage}
         />
         {(isLoading && <Spinner />) || (
            <Wrapper>
               <Container>
                  {courses.map((course) => (
                     <Card
                        key={course.id}
                        options={options}
                        image={course.image}
                        title={course.courseName}
                        description={course.description}
                        date={course.dateOfStart}
                        id={course.id}
                        path={`${course.id}/course_instructors`}
                     />
                  ))}
               </Container>

               {instructors && (
                  <AssignTeacher
                     isModalOpen={showAppointTeacherModal}
                     closeModal={closeModal}
                     instructors={instructors}
                     courseTeachers={courseTeachers}
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
                  title={`Вы уверены, что хотите удалить курс ${сourse?.courseName}?`}
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
               {pages > 1 && (
                  <StyledPagination>
                     <Pagination
                        count={pages}
                        page={currentPage}
                        onChange={(_, num) => onChangeHandler(num)}
                     />
                  </StyledPagination>
               )}
            </Wrapper>
         )}
      </>
   )
}

export default Courses

const Wrapper = styled.div`
   position: relative;
`
const StyledPagination = styled.div`
   margin-top: 20px;
`

const Container = styled.div`
   cursor: pointer;
   flex-wrap: wrap;
   grid-row: 30px;
   display: grid;
   grid-template-columns: repeat(4, 1fr);
   grid-column-gap: 30px;
   grid-row-gap: 30px;
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
   margin: 5px 0 10px;
   justify-content: space-between;
`
