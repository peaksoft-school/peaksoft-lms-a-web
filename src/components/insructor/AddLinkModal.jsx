import React, { useState } from 'react'
import styled from '@emotion/styled'
import { useDispatch } from 'react-redux'
import { Input } from '../UI/input/Input'
import { BasicModal } from '../UI/modal/BasicModal'
import { Button } from '../UI/button/Button'
import { addLinkToLesson } from '../../store/INSTRUCTOR/linkSlice'
import {
   showErrorMessage,
   showSuccessMessage,
} from '../UI/notification/Notification'
import { useInput } from '../../hooks/usuInput/useInput'

export const AddLinkModal = () => {
   const dispatch = useDispatch()
   const [openAddingLinkModal, setOpenAddingLinkModal] = useState(true)

   const { value, onChange, onClear } = useInput({
      text: '',
      link: '',
   })
   const addLinkToLessonHandler = () => {
      const newLinkData = {
         lessonId: 1,
         text: value.text,
         link: value.link,
      }
      dispatch(addLinkToLesson(newLinkData))
         .unwrap()
         .then(() => {
            showSuccessMessage('Ссылка успешно добавленна')
            setOpenAddingLinkModal(false)
            onClear()
         })
         .catch(() => {
            showErrorMessage('Не удалось добавить ссылку')
         })
   }

   return (
      <div>
         <BasicModal isModalOpen={openAddingLinkModal} title="Добавить ссылку">
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
                     onClick={addLinkToLessonHandler}
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
