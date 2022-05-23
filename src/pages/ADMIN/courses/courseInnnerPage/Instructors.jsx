import React, { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import styled from '@emotion/styled'
import { useDispatch, useSelector } from 'react-redux'
import { BreadCrumbs } from '../../../../components/UI/breadCrumb/BreadCrumbs'
import { AppTable } from '../../../../components/UI/table/AppTable'
import { baseFetch } from '../../../../api/baseFetch'
import { Button } from '../../../../components/UI/button/Button'
import { ReactComponent as PinIcon } from '../../../../assets/icons/pinnedIcon.svg'
import { APPOINT_TEACHER } from '../../../../utils/constants/general'
import { BasicModal } from '../../../../components/UI/modal/BasicModal'
import { MultiSelect } from '../../../../components/UI/select/MultiSelect'
import { assignTeacherToCourse } from '../../../../store/courses-slice'

export const Instructors = () => {
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
   const [course, setCourse] = useState('')

   useEffect(() => {
      courses.filter((el) => {
         if (el.id == params.id) {
            setCourse(el.courseName)
         }
         return el
      })
   }, [])

   const newMultiSelect = (selected) => {
      setListOfTeacher((prev) => [...prev, Number(selected.id)])
      setSelectedTeacher(selected.fullName)
   }

   const appointTeacher = () => {
      dispatch(
         assignTeacherToCourse({
            courseId: params.id,
            instructorId: listOfTeacher,
         })
      )
      closeModal()
   }

   useEffect(() => {
      setSelectIsValid(selectedOptions.length > 0)
   }, [selectedOptions])

   const assignTeacher = () => {
      setSearchParams({
         [APPOINT_TEACHER]: true,
         teacherId: params.id,
      })
   }

   const closeModal = () => {
      setSearchParams(false)
   }
   useEffect(() => {
      getCourseTeachers()
   }, [])

   const getCourseTeachers = async () => {
      try {
         const response = await baseFetch({
            path: `api/courses/teachers/${params.id}`,
            method: 'GET',
         })
         setTeachers(response)
      } catch (error) {
         console.log(error)
      }
   }
   const pathsArray = [
      {
         path: 'admin/courses',
         name: 'курсы',
      },
      {
         path: 'id1',
         name: course,
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
                  <PinIcon /> Назначить учителя
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
               options={instructors}
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
         <AppTable columns={COLUMNS} data={teachers} />
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

const COLUMNS = [
   {
      id: 1,
      title: 'ID',
      accessKey: 'id',
   },
   {
      id: 2,
      title: 'Имя Фамилия',
      accessKey: 'fullName',
   },
   {
      id: 3,
      title: 'Специализация',
      accessKey: 'specialization',
   },
   {
      id: 4,
      title: 'Номер телефона',
      accessKey: 'phoneNumber',
   },
   {
      id: 5,
      title: 'E-mail',
      accessKey: 'email',
   },
]
