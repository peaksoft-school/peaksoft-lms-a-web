import React, { useState } from 'react'
import styled from '@emotion/styled'
import { Card } from '../UI/Card'
import { Button } from '../UI/Button'
import { BasicModal } from '../UI/BasicModal'
import { ImagePicker } from '../UI/ImagePicker'
import { Input } from '../UI/Input'
import DatepickerUi from '../UI/DatePickerUi'

export const GroupsPanel = (props) => {
   const [openCreateGroupModal, setOpenCreateGroupModal] = useState(false)
   const [dateValue, setDateValue] = useState(null)

   const dateChangehandler = (newValue) => {
      setDateValue(newValue)
   }

   const createGroupModalHandler = () => {
      setOpenCreateGroupModal(true)
   }
   return (
      <div>
         <Button
            style={{ marginLeft: '960px' }}
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
               <ImagePicker />
               <ModalContentControl>
                  <div>
                     <Input placeholder="Название курса" />
                  </div>
                  <div>
                     <DatepickerUi
                        dateValue={dateValue}
                        onChange={dateChangehandler}
                     />
                  </div>
               </ModalContentControl>
               <ModalContentControlTwo>
                  <textarea placeholder="Описание курса" />
               </ModalContentControlTwo>
               <BtnStyleControl>
                  <div>
                     <Button
                        background="none"
                        border="1px solid #3772FF"
                        color="#3772FF"
                        onClick={() => setOpenCreateGroupModal(false)}
                     >
                        Отмена
                     </Button>
                  </div>
                  <div>
                     <Button
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
         <CardContentStyleControl>
            <Card options={props.options} />
            <Card options={props.options} />
            <Card options={props.options} />
            <Card options={props.options} />
            <Card options={props.options} />
            <Card options={props.options} />
            <Card options={props.options} />
            <Card options={props.options} />
            <Card options={props.options} />
            <Card options={props.options} />
            <Card options={props.options} />
            <Card options={props.options} />
            <Card options={props.options} />
         </CardContentStyleControl>
      </div>
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

const CardContentStyleControl = styled.div`
   width: 270px;
   display: grid;
   grid-template-columns: repeat(4, 1fr);
   grid-column-gap: 20px;
   grid-row-gap: 20px;
`
