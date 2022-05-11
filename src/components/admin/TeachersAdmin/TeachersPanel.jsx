import React, { useRef, useState } from 'react'
import styled from '@emotion/styled'
import { BasicModal } from '../../UI/BasicModal'
import { Input } from '../../UI/Input'
import { Button } from '../../UI/Button'
import { MaskedInput } from '../../UI/MaskedInput'
import { useInput } from '../../../hooks/useInput/useInput'

export const TeachersPanel = () => {
   const nodeRef = useRef(null)
   const [isModalOpen, setIsOpenModal] = useState(false)
   const { value, onChange } = useInput({
      firstName: '',
      lastName: '',
      number: '',
      email: '',
      password: '',
      specialization: '',
   })
   return (
      <>
         <Button
            background="#3772FF"
            bgHover="#1D60FF"
            bgActive="#6190FF"
            onClick={() => setIsOpenModal(true)}
         >
            + Добавить учителя
         </Button>
         {isModalOpen && (
            <BasicModal isModalOpen={isModalOpen} title="Добавить учителя">
               <form ref={nodeRef}>
                  <StyledInput
                     placeholder="Имя"
                     type="text"
                     name="firstName"
                     value={value.firstName}
                     onChange={onChange}
                  />
                  <StyledInput
                     placeholder="Фамилия"
                     type="text"
                     name="lastName"
                     value={value.lastName}
                     onChange={onChange}
                  />
                  <StyledMaskedInput
                     name="number"
                     value={value.number}
                     onChange={onChange}
                  />
                  <StyledInput
                     placeholder="Email"
                     type="email"
                     name="email"
                     value={value.email}
                     onChange={onChange}
                  />
                  <StyledInput
                     placeholder="Пароль"
                     type="password"
                     name="password"
                     value={value.password}
                     onChange={onChange}
                  />
                  <StyledInput
                     placeholder="Специализация"
                     type="text"
                     name="specialization"
                     value={value.specialization}
                     onChange={onChange}
                  />
                  <StyledButton>
                     <div>
                        <Button
                           background="none"
                           bgHover="#1D60FF1A"
                           bgActive="#6190FF4D"
                           border="1px solid #1D60FF"
                           color="#3772FF"
                           onClick={() => setIsOpenModal(false)}
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
                  </StyledButton>
               </form>
            </BasicModal>
         )}
      </>
   )
}

const StyledInput = styled(Input)`
   margin: 5px;
`
const StyledMaskedInput = styled(MaskedInput)`
   margin: 5px;
`
const StyledButton = styled.div`
   display: flex;
   justify-content: end;
   width: 100%;
   margin-top: 16px;
   div {
      width: 240px;
      display: flex;
      justify-content: space-around;
   }
`
