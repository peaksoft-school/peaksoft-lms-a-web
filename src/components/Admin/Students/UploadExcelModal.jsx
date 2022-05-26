import styled from '@emotion/styled'
import { useEffect, useState } from 'react'
import { useInput } from '../../../hooks/usuInput/useInput'
import { Button } from '../../UI/button/Button'
import { Input } from '../../UI/input/Input'
import { BasicModal } from '../../UI/modal/BasicModal'
import { Select } from '../../UI/select/Select'

export const UploadExcel = ({ onUpload, onClose, showModal, groups }) => {
   const { value, onChange, onClear } = useInput({ group: '' })

   const [disableButton, setDisableButton] = useState(false)
   const [selectedFile, setSelectedFile] = useState('')
   const [selectedOption, setSelectedOption] = useState('')

   const uploadStudents = () => {
      onUpload(selectedOption, selectedFile)
      onClear()
      setSelectedFile('')
   }

   const uploadStudentsAsExcelFileHandler = (e) => {
      const excelFile = e.target.files[0]
      setSelectedFile(excelFile)
   }

   const seletedOptionHandler = (option) => {
      setSelectedOption(option.id)
   }

   useEffect(() => {
      if (value.group.length > 0) {
         setDisableButton(true)
      } else {
         setDisableButton(false)
      }
   }, [value])
   return (
      <BasicModal
         isModalOpen={showModal}
         title="Импорт Excel в БД"
         onClose={onClose}
      >
         <StyledChildrenOfModal>
            <Select
               options={groups}
               selectedOption={seletedOptionHandler}
               placeholder="Группа"
               name="group"
               value={value.group}
               onChange={onChange}
            />
            <StyledUploadInputDiv>
               <Input
                  placeholder="Выберите Excel файл для импорта"
                  value={selectedFile.name}
                  onChange={onChange}
               />
               <StyledUploadInput>
                  <label htmlFor="upload">Обзор...</label>
                  <input
                     type="file"
                     id="upload"
                     onChange={uploadStudentsAsExcelFileHandler}
                  />
               </StyledUploadInput>
            </StyledUploadInputDiv>

            <StyledModalButtonContainer>
               <Button
                  background="none"
                  border="1px solid #3772FF"
                  color="#3772FF"
                  onClick={() => {
                     onClose()
                     setSelectedFile('')
                  }}
               >
                  Отмена
               </Button>
               <Button
                  background="#3772FF"
                  bgHover="#1D60FF"
                  bgActive="#6190FF"
                  onClick={uploadStudents}
                  disabled={!disableButton}
               >
                  Добавить
               </Button>
            </StyledModalButtonContainer>
         </StyledChildrenOfModal>
      </BasicModal>
   )
}
const StyledChildrenOfModal = styled.div`
   width: 100%;
   height: 197px;
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
