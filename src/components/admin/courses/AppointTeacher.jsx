import styled from '@emotion/styled'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { appointTeacherToCourse } from '../../../store/coursesSlice'
import { Button } from '../../UI/button/Button'
import { BasicModal } from '../../UI/modal/BasicModal'
import { MultiSelect } from '../../UI/select/MultiSelect'

export const AppointTeacher = (props) => {
   const dispatch = useDispatch()
   const [selectedOptions, setSelectedOptions] = useState([])
   const [listOfTeacher, setListOfTeacher] = useState([])
   const [selectedTeacher, setSelectedTeacher] = useState('')

   const newMultiSelect = (selected) => {
      setListOfTeacher((prev) => [...prev, selected.id])
      setSelectedTeacher(selected.name)
   }
   const options = [
      props.teachers.map((teacher) => {
         return {
            id: teacher.id,
            name: teacher.fullName,
         }
      }),
   ]
   console.log(props.id)
   const appointTeacher = () => {
      dispatch(
         appointTeacherToCourse({
            courseId: props.id,
            instructorId: listOfTeacher,
         })
      )
   }
   console.log(listOfTeacher)
   return (
      <div>
         <BasicModal
            title="Назначить учителя"
            isModalOpen={props.isModalOpen}
            handleClose={props.closeHandler}
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
                     onClick={() => props.closeHandler()}
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
                  >
                     Добавить
                  </Button>
               </div>
            </BtnStyleControl>
         </BasicModal>
      </div>
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
const option = [{ id: '1', name: 'Baya' }]
