import styled from '@emotion/styled'
import { useEffect, useState } from 'react'
import { useInput } from '../../../../hooks/useInput/useInput'
import { Button } from '../../../UI/button/Button'
import { Input } from '../../../UI/input/Input'
import { BasicModal } from '../../../UI/modal/BasicModal'

export const LessonEditModal = ({ showModal, onAdd, onClose, lesson }) => {
   const { value, onChange, onClear } = useInput({
      lessonName: lesson.lessonName || '',
   })

   const [disableButton, setDisableButton] = useState(false)

   const editLesson = () => {
      onAdd(value, onClear)
   }

   useEffect(() => {
      if (value.lessonName.length > 0) {
         setDisableButton(true)
      } else {
         setDisableButton(false)
      }
   }, [value])
   return (
      <BasicModal
         isModalOpen={Boolean(showModal)}
         title="Редактировать урок"
         onClose={onClose}
      >
         <StyledChildrenOfModal>
            <Input
               placeholder="Название урока"
               value={value.lessonName}
               name="lessonName"
               onChange={onChange}
            />
            <StyledModalButtonContainer>
               <Button
                  background="none"
                  border="1px solid #3772FF"
                  color="#3772FF"
                  onClick={onClose}
               >
                  Отмена
               </Button>
               <Button
                  background="#3772FF"
                  bgHover="#1D60FF"
                  bgActive="#6190FF"
                  onClick={editLesson}
                  disabled={!disableButton}
               >
                  Сохранять
               </Button>
            </StyledModalButtonContainer>
         </StyledChildrenOfModal>
      </BasicModal>
   )
}

const StyledChildrenOfModal = styled.div`
   width: 100%;
   height: 103px;
   display: flex;
   flex-direction: column;
   justify-content: space-between;
`
const StyledModalButtonContainer = styled.div`
   width: 100%;
   height: 40px;
   display: flex;
   justify-content: end;
   button {
      margin-left: 10px;
   }
`
