import React, { useCallback, useState } from 'react'
import styled from '@emotion/styled'
import { useDispatch } from 'react-redux'
import { Button } from '../../UI/button/Button'
import { BasicModal } from '../../UI/modal/BasicModal'
import { ImagePicker } from '../../UI/imagePicker/ImagePicker'
import { Input } from '../../UI/input/Input'
import { Datepicker } from '../../UI/datePicker/Datepicker'
import useInput from '../../../hooks/useInput'
import { addNewCourse, coursesActions } from '../../../store/coursesSlice'

export const AddNewCourse = () => {
   const dispatch = useDispatch()

   const [isModalOpen, setIsModalOpen] = useState(false)
   const [selectedFile, setSelectedFile] = useState(null)
   const [file, setFile] = useState(null)
   const [dateValue, setDateValue] = useState(null)

   const { value, onChange, onClear } = useInput({
      title: '',
      description: '',
      date: '',
   })

   const dateChangehandler = (newValue) => {
      console.log(newValue)
      setDateValue(newValue.toLocaleDateString())
   }

   const openModalHandler = () => {
      setIsModalOpen(true)
   }

   const handleClose = () => {
      setIsModalOpen(false)
   }

   const onDrop = useCallback((acceptedFiles) => {
      setSelectedFile(acceptedFiles[0])
      setFile(URL.createObjectURL(acceptedFiles[0]))
   }, [])
   console.log(selectedFile)
   console.log(file)
   const addNewCourseHandler = () => {
      // const newCourse = {
      //    description: value.description,
      //    course_name: value.title,
      //    date_of_start: dateValue,
      // }

      const formData = new FormData()
      formData.append('file', selectedFile)

      console.log(formData)
      dispatch(addNewCourse(formData))
      setIsModalOpen(false)
   }
   return (
      <>
         <StyledButton>
            <span>
               <Button
                  onClick={openModalHandler}
                  background="#3772FF"
                  bgHover="#1D60FF"
                  bgActive="#6190FF"
               >
                  + Создать курс
               </Button>
            </span>
         </StyledButton>
         <BasicModal
            isModalOpen={isModalOpen}
            title="Создать курс"
            handleClose={handleClose}
         >
            <ImagePicker onDrop={onDrop} file={file} />
            <StyledInput>
               <div>
                  <Input
                     placeholder="Название курса"
                     onChange={onChange}
                     value={value.title}
                     name="title"
                  />
               </div>
               <div>
                  <Datepicker
                     dateValue={dateValue}
                     onChange={dateChangehandler}
                  />
               </div>
            </StyledInput>
            <StyledTextArea>
               <textarea
                  placeholder="Описание курса"
                  onChange={onChange}
                  value={value.description}
                  name="description"
               />
            </StyledTextArea>
            <ButtonContainer>
               <div>
                  <Button
                     background="none"
                     border="1px solid #3772FF"
                     color="#3772FF"
                     onClick={() => handleClose()}
                  >
                     Отмена
                  </Button>
               </div>
               <div>
                  <Button
                     background="#3772FF"
                     bgHover="#1D60FF"
                     bgActive="#6190FF"
                     onClick={addNewCourseHandler}
                  >
                     Добавить
                  </Button>
               </div>
            </ButtonContainer>
         </BasicModal>
      </>
   )
}

const StyledButton = styled.div`
   display: flex;
   align-items: center;
   justify-content: flex-end;
   height: 80px;
`
const StyledTextArea = styled.div`
   textarea {
      max-width: 100%;
      min-width: 487px;
      height: 123px;
      border-radius: 10px;
      border: ${({ invalid }) =>
         invalid ? '1px solid red' : '1px solid #d4d4d4'};
      outline: none;
      resize: none;
      font-size: 16px;
      font-family: sans-serif;
      padding: 18px;
      :focus {
         outline: none;
         border: 1px solid #1f6ed4;
      }
   }
`
const ButtonContainer = styled.div`
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

const StyledInput = styled.div`
   width: 338px;
   display: flex;
   justify-content: center;
   justify-content: space-between;
   margin: 10px;
   margin-top: 30px;
   margin-left: -140px;
   & Input {
      width: 327px;
   }
`
