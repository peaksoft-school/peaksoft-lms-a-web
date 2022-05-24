import React, { useCallback, useEffect, useState } from 'react'
import styled from '@emotion/styled'
import { useDispatch } from 'react-redux'
import { Button } from '../../UI/button/Button'
import { BasicModal } from '../../UI/modal/BasicModal'
import { ImagePicker } from '../../UI/imagePicker/ImagePicker'
import { Input } from '../../UI/input/Input'
import { Datepicker } from '../../UI/datePicker/Datepicker'
import { useInput } from '../../../hooks/usuInput/useInput'
import { addNewCourse, getAllCourses } from '../../../store/courses-slice'
import { ReactComponent as AddIcon } from '../../../assets/icons/plusIcon.svg'

export const AddNewCourse = ({
   closeModal,
   currentPage,
   addCourseHandler,
   isModalOpen,
}) => {
   const dispatch = useDispatch()
   const [selectedFile, setSelectedFile] = useState(null)
   const [file, setFile] = useState(null)
   const [dateValue, setDateValue] = useState(null)
   const [formIsValid, setFormIsValid] = useState(false)

   const { value, onChange, onClear } = useInput({
      courseName: '',
      description: '',
   })

   useEffect(() => {
      setFormIsValid(
         file !== null &&
            value.courseName.length > 0 &&
            dateValue !== null &&
            value.description.length > 0
      )
   }, [value, file, dateValue])

   const dateChangeHandler = (newValue) => {
      setDateValue(newValue)
   }

   const onDrop = useCallback((acceptedFiles) => {
      setSelectedFile(acceptedFiles[0])
      setFile(URL.createObjectURL(acceptedFiles[0]))
   }, [])

   const addNewCourseHandler = () => {
      const newCourse = {
         courseName: value.courseName,
         dateOfStart: dateValue,
         description: value.description,
      }

      dispatch(
         addNewCourse({
            file: selectedFile,
            courseData: newCourse,
            currentPage,
         })
      )

      dispatch(getAllCourses(currentPage))
      onClear()
      setDateValue(null)
      setFile(null)
   }

   return (
      <>
         <StyledButton>
            <span>
               <Button
                  onClick={addCourseHandler}
                  background="#3772FF"
                  bgHover="#1D60FF"
                  bgActive="#6190FF"
               >
                  <AddIcon /> Создать курс
               </Button>
            </span>
         </StyledButton>
         <BasicModal
            isModalOpen={!!isModalOpen}
            title="Создать курс"
            onClose={closeModal}
         >
            <ImagePicker onDrop={onDrop} file={file} />
            <StyledInput>
               <div>
                  <Input
                     placeholder="Название курса"
                     onChange={onChange}
                     value={value.courseName}
                     name="courseName"
                  />
               </div>
               <div>
                  <Datepicker
                     dateValue={dateValue}
                     onChange={dateChangeHandler}
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
                     onClick={closeModal}
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
   svg {
      margin-right: 9px;
   }
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
