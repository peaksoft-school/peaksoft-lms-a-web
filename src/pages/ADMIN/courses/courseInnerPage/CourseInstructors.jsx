import React, { useEffect } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import styled from '@emotion/styled'
import { useDispatch, useSelector } from 'react-redux'
import { BreadCrumbs } from '../../../../components/UI/BreadCrumb/BreadCrumbs'
import { AppTable } from '../../../../components/UI/table/AppTable'
import { Button } from '../../../../components/UI/button/Button'
import { ReactComponent as PinIcon } from '../../../../assets/icons/pinnedIcon.svg'
import {
   APPOINT_TEACHER,
   COURSE_INSTRUCTORS,
} from '../../../../utils/constants/general'
import {
   getCourseTeachers,
   getInstructor,
   getSingleCourse,
} from '../../../../store/courses-slice'
import { AssignTeacher } from '../../../../components/admin/courses/AssignTeacher'

export const CourseInstructors = () => {
   const { id } = useParams()
   const dispatch = useDispatch()

   const { instructors, сourse, courseTeachers } = useSelector(
      (state) => state.courses
   )
   const [searchParams, setSearchParams] = useSearchParams()

   const showAppointTeacherModal = searchParams.get(APPOINT_TEACHER)
   useEffect(() => {
      dispatch(getCourseTeachers(id))
      dispatch(getInstructor())
      dispatch(getSingleCourse(id))
   }, [])

   const assignTeacher = () => {
      dispatch(getInstructor())
      setSearchParams({
         [APPOINT_TEACHER]: true,
         teacherId: id,
      })
   }

   const closeModal = () => {
      setSearchParams(false)
   }

   const pathsArray = [
      {
         path: 'admin/courses',
         name: 'курсы',
      },
      {
         path: 'courses',
         name: сourse?.courseName,
      },
      {
         path: '/instructors',
         name: 'Учителя',
      },
   ]

   return (
      <div>
         <StyledButton>
            <BreadCrumbs pathsArray={pathsArray} />
            <span>
               <Button
                  onClick={assignTeacher}
                  background="#3772FF"
                  bgHover="#1D60FF"
                  bgActive="#6190FF"
               >
                  <StyledSpan>
                     <PinIcon /> Назначить учителя
                  </StyledSpan>
               </Button>
            </span>
         </StyledButton>
         {instructors && (
            <AssignTeacher
               isModalOpen={showAppointTeacherModal}
               closeModal={closeModal}
               instructors={instructors}
               courseTeachers={courseTeachers}
               id={id}
            />
         )}
         <AppTable columns={COURSE_INSTRUCTORS} data={courseTeachers} />
      </div>
   )
}

const StyledButton = styled.div`
   display: flex;
   align-items: flex-end;
   justify-content: space-between;
   margin-top: -45px;
   margin-bottom: 25px;
   & svg {
      margin-right: 8px;
   }
`

const StyledSpan = styled.span`
   height: 30px;
   display: flex;
   align-items: center;
`
