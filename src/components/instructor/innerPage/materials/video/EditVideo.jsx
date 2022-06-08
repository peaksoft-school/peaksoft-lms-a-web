import styled from '@emotion/styled'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useInput } from '../../../../../hooks/usuInput/useInput'
import { editVideo, getSingleVideo } from '../../../../../store/video-slice'
import { Button } from '../../../../UI/button/Button'
import { Input } from '../../../../UI/input/Input'
import { BasicModal } from '../../../../UI/modal/BasicModal'
import {
   showErrorMessage,
   showSuccessMessage,
} from '../../../../UI/notification/Notification'

export const EditVideo = ({ isModalOpen, closeModals, id }) => {
   const dispatch = useDispatch()
   const { singleVideo } = useSelector((state) => state.video)

   const { value, onChange, onClear, setValue } = useInput({
      title: (singleVideo && singleVideo?.videoName) || '',
      description: (singleVideo && singleVideo?.description) || '',
      link: (singleVideo && singleVideo?.videoLink) || '',
   })

   useEffect(() => {
      dispatch(getSingleVideo(id))
   }, [])

   const AddUpdatedVideoLesson = () => {
      const video = {
         videoName: value.title,
         description: value.description,
         videoLink: value.link,
      }
      dispatch(editVideo({ video, id: singleVideo.id }))
         .unwrap()
         .then(() => {
            showSuccessMessage('Изменения успешно сохранены')
            closeModals()
            onClear()
         })
         .catch(() => {
            showErrorMessage('Не удалось изменить данные')
         })
   }
   useEffect(() => {
      setValue({
         title: singleVideo?.videoName,
         description: singleVideo?.description,
         link: singleVideo?.videoLink,
      })
   }, [singleVideo])
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
                     background="#3772FF"
                     bgHover="#1D60FF"
                     bgActive="#6190FF"
                     onClick={AddUpdatedVideoLesson}
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
