import React, { useCallback, useState } from 'react'
import styled from '@emotion/styled'
import { Button } from '../../UI/button/Button'
import { BasicModal } from '../../UI/modal/BasicModal'
import { ImagePicker } from '../../UI/imagePicker/ImagePicker'
import { Input } from '../../UI/input/Input'
import { Datepicker } from '../../UI/datePicker/Datepicker'
import useInput from '../../../hooks/useInput'
import { BASE_URL } from '../../../utils/constants/general'
import { baseFetch } from '../../../api/baseFetch'

export const AddNewCourse = () => {
   const [isModalOpen, setIsModalOpen] = useState(false)
   const [selectedFile, setSelectedFile] = useState(null)
   const [dateValue, setDateValue] = useState(null)
   const { value, onChange, onClear } = useInput({
      title: '',
      description: '',
   })

   const dateChangehandler = (newValue) => {
      setDateValue(newValue)
   }

   const openModalHandler = () => {
      setIsModalOpen(true)
   }

   const handleClose = () => {
      setIsModalOpen(false)
   }

   const onDrop = useCallback((acceptedFiles) => {
      // setFile(URL.createObjectURL(acceptedFiles[0]))
      setSelectedFile(acceptedFiles[0])
   }, [])

   const handleSubmission = () => {
      const formData = new FormData()
      formData.append('file', selectedFile)
      // eslint-disable-next-line consistent-return
      const postFile = async () => {
         try {
            const response = await baseFetch({
               path: 'api/file',
               method: 'POST',
               body: formData,
            })
            return response
         } catch (error) {
            console.log(error)
         }
      }
      postFile()
      // fetch(`${BASE_URL}/api/file`, {
      //    method: 'POST',
      //    body: formData,
      // })
      //    .then((response) => response.json())
      //    .then((result) => {
      //       console.log('success', result)
      //    })
      //    .catch((error) => {
      //       console.log('error', error)
      //    })
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
            <ImagePicker onDrop={onDrop} file={selectedFile} />
            <ModalContentControl>
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
            </ModalContentControl>
            <ModalContentControlTwo>
               <textarea
                  placeholder="Описание курса"
                  onChange={onChange}
                  value={value.description}
                  name="description"
               />
            </ModalContentControlTwo>
            <BtnStyleControl>
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
                     onClick={() => handleSubmission()}
                  >
                     Добавить
                  </Button>
               </div>
            </BtnStyleControl>
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
