import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import { Tooltip } from '@mui/material'
import { useDispatch } from 'react-redux'
import uuid from 'react-uuid'
import { Input } from '../../../UI/input/Input'
import { BasicModal } from '../../../UI/modal/BasicModal'
import { Button } from '../../../UI/button/Button'
import { ReactComponent as LinkIcon } from '../../../../assets/icons/linkIcon.svg'
import { useInput } from '../../../../hooks/useInput/useInput'
import { taskActions } from '../../../../store/task-slice'
import { LINK } from '../../../../utils/constants/general'

export const AddLinkModal = () => {
   const dispatch = useDispatch()
   const [modalIsOpen, setModalIsOpen] = useState(false)
   const [formIsValid, setFormIsValid] = useState(false)

   const { value, onChange, onClear } = useInput({
      name: '',
      value: '',
   })

   useEffect(() => {
      setFormIsValid(value.name.length > 0 && value.value.length > 0)
   }, [value])

   const addLink = () => {
      dispatch(
         taskActions.addTask({
            taskType: LINK,
            name: value.name,
            value: value.value,
            id: uuid(),
         })
      )
      setModalIsOpen(false)
      onClear()
   }
   return (
      <div>
         <StyledTooltip title="Вставить ссылку" placement="top">
            <StyledIcon onClick={() => setModalIsOpen(true)}>
               <LinkIcon />
            </StyledIcon>
         </StyledTooltip>
         <BasicModal isModalOpen={modalIsOpen} title="Добавить ссылку">
            <InputStyleControl>
               <div>
                  <Input
                     placeholder="Отображаемый текст"
                     name="name"
                     onChange={onChange}
                     value={value.name}
                  />
               </div>
               <div>
                  <Input
                     placeholder="Вставьте ссылку"
                     name="value"
                     onChange={onChange}
                     value={value.value}
                  />
               </div>
            </InputStyleControl>
            <BtnStyleControl>
               <div>
                  <Button
                     background="none"
                     border="1px solid #3772FF"
                     color="#3772FF"
                     bgHover="rgba(29, 96, 255, 0.1)"
                     bgActive="rgba(97, 144, 255, 0.3)"
                     onClick={() => setModalIsOpen(false)}
                  >
                     Отмена
                  </Button>
               </div>
               <div>
                  <Button
                     background="#3772FF"
                     bgHover="#1D60FF"
                     bgActive="#6190FF"
                     onClick={addLink}
                     disabled={!formIsValid}
                  >
                     Добавить
                  </Button>
               </div>
            </BtnStyleControl>
         </BasicModal>
      </div>
   )
}
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
const InputStyleControl = styled.div`
   & Input {
      margin: 12px;
      width: 491px;
   }
`

const StyledTooltip = styled(({ className, ...props }) => (
   <Tooltip {...props} classes={{ popper: className }} />
))`
   & .MuiTooltip-tooltip {
      background: #8d949e;
      border-radius: 8px;
      height: 28px;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      padding: 6px 8px;
      gap: 10px;
   }
`
const StyledIcon = styled.div`
   width: 34px;
   height: 28px;
   display: flex;
   align-items: center;
   justify-content: center;
   & input {
      display: none;
   }
   &:hover {
      background: #d4d4d4;
      border-radius: 6px;
   }
`
