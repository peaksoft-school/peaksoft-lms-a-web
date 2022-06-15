import React, { useEffect } from 'react'
import styled from '@emotion/styled'
import { useDispatch, useSelector } from 'react-redux'
import { BasicModal } from '../../../../UI/modal/BasicModal'
import { Input } from '../../../../UI/input/Input'
import { Button } from '../../../../UI/button/Button'
import { useInput } from '../../../../../hooks/useInput/useInput'
import {
   updateSingleLink,
   getSingleLink,
} from '../../../../../store/INSTRUCTOR/linkSlice'
import {
   showErrorMessage,
   showSuccessMessage,
} from '../../../../UI/notification/Notification'

export const LinkEdit = ({ onClose, showEditLinkModal, id }) => {
   const dispatch = useDispatch()
   const { oneSingleLink } = useSelector((state) => state.link)

   const { value, onChange, onClear, setValue } = useInput({
      text: (oneSingleLink && oneSingleLink?.text) || '',
      link: (oneSingleLink && oneSingleLink?.link) || '',
   })

   useEffect(() => {
      if (id) {
         dispatch(getSingleLink(id))
      }
   }, [])

   const saveUpdatedLink = () => {
      const linkUpdateInfo = {
         text: value.text,
         link: value.link,
      }

      dispatch(updateSingleLink({ linkUpdateInfo, id: oneSingleLink.id }))
         .unwrap()
         .then(() => {
            showSuccessMessage('Вы редактировали ссылку')
            onClose()
            onClear()
         })
         .catch(() => {
            showErrorMessage('Не удалось редактировать ссылку')
         })
   }

   useEffect(() => {
      setValue({ link: oneSingleLink?.link, text: oneSingleLink?.text })
   }, [oneSingleLink])

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
                  onClick={saveUpdatedLink}
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
