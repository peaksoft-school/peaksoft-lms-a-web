import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import { useDispatch } from 'react-redux'
import { BasicModal } from '../../UI/modal/BasicModal'
import { ReactComponent as Search } from '../../../assets/icons/search.svg'
import { Button } from '../../UI/button/Button'
import { useDebounce } from '../../../hooks/useDebounce/useDebounce'
import { searchStudentsByName } from '../../../store/instructor-courses'

export const AddStudent = ({ isModalOpen, onClose, students, onAdd }) => {
   const dispatch = useDispatch()
   const [name, setName] = useState('')

   const searchStudents = useDebounce(searchStudentsHandler, 600)

   function searchStudentsHandler() {
      if (name !== '') {
         dispatch(searchStudentsByName(name))
      }
   }

   useEffect(() => {
      searchStudents()
   }, [searchStudents])

   const addStudents = (id) => {
      onAdd(id)
   }

   return (
      <BasicModal
         isModalOpen={Boolean(isModalOpen)}
         onClose={onClose}
         title="Добавить студента в курс"
      >
         <StyledSearch>
            <StyledSearchIcon />
            <input
               placeholder="Введите имя студента"
               type="text"
               onChange={(e) => setName(e.target.value)}
            />
         </StyledSearch>
         <StyledUl>
            {students.map((el) => (
               <li key={el.id}>
                  <p>{el.fullName}</p>
                  <Button
                     color="#3772FF"
                     background="none"
                     onClick={() => addStudents(el.id)}
                  >
                     Добавить
                  </Button>
               </li>
            ))}
         </StyledUl>
      </BasicModal>
   )
}

const StyledSearch = styled.div`
   display: flex;
   align-items: center;
   width: 491px;
   height: 42px;
   border: 1px solid #d4d4d4;
   border-radius: 10px;
   :hover {
      border: 1px solid #1f6ed4;
   }
   input {
      border: none;
      outline: none;
      width: 398px;
      font-size: 16px;
      padding: 5px;
   }
`
const StyledSearchIcon = styled(Search)`
   margin: 20px;
`
const StyledUl = styled.ul`
   display: flex;
   flex-direction: column;
   width: 491px;
   max-height: 180px;
   padding: 10px;
   overflow-y: scroll;
   ::-webkit-scrollbar {
      width: 8px;
   }
   ::-webkit-scrollbar-track {
      box-shadow: inset 0 0 5px #3772ff;
      border-radius: 10px;
   }
   ::-webkit-scrollbar-thumb {
      background: #3772ff;
      border-radius: 10px;
   }
   ::-webkit-scrollbar-thumb:hover {
      background: #3772ff;
   }
   p {
      font-size: 18px;
      margin-left: 20px;
   }
   li {
      list-style: none;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #c4c4c4;
   }
`
