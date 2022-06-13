import React, { useState, useCallback } from 'react'
import { format } from 'date-fns'
import styled from '@emotion/styled'
import { useDispatch } from 'react-redux'
import { BasicModal } from '../../UI/modal/BasicModal'
import { Button } from '../../UI/button/Button'
import { ImagePicker } from '../../UI/imagePicker/ImagePicker'
import { Datepicker } from '../../UI/datePicker/Datepicker'
import { Input } from '../../UI/input/Input'
import { useInput } from '../../../hooks/useInput/useInput'
import { groupsPagination, updateSingleGroup } from '../../../store/groupSlice'
import {
   showErrorMessage,
   showSuccessMessage,
} from '../../UI/notification/Notification'

const GroupEdit = (props) => {
   const dispatch = useDispatch()
   const { groupName, description, dateOfStart, image, id } = props.singleGroup

   const [file, setFile] = useState(image)
   const [dateValue, setDateValue] = useState(dateOfStart)
   const [selectedFile, setSelectedFile] = useState(null)

   const { value, onChange, onClear } = useInput({
      groupName: groupName || '',
      description: description || '',
   })

   const dateChangehandler = (newValue) => {
      setDateValue(newValue)
   }
   const onDrop = useCallback((acceptedFiles) => {
      setFile(URL.createObjectURL(acceptedFiles[0]))
      setSelectedFile(acceptedFiles[0])
   }, [])

   const result = format(Date.now(dateValue), 'yyyy-MM-dd')

   const saveEditGroupHandler = () => {
      const updateInfo = {
         groupName: value.groupName,
         dateOfStart: result,
         description: value.description,
         id,
      }
      dispatch(
         updateSingleGroup({
            file: selectedFile,
            image,
            groupUpdateInfo: updateInfo,
         })
      )
         .unwrap()
         .then(() => {
            showSuccessMessage('Изменения успешно сохранены')
            dispatch(groupsPagination(props.page))

            onClear()
            setDateValue(null)
            setFile(null)
            props.setOpenEditGroupModal(false)
         })
         .catch(() => {
            showErrorMessage('Не удалось изменить данные')
         })
   }
   return (
      <BasicModal
         isModalOpen={props.openEditGroupModal}
         title="Редактировать группу"
      >
         <ImagePicker name="image" onDrop={onDrop} file={file} />
         <ModalContentControl>
            <div>
               <Input
                  name="groupName"
                  value={value.groupName}
                  onChange={onChange}
               />
            </div>
            <div>
               <Datepicker
                  name="dateOfStart"
                  dateValue={dateValue}
                  onChange={dateChangehandler}
               />
            </div>
         </ModalContentControl>
         <ModalContentControlTwo>
            <textarea
               name="description"
               value={value.description}
               onChange={onChange}
            />
         </ModalContentControlTwo>
         <BtnStyleControl>
            <div>
               <Button
                  background="none"
                  border="1px solid #3772FF"
                  color="#3772FF"
                  bgHover="rgba(29, 96, 255, 0.1)"
                  bgActive="rgba(97, 144, 255, 0.3)"
                  onClick={() => props.setOpenEditGroupModal(false)}
               >
                  Отмена
               </Button>
            </div>
            <div>
               <Button
                  onClick={saveEditGroupHandler}
                  background="#3772FF"
                  bgHover="#1D60FF"
                  bgActive="#6190FF"
               >
                  Сохранить
               </Button>
            </div>
         </BtnStyleControl>
      </BasicModal>
   )
}
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
export default GroupEdit
