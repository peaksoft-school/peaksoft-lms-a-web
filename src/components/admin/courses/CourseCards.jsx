import React, { useState, useCallback } from 'react'
import styled from '@emotion/styled'
import { useSelector } from 'react-redux'
import { Card } from '../../UI/card/Card'
import { ReactComponent as PinIcon } from '../../../assets/icons/pinnedIcon.svg'
import { ReactComponent as EditIcon } from '../../../assets/icons/edit.svg'
import { ReactComponent as TrashIcon } from '../../../assets/icons/trashIcon.svg'
import { BasicModal } from '../../UI/modal/BasicModal'
import { MultiSelect } from '../../UI/select/MultiSelect'
import { Button } from '../../UI/button/Button'
import ConfirmModal from '../../UI/modal/ConfirmModal'
import { ImagePicker } from '../../UI/imagePicker/ImagePicker'
import { Input } from '../../UI/input/Input'
import { Datepicker } from '../../UI/datePicker/Datepicker'

export const CourseCards = () => {
   const cards = useSelector((state) => state.courses)
   const [isModalOpen, setIsModalOpen] = useState(false)
   const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)
   const [isEditModalOpen, setIsEditModalOpen] = useState(false)
   const [file, setFile] = useState(null)
   const [selectedOptions, setSelectedOptions] = useState([])
   const [dateValue, setDateValue] = useState(null)

   const options = [
      {
         id: '1',
         action: () => setIsModalOpen(true),
         content: (
            <StyledIcon>
               <PinIcon />
               <p>Назначить учителя</p>
            </StyledIcon>
         ),
      },
      {
         id: '2',
         action: () => setIsEditModalOpen(true),
         content: (
            <StyledIcon>
               <EditIcon />
               <p>Редактировать</p>
            </StyledIcon>
         ),
      },
      {
         id: '3',
         action: () => setIsConfirmModalOpen(true),
         content: (
            <StyledIcon>
               <TrashIcon />
               <p>Удалить</p>
            </StyledIcon>
         ),
      },
   ]
   const dateChangehandler = (newValue) => {
      setDateValue(newValue)
   }
   const newMultiSelect = (selected) => {
      console.log(selected)
   }
   const closeModalHandler = () => {
      setIsModalOpen(false)
   }
   const closeConfirmModalHandler = () => {
      setIsConfirmModalOpen(false)
   }
   const closeEditModalHandler = () => {
      setIsEditModalOpen(false)
   }
   const onDrop = useCallback((acceptedFiles) => {
      setFile(URL.createObjectURL(acceptedFiles[0]))
   }, [])

   return (
      <div>
         <Container>
            {cards.map((card) => (
               <StyledCard key={card.id}>
                  <Card
                     options={options}
                     image={card.image}
                     title={card.title}
                     description={card.description}
                     date={card.date}
                  />
               </StyledCard>
            ))}
         </Container>
         <BasicModal
            title="Назначить учителя"
            isModalOpen={isModalOpen}
            handleClose={closeModalHandler}
         >
            <MultiSelect
               options={multiOptions}
               onSelected={newMultiSelect}
               selectedOptions={selectedOptions}
               setSelectedOptions={setSelectedOptions}
            />
            <BtnStyleControl>
               <div>
                  <Button
                     background="none"
                     border="1px solid #3772FF"
                     color="#3772FF"
                     onClick={() => closeModalHandler()}
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
         <ConfirmModal
            isConfirmModalOpen={isConfirmModalOpen}
            closeConfirmModal={closeConfirmModalHandler}
            title="Вы уверены, что хотите удалить группу ... ?"
         >
            <StyledButton>
               <Button
                  background="none"
                  border="1px solid #3772FF"
                  color="#3772FF"
                  onClick={() => closeConfirmModalHandler()}
               >
                  Отмена
               </Button>
               <Button
                  background="#C91E1E"
                  bgHover="#B62727"
                  bgActive="#E13A3A"
               >
                  Удалить
               </Button>
            </StyledButton>
         </ConfirmModal>
         <BasicModal
            isModalOpen={isEditModalOpen}
            title="Создать курс"
            handleClose={closeEditModalHandler}
         >
            <ImagePicker onDrop={onDrop} file={file} />
            <ModalContentControl>
               <div>
                  <Input placeholder="Название курса" />
               </div>
               <div>
                  <Datepicker
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
                     onClick={() => closeEditModalHandler()}
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
      </div>
   )
}

const StyledCard = styled.div`
   width: 270px;
`
const Container = styled.div`
   display: flex;
   flex-wrap: wrap;
   gap: 40px;
`
const StyledIcon = styled.div`
   display: flex;
   & p {
      margin-left: 8px;
   }
`

const StyledButton = styled.div`
   width: 241px;
   display: flex;
   justify-content: space-between;
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

const multiOptions = [
   { id: '1', name: 'Mavliuda' },
   { id: '2', name: 'Baiyrta' },
   { id: '3', name: 'Aigerim' },
   { id: '4', name: 'Baiaaly' },
]
