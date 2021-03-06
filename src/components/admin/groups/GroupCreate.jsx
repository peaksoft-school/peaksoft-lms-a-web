import React, { useState, useCallback, useEffect } from 'react'
import { format } from 'date-fns'
import { useDispatch } from 'react-redux'
import styled from '@emotion/styled'
import { Button } from '../../UI/button/Button'
import { BasicModal } from '../../UI/modal/BasicModal'
import { ImagePicker } from '../../UI/imagePicker/ImagePicker'
import { Datepicker } from '../../UI/datePicker/Datepicker'
import { useInput } from '../../../hooks/useInput/useInput'
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
   const [formIsValid, setFormIsValid] = useState(false)

   const { value, onChange, onClear } = useInput({
      groupName: '',
      description: '',
   })

   useEffect(() => {
      setFormIsValid(
         file !== null &&
            value.groupName.length > 0 &&
            dateValue !== null &&
            value.description.length > 0
      )
   }, [value, file, dateValue])

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
            showSuccessMessage('???????????? ?????????????? ??????????????')
            setOpenCreateGroupModal(false)
            onClear()
            setDateValue(null)
            setFile(null)
         })
         .catch(() => {
            showErrorMessage('???? ?????????????? ???????????????? ????????????')
         })
   }

   return (
      <WrapperForButton>
         <span>
            <Button
               style={{ marginLeft: '1026px' }}
               background="#3772FF"
               bgHover="#1D60FF"
               bgActive="#6190FF"
               onClick={createGroupModalHandler}
            >
               + ?????????????? ????????????
            </Button>
         </span>

         {openCreateGroupModal && (
            <BasicModal
               isModalOpen={openCreateGroupModal}
               title="?????????????? ????????????"
               onClose={() => setOpenCreateGroupModal(false)}
            >
               <ImagePicker onDrop={onDrop} file={file} />
               <ModalContentControl>
                  <div>
                     <Input
                        placeholder="???????????????? ??????????"
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
                     placeholder="???????????????? ??????????"
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
                        ????????????
                     </Button>
                  </div>
                  <div>
                     <Button
                        disabled={!formIsValid}
                        onClick={createNewGroupHandler}
                        background="#3772FF"
                        bgHover="#1D60FF"
                        bgActive="#6190FF"
                     >
                        ????????????????
                     </Button>
                  </div>
               </BtnStyleControl>
            </BasicModal>
         )}
      </WrapperForButton>
   )
}
const WrapperForButton = styled.div`
   width: 99.2%;
   display: flex;
   height: 78px;
   align-items: center;
   justify-content: end;
   button {
      margin-top: 18px;
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
