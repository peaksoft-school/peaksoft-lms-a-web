import React, { useState } from 'react'
import styled from '@emotion/styled'
import { useDispatch } from 'react-redux'
// import { useSearchParams } from 'react-router-dom'
import { BasicModal } from '../../../UI/modal/BasicModal'
import { Input } from '../../../UI/input/Input'
import { Button } from '../../../UI/button/Button'
import { useInput } from '../../../../hooks/usuInput/useInput'
import { updateSingleLink } from '../../../../store/INSTRUCTOR/linkSlice'
import {
   showErrorMessage,
   showSuccessMessage,
} from '../../../UI/notification/Notification'

export const LinkEdit = ({
   oneSingleLink,
   // linkId,
   onClose,
   showEditLinkModal,
}) => {
   //    console.log(linkId)
   const dispatch = useDispatch()
   const [linkID, setLinkID] = useState()

   const { value, onChange, onClear } = useInput({
      text: oneSingleLink.text || '',
      link: oneSingleLink.link || '',
   })

   const getLinkId = (id) => {
      setLinkID(id)
   }

   const editLinkHandler = () => {
      saveUpdatedLink(value, onClear)
      getLinkId()
   }

   const saveUpdatedLink = (value) => {
      dispatch(updateSingleLink({ linkUpdateInfo: value, id: linkID }))
         .unwrap()
         .then(() => {
            showSuccessMessage('Вы редактировали ссылку')
            onClose()
         })
         .catch(() => {
            showErrorMessage('Не удалось редактировать ссылку')
         })
   }
   return (
      <BasicModal
         isModalOpen={Boolean(showEditLinkModal)}
         onClose={onClose}
         title="Редактировать ссылку"
      >
         <InputStyleControl>
            <div>
               <Input
                  placeholder="Отображаемый текст"
                  name="text"
                  value={value.text}
                  onChange={onChange}
               />
            </div>
            <div>
               <Input
                  placeholder="Вставьте ссылку"
                  name="link"
                  value={value.link}
                  onChange={onChange}
                  type="url"
                  id="link"
               />
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
                  onClick={onClose}
               >
                  Отмена
               </Button>
            </div>
            <div>
               <Button
                  background="#3772FF"
                  bgHover="#1D60FF"
                  bgActive="#6190FF"
                  onClick={editLinkHandler}
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
const InputStyleControl = styled.div`
   & Input {
      margin: 12px;
      width: 491px;
   }
`
