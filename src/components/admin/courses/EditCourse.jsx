import styled from '@emotion/styled'
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useInput } from '../../../hooks/useInput/useInput'
import { getAllCourses, onEditCourse } from '../../../store/courses-slice'
import { Button } from '../../UI/button/Button'
import { Datepicker } from '../../UI/datePicker/Datepicker'
import { ImagePicker } from '../../UI/imagePicker/ImagePicker'
import { Input } from '../../UI/input/Input'
import { BasicModal } from '../../UI/modal/BasicModal'
import {
   showErrorMessage,
   showSuccessMessage,
} from '../../UI/notification/Notification'

export const EditCourse = ({
   сourse,
   isModalOpen,
   closeModal,
   currentPage,
}) => {
   const { courseName, dateOfStart, description, image } = сourse

   const dispatch = useDispatch()
   const [dateValue, setDateValue] = useState(dateOfStart)
   const [file, setFile] = useState(image)
   const [selectedFile, setSelectedFile] = useState(null)
   const [formIsValid, setFormIsValid] = useState(false)

   const { value, onChange, onClear } = useInput({
      courseName: courseName || '',
      description: description || '',
   })
   useEffect(() => {
      setFormIsValid(
         file !== null &&
            value.courseName.length > 0 &&
            dateValue !== null &&
            value.description.length > 0
      )
   }, [value, file, dateValue])

   const dateChangehandler = (newValue) => {
      setDateValue(newValue)
   }

   const onDrop = useCallback((acceptedFiles) => {
      setSelectedFile(acceptedFiles[0])

      setFile(URL.createObjectURL(acceptedFiles[0]))
   }, [])

   const onEdit = () => {
      const course = {
         courseName: value.courseName,
         dateOfStart: dateValue,
         description: value.description,
         id: сourse.id,
      }

      dispatch(onEditCourse({ file: selectedFile, image, course, currentPage }))
         .unwrap()
         .then(() => {
            showSuccessMessage('Изменения успешно сохранены')
            dispatch(getAllCourses(currentPage))
            onClear()
            setDateValue(null)
            setFile(null)
            closeModal()
         })
         .catch(() => {
            showErrorMessage('Не удалось изменить данные')
         })
   }

   return (
      <div>
         <BasicModal
            isModalOpen={isModalOpen}
            title="Редактировать курс"
            onClose={closeModal}
         >
            <ImagePicker onDrop={onDrop} file={file} />
            <ModalContentControl>
               <div>
                  <Input
                     placeholder="Название курса"
                     value={value.courseName}
                     onChange={onChange}
                     name="courseName"
                  />
               </div>
               <div>
                  <Datepicker
                     dateValue={dateValue}
                     onChange={dateChangehandler}
                  />
               </div>
            </ModalContentControl>
            <ModalContentControlTwo>
               <textarea
                  placeholder="Описание курса"
                  value={value.description}
                  onChange={onChange}
                  name="description"
               />
            </ModalContentControlTwo>
            <BtnStyleControl>
               <div>
                  <Button
                     background="none"
                     border="1px solid #3772FF"
                     color="#3772FF"
                     onClick={() => closeModal()}
                  >
                     Отмена
                  </Button>
               </div>
               <div>
                  <Button
                     disabled={!formIsValid}
                     onClick={onEdit}
                     background="#3772FF"
                     bgHover="#1D60FF"
                     bgActive="#6190FF"
                  >
                     Сохранить
                  </Button>
               </div>
            </BtnStyleControl>
         </BasicModal>
      </div>
   )
}

const ModalContentControlTwo = styled.div`
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

const ModalContentControl = styled.div`
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
