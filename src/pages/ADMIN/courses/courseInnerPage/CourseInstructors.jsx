import React, { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import styled from '@emotion/styled'
import { useDispatch, useSelector } from 'react-redux'
import { BreadCrumbs } from '../../../../components/UI/breadCrumb/BreadCrumbs'
import { AppTable } from '../../../../components/UI/table/AppTable'
import { baseFetch } from '../../../../api/baseFetch'
import { Button } from '../../../../components/UI/button/Button'
import { ReactComponent as PinIcon } from '../../../../assets/icons/pinnedIcon.svg'
import {
   APPOINT_TEACHER,
   COURSE_INSTRUCTORS,
} from '../../../../utils/constants/general'
import { BasicModal } from '../../../../components/UI/modal/BasicModal'
import { MultiSelect } from '../../../../components/UI/select/MultiSelect'
import {
   assignTeacherToCourse,
   getInstructor,
} from '../../../../store/courses-slice'
import { showErrorMessage } from '../../../../components/UI/notification/Notification'
import { localStorageHelper } from '../../../../utils/helpers/general'

export const CourseInstructors = () => {
   const params = useParams()
   const dispatch = useDispatch()

   const { instructors, courses } = useSelector((state) => state.courses)

   const [searchParams, setSearchParams] = useSearchParams()

   const [teachers, setTeachers] = useState([])
   const [selectedOptions, setSelectedOptions] = useState([])
   const [listOfTeacher, setListOfTeacher] = useState([])
   const [selectedTeacher, setSelectedTeacher] = useState('')
   const [selectIsValid, setSelectIsValid] = useState(false)

   const showAppointTeacherModal = searchParams.get(APPOINT_TEACHER)

   const courseName = localStorageHelper.laod('course')

   useEffect(() => {
      getCourseTeachers()
      dispatch(getInstructor())

      courses.filter((el) => {
         if (el.id == params.id) {
            localStorageHelper.store('course', el.courseName)
         }
         return el
      })
   }, [])

   const getCourseTeachers = async () => {
      try {
         const response = await baseFetch({
            path: `api/courses/teachers/${params.id}`,
            method: 'GET',
         })
         setTeachers(response)
      } catch (error) {
         showErrorMessage(error)
      }
   }

   const newMultiSelect = (selected) => {
      setListOfTeacher((prev) => [...prev, Number(selected.id)])
      setSelectedTeacher(selected.fullName)
   }

   const appointTeacher = () => {
      dispatch(getInstructor())
      dispatch(
         assignTeacherToCourse({
            courseId: params.id,
            instructorId: listOfTeacher,
         })
      )
      closeModal()
      setSelectedOptions([])
   }

   useEffect(() => {
      getCourseTeachers()
   }, [appointTeacher])

   useEffect(() => {
      setSelectIsValid(selectedOptions.length > 0)
   }, [selectedOptions])

   const assignTeacher = () => {
      dispatch(getInstructor())
      setSearchParams({
         [APPOINT_TEACHER]: true,
         teacherId: params.id,
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
         name: courseName,
      },
      {
         path: '/instructors',
         name: 'Учителя',
      },
   ]
   const options = instructors.map((instructor) => {
      return {
         id: instructor.id,
         title: instructor.fullName,
      }
   })
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
         <BasicModal
            title="Назначить учителя"
            isModalOpen={showAppointTeacherModal}
            onClose={closeModal}
         >
            <MultiSelect
               title={selectedTeacher}
               options={options}
               onSelected={newMultiSelect}
               selectedOptions={selectedOptions}
               setSelectedOptions={setSelectedOptions}
            />
            <BtnStyleControl>
               <div>
                  <Button
                     background="none"
                     border="1px solid #3772FF"
                     color="#3772FF"
                     onClick={() => closeModal()}
                  >
                     Отмена
                  </Button>
               </div>
               <div>
                  <Button
                     background="#3772FF"
                     bgHover="#1D60FF"
                     bgActive="#6190FF"
                     onClick={appointTeacher}
                     disabled={!selectIsValid}
                  >
                     Добавить
                  </Button>
               </div>
            </BtnStyleControl>
         </BasicModal>
         <AppTable columns={COURSE_INSTRUCTORS} data={teachers} />
      </div>
   )
}

const StyledButton = styled.div`
   display: flex;
   align-items: flex-end;
   justify-content: space-between;
   margin-top: -25px;
   margin-bottom: 25px;
   & svg {
      margin-right: 8px;
   }
`
const BtnStyleControl = styled.div`
   width: 100%;
   display: flex;
   justify-content: flex-end;
   margin-top: 10px;
   margin-bottom: 1px;
   padding: 1px;
   button {
      margin-left: 10px;
   }
`
const StyledSpan = styled.span`
   height: 30px;
   display: flex;
   align-items: center;
`
