import React from 'react'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContentText from '@mui/material/DialogContentText'
import styled from '@emotion/styled'
import { Button } from './Button'

export const ConfirmModal = (props) => {
   return (
      <DialogWrapper open={props.isConfirmModalOpen}>
         <DialogStyle>{props.title}</DialogStyle>
         <ButtonStyle>
            <Button
               background="none"
               bgHover="#1D60FF1A"
               bgActive="#6190FF4D"
               border="1px solid #1D60FF"
               color="#3772FF"
               onClick={props.onModalClose}
            >
               {props.cancelDeleteButton}
               Отмена
            </Button>
            <Button
               background="#C91E1E"
               bgHover="#B62727"
               bgActive="#E13A3A"
               onClick={props.onConfirmDelete}
            >
               {props.confirmDeleteButton}
               Удалить
            </Button>
         </ButtonStyle>
      </DialogWrapper>
   )
}

const DialogWrapper = styled(Dialog)`
   .MuiDialog-paper {
      border-radius: 10px;
      margin: 0;
   }
   width: 315px;
   background: white;
   border-radius: 10px;
   font-family: 'Open Sans';
   font-style: normal;
   font-weight: 400;
   margin: 0 auto;
   padding: 18px;
`
const DialogStyle = styled(DialogContentText)`
   border-radius: 10px;
   color: #1f1c1c;
   font-size: 16px;
   line-height: 22px;
   text-align: center;
   margin: 20px;
`
const ButtonStyle = styled(DialogActions)`
   border-radius: 10px;
   display: flex;
   align-items: center;
   justify-content: center;
   margin-bottom: 10px;
`
