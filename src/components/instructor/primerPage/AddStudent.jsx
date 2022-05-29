import React from 'react'
import styled from '@emotion/styled'
import { BasicModal } from '../../UI/modal/BasicModal'
import { ReactComponent as Search } from '../../../assets/icons/search.svg'
import { Button } from '../../UI/button/Button'

export const AddStudent = ({ isModalOpen, onClose, students }) => {
   return (
      <BasicModal
         isModalOpen={Boolean(isModalOpen)}
         onClose={onClose}
         title="Добавить студента в курс"
      >
         <StyledSearch>
            <StyledSearchIcon />
            <input placeholder="Введите имя студента" />
         </StyledSearch>
         <StyledUl>
            {students.map((el) => (
               <li key={el.id}>
                  <p>{el.fullName}</p>
                  <Button color="#3772FF" background="none">
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
   padding: 2px;
   p {
      font-size: 18px;
      margin-left: 20px;
   }
   li {
      list-style: none;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 2px solid #c4c4c4;
   }
`
