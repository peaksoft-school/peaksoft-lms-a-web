import styled from '@emotion/styled'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { assignTeacherToCourse } from '../../../store/courses-slice'
import { Button } from '../../UI/button/Button'
import { BasicModal } from '../../UI/modal/BasicModal'
import { MultiSelect } from '../../UI/select/MultiSelect'

export const AssignTeacher = ({ instructors, id, closeModal, isModalOpen }) => {
   const dispatch = useDispatch()
   const [selectedOptions, setSelectedOptions] = useState([])
   const [listOfTeacher, setListOfTeacher] = useState([])
   const [selectedTeacher, setSelectedTeacher] = useState('')
   const [selectIsValid, setSelectIsValid] = useState(false)

   const newMultiSelect = (selected) => {
      setListOfTeacher((prev) => [...prev, Number(selected.id)])
      setSelectedTeacher(selected.name)
   }

   const appointTeacher = () => {
      dispatch(
         assignTeacherToCourse({
            courseId: id,
            instructorId: listOfTeacher,
         })
      )
      closeModal()
   }

   const options = [
      instructors.map((teacher) => {
         return {
            id: teacher.id,
            name: teacher.fullName,
         }
      }),
   ]

   useEffect(() => {
      setSelectIsValid(selectedOptions.length > 0)
   }, [selectedOptions])

   return (
      <BasicModal
         title="Назначить учителя"
         isModalOpen={!!isModalOpen}
         onClose={closeModal}
      >
         <MultiSelect
            title={selectedTeacher}
            options={options[0]}
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
   )
}

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
