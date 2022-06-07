import styled from '@emotion/styled'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useInput } from '../../../../hooks/usuInput/useInput'
import { EDIT_PRESENTATION } from '../../../../utils/constants/general'
import { Button } from '../../../UI/button/Button'
import { Input } from '../../../UI/input/Input'
import { BasicModal } from '../../../UI/modal/BasicModal'

export const PresentationForm = ({
   showModal,
   onEdit,
   onAdd,
   onClose,
   presentation,
}) => {
   const { value, onChange, onClear } = useInput({
      presentationName: (presentation && presentation?.presentationName) || '',
      description: (presentation && presentation?.description) || '',
   })

   const [searchParams, setSearchParams] = useSearchParams()

   const editModal = searchParams.get(EDIT_PRESENTATION)

   const [disableButton, setDisableButton] = useState(false)
   const [selectedFile, setSelectedFile] = useState('')

   const editPresentation = () => {
      const presentationId = searchParams.get('presentationId')
      const lessonId = searchParams.get('lessonId')
      if (editModal) {
         onEdit(value, selectedFile, presentationId, onClear)
      } else {
         onAdd(value, selectedFile, lessonId, onClear)
      }
   }

   const uploadFileHandler = (e) => {
      const file = e.target.files[0]
      setSelectedFile(file)
   }

   useEffect(() => {
      if (value.presentationName.length > 0 && value.description.length > 0) {
         setDisableButton(true)
      } else {
         setDisableButton(false)
      }
   }, [value])

   return (
      <BasicModal
         isModalOpen={Boolean(showModal)}
         title={
            editModal ? 'Редактировать презентацию' : 'Добавить презентацию'
         }
         onClose={onClose}
      >
         <StyledChildrenOfModal>
            <Input
               placeholder="Введите название презентации"
               value={value.presentationName}
               name="presentationName"
               onChange={onChange}
            />
            <Input
               placeholder="Введите описание презентации"
               value={value.description}
               name="description"
               onChange={onChange}
            />
            <StyledUploadInputDiv>
               <Input
                  placeholder="Выберите файл в формате ppt"
                  value={selectedFile.name}
                  onChange={onChange}
               />
               <StyledUploadInput>
                  <label htmlFor="upload">Обзор...</label>
                  <input
                     type="file"
                     id="upload"
                     onChange={uploadFileHandler}
                     accept="ppt/*"
                  />
               </StyledUploadInput>
            </StyledUploadInputDiv>
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
                  onClick={editPresentation}
                  disabled={!disableButton}
               >
                  {editModal ? 'Сохранить' : 'Добавить'}
               </Button>
            </StyledModalButtonContainer>
         </StyledChildrenOfModal>
      </BasicModal>
   )
}

const StyledChildrenOfModal = styled.div`
   width: 100%;
   height: 212px;
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
const StyledUploadInput = styled.div`
   label {
      font-family: 'Open Sans';
      font-style: normal;
      font-weight: 500;
      font-size: 15px;
      line-height: 20px;
      letter-spacing: 0.8px;
      color: #3772ff;
      width: 110px;
      height: 42px;
      border: 1px solid #3772ff;
      color: #3772ff;
      border-radius: 8px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      margin-left: 12px;
      background: rgba(26, 35, 126, 0.07);
   }
   input[type='file'] {
      display: none;
   }
`
const StyledUploadInputDiv = styled.div`
   width: 100%;
   height: 42px;
   display: flex;
   justify-content: center;
   align-items: center;
`
