import styled from '@emotion/styled'
import React, { useState } from 'react'
import { Button } from '../../UI/button/Button'
import { BasicModal } from '../../UI/modal/BasicModal'
import { MultiSelect } from '../../UI/select/MultiSelect'

export const AppointTeacher = (props) => {
   const [selectedOptions, setSelectedOptions] = useState([])

   const newMultiSelect = (selected) => {
      console.log(selected)
   }

   return (
      <div>
         <BasicModal
            title="Назначить учителя"
            isModalOpen={props.isModalOpen}
            handleClose={props.closeHandler}
         >
            <MultiSelect
               options={multiOptions}
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
                  >
                     Добавить
                  </Button>
               </div>
            </BtnStyleControl>
         </BasicModal>
      </div>
   )
}

const multiOptions = [
   { id: '1', name: 'Mavliuda' },
   { id: '2', name: 'Baiyrta' },
   { id: '3', name: 'Aigerim' },
   { id: '4', name: 'Baiaaly' },
]

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
