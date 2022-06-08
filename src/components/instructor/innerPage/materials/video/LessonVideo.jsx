import styled from '@emotion/styled'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { useInput } from '../../../../../hooks/usuInput/useInput'
import { addVideo } from '../../../../../store/video-slice'
import { ADD_VIDEO } from '../../../../../utils/constants/general'
import { Button } from '../../../../UI/button/Button'
import { Input } from '../../../../UI/input/Input'
import { BasicModal } from '../../../../UI/modal/BasicModal'
import {
   showErrorMessage,
   showSuccessMessage,
} from '../../../../UI/notification/Notification'

export const LessonVideo = ({ isModalOpen, closeModals }) => {
   const dispatch = useDispatch()
   const [searchParams, setSearchParams] = useSearchParams()
   const [formIsValid, setFormIsValid] = useState(false)
   const { value, onChange, onClear } = useInput({
      title: '',
      description: '',
      link: '',
   })

   const AddVideoLesson = () => {
      const lessonId = searchParams.get('lessonId')
      const video = {
         videoName: value.title,
         description: value.description,
         videoLink: value.link,
      }
      dispatch(addVideo({ video, lessonId }))
         .unwrap()
         .then(() => {
            showSuccessMessage('Видеоурок успешно добавлен')
            setSearchParams({ [ADD_VIDEO]: false })
            closeModals()
            onClear()
         })
         .catch(() => {
            showErrorMessage('Не удалось добавить видеоурок')
         })
   }
   useEffect(() => {
      setFormIsValid(
         value.title.length > 0 &&
            value.description.length > 0 &&
            value.link.length > 0
      )
   }, [value])
   return (
      <div>
         <BasicModal
            isModalOpen={Boolean(isModalOpen)}
            onClose={closeModals}
            title="Добавить видеоурок"
         >
            <InputStyleControl>
               <div>
                  <Input
                     placeholder="Введите название видеоурока"
                     name="title"
                     value={value.title}
                     onChange={onChange}
                  />
               </div>
               <div>
                  <Input
                     placeholder="Введите описание видеурока"
                     name="description"
                     value={value.description}
                     onChange={onChange}
                  />
               </div>
               <div>
                  <Input
                     placeholder="Вставьте ссылку на видеоурок"
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
                     onClick={closeModals}
                  >
                     Отмена
                  </Button>
               </div>
               <div>
                  <Button
                     disabled={!formIsValid}
                     background="#3772FF"
                     bgHover="#1D60FF"
                     bgActive="#6190FF"
                     onClick={AddVideoLesson}
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
