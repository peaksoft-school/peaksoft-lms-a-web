import React, { useState } from 'react'
import styled from '@emotion/styled'
import { BasicModal } from '../UI/BasicModal'
import { Input } from '../UI/Input'
import { Button } from '../UI/Button'
import { MaskedInput } from '../UI/MaskedInput'

export const TeachersPanel = () => {
   const [isModalOpen, setIsOpenModal] = useState(true)
   return (
      <div>
         <BasicModal isModalOpen={isModalOpen} title="Добавить учителя">
            <StyledInput placeholder="Имя" />
            <StyledInput placeholder="Фамилия" />
            <StyledMaskedInput />
            <StyledInput placeholder="Email" />
            <StyledInput placeholder="Пароль" />
            <StyledInput placeholder="Специализация" />
            <div>
               <Button
                  background="none"
                  bgHover="#1D60FF1A"
                  bgActive="#6190FF4D"
                  border="1px solid #1D60FF"
                  color="#3772FF"
               >
                  Отмена
               </Button>
               <Button
                  background="#3772FF"
                  bgHover="#1D60FF"
                  bgActive="#6190FF"
               >
                  Добавить
               </Button>
            </div>
         </BasicModal>
      </div>
   )
}

const StyledInput = styled(Input)`
   margin: 5px;
`
const StyledMaskedInput = styled(MaskedInput)`
   margin: 5px;
`
