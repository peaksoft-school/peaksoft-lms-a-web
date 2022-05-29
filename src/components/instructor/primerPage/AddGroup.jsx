import styled from '@emotion/styled'
import React, { useState } from 'react'
import { useInput } from '../../../hooks/usuInput/useInput'
import { Button } from '../../UI/button/Button'
import { BasicModal } from '../../UI/modal/BasicModal'
import { Select } from '../../UI/select/Select'

export const AddGroup = ({ isModalOpen, onClose, groups, onAdd }) => {
   const { value, onChange, onClear } = useInput({
      group: '',
   })

   const addGroups = () => {
      onAdd(value, selectedOption, onClear)
   }
   const [selectedOption, setSelectedOption] = useState('')

   const selectedOptionHandler = (option) => {
      setSelectedOption(option.id)
   }

   return (
      <BasicModal
         isModalOpen={Boolean(isModalOpen)}
         onClose={onClose}
         title="Добавить студентов группы в курс"
      >
         <Select
            options={groups}
            placeholder="Группа"
            name="group"
            value={value.group}
            selectedOption={selectedOptionHandler}
            onChange={onChange}
         />
         <StyledModalButton>
            <div>
               <Button
                  background="none"
                  border="1px solid #3772FF"
                  color="#3772FF"
                  onClick={onClose}
               >
                  Отмена
               </Button>
               <Button
                  background="#3772FF"
                  bgHover="#1D60FF"
                  bgActive="#6190FF"
                  onClick={addGroups}
               >
                  Добавить
               </Button>
            </div>
         </StyledModalButton>
      </BasicModal>
   )
}

const StyledModalButton = styled.div`
   display: flex;
   justify-content: end;
   width: 100%;
   margin-top: 16px;
   div {
      width: 245px;
      display: flex;
      justify-content: space-around;
   }
`
