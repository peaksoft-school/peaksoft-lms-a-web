import React, { useState } from 'react'
import styled from '@emotion/styled'
import { Input } from '../UI/input/Input'
import { BasicModal } from '../UI/modal/BasicModal'
import { Button } from '../UI/button/Button'

export const AddLinkModal = () => {
   const [openAddingLinkModal, setOpenAddingLinkModal] = useState(true)
   return (
      <div>
         <BasicModal isModalOpen={openAddingLinkModal} title="Добавить ссылку">
            <InputStyleControl>
               <div>
                  <Input placeholder="Отображаемый текст" name="linkText" />
               </div>
               <div>
                  <Input placeholder="Вставьте ссылку" name="link" />
               </div>
            </InputStyleControl>

            <BtnStyleControl>
               <div>
                  <Button
                     background="none"
                     border="1px solid #3772FF"
                     color="#3772FF"
                     bgHover="rgba(29, 96, 255, 0.1)"
                     bgActive="rgba(97, 144, 255, 0.3)"
                     onClick={() => setOpenAddingLinkModal(false)}
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
const InputStyleControl = styled.div`
   & Input {
      margin: 12px;
      width: 491px;
   }
`
