import React, { useState, useCallback } from 'react'
import { format } from 'date-fns'
import { useDispatch } from 'react-redux'
import styled from '@emotion/styled'
import { Button } from '../../UI/button/Button'
import { BasicModal } from '../../UI/modal/BasicModal'
import { ImagePicker } from '../../UI/imagePicker/ImagePicker'
import { Datepicker } from '../../UI/datePicker/Datepicker'
import { useInput } from '../../../hooks/usuInput/useInput'
import { Input } from '../../UI/input/Input'
import { addNewGroup } from '../../../store/groupSlice'
import {
   showErrorMessage,
   showSuccessMessage,
} from '../../UI/notification/Notification'

const GroupCreate = (props) => {
   const dispatch = useDispatch()

   const [openCreateGroupModal, setOpenCreateGroupModal] = useState(false)
   const [file, setFile] = useState(null)
   const [dateValue, setDateValue] = useState(null)
   const [selectedFile, setSelectedFile] = useState(null)

   const { value, onChange, onClear } = useInput({
      groupName: '',
      description: '',
   })

   const createGroupModalHandler = () => {
      setOpenCreateGroupModal(true)
   }

   const dateChangehandler = (newValue) => {
      setDateValue(newValue)
   }
   const onDrop = useCallback((acceptedFiles) => {
      setFile(URL.createObjectURL(acceptedFiles[0]))
      setSelectedFile(acceptedFiles[0])
   }, [])

   const result = format(Date.now(dateValue), 'yyyy-MM-dd')

   const createNewGroupHandler = () => {
      const newGroup = {
         groupName: value.groupName,
         dateOfStart: result,
         description: value.description,
         page: props.page,
      }
      dispatch(
         addNewGroup({
            groupData: newGroup,
            file: selectedFile,
         })
      )
         .unwrap()
         .then(() => {
            showSuccessMessage('Группа успешно создана')
            setOpenCreateGroupModal(false)
            onClear()
         })
         .catch(() => {
            showErrorMessage('Не удалось добавить группу')
         })
   }

   return (
      <WrapperForButton>
         <Button
            style={{ marginLeft: '1026px' }}
            background="#3772FF"
            bgHover="#1D60FF"
            bgActive="#6190FF"
            onClick={createGroupModalHandler}
         >
            + Создать группу
         </Button>
         {openCreateGroupModal && (
            <BasicModal
               isModalOpen={openCreateGroupModal}
               title="Создать группу"
            >
               <ImagePicker onDrop={onDrop} file={file} />
               <ModalContentControl>
                  <div>
                     <Input
                        placeholder="Название курса"
                        value={value.groupName}
                        onChange={onChange}
                        name="groupName"
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
                        bgHover="rgba(29, 96, 255, 0.1)"
                        bgActive="rgba(97, 144, 255, 0.3)"
                        onClick={() => setOpenCreateGroupModal(false)}
                     >
                        Отмена
                     </Button>
                  </div>
                  <div>
                     <Button
                        onClick={createNewGroupHandler}
                        background="#3772FF"
                        bgHover="#1D60FF"
                        bgActive="#6190FF"
                     >
                        Добавить
                     </Button>
                  </div>
               </BtnStyleControl>
            </BasicModal>
         )}
      </WrapperForButton>
   )
}
const WrapperForButton = styled.div`
   width: 100%;
   display: flex;
   justify-content: end;
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
export default GroupCreate
