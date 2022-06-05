import styled from '@emotion/styled'
import React from 'react'
import { useDispatch } from 'react-redux'
import { useInput } from '../../../../../hooks/usuInput/useInput'
import { addVideo } from '../../../../../store/video-slice'
import { Button } from '../../../../UI/button/Button'
import { Input } from '../../../../UI/input/Input'
import { BasicModal } from '../../../../UI/modal/BasicModal'

export const LessonVideo = ({ isModalOpen, closeModals, lessonId }) => {
   const dispatch = useDispatch()
   const { value, onChange, clear } = useInput(
      {
         title: '',
         description: '',
         link: '',
      },
      lessonId
   )

   const AddVideoLesson = () => {
      const video = {
         videoName: value.title,
         description: value.description,
         videoLink: value.link,
      }
      dispatch(addVideo({ video, lessonId }))
      closeModals()
      clear()
   }
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
