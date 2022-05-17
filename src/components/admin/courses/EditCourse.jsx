import styled from '@emotion/styled'
import React, { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useInput } from '../../../hooks/usuInput/useInput'
import { editCourse } from '../../../store/coursesSlice'
import { Button } from '../../UI/button/Button'
import { Datepicker } from '../../UI/datePicker/Datepicker'
import { ImagePicker } from '../../UI/imagePicker/ImagePicker'
import { Input } from '../../UI/input/Input'
import { BasicModal } from '../../UI/modal/BasicModal'

export const EditCourse = ({
   course,
   isEditModalOpen,
   closeEditModalHandler,
}) => {
   const dispatch = useDispatch()
   const courses = useSelector((state) => state.courses.course)
   const [dateValue, setDateValue] = useState(null)
   const [file, setFile] = useState(null)

   const dateChangehandler = (newValue) => {
      setDateValue(course.dateOfStart || newValue)
   }

   const { value, onChange, onClear } = useInput({
      courseName: course.courseName || '',
      description: course.description || '',
   })
   const onDrop = useCallback((acceptedFiles) => {
      setFile(course.image || URL.createObjectURL(acceptedFiles[0]))
   }, [])
   console.log(course.id)
   return (
      <div>
         <BasicModal
            isModalOpen={isEditModalOpen}
            title="Создать курс"
            handleClose={closeEditModalHandler}
         >
            <ImagePicker onDrop={onDrop} file={course.image || file} />
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
                     dateValue={course.dateOfStart && dateValue}
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
                     onClick={() => closeEditModalHandler()}
                  >
                     Отмена
                  </Button>
               </div>
               <div>
                  <Button
                     onClick={() => dispatch(editCourse(course.id))}
                     background="#3772FF"
                     bgHover="#1D60FF"
                     bgActive="#6190FF"
                  >
                     Добавить
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
