import React from 'react'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContentText from '@mui/material/DialogContentText'
import styled from '@emotion/styled'

export const ConfirmModal = (props) => {
   return (
      <DialogWrapper open={props.isConfirmModalOpen}>
         <DialogStyle>{props.title}</DialogStyle>
         <ButtonStyle>
            <button type="button" onClick={props.onModalClose}>
               {props.cancelDeleteButton}
            </button>
            <button type="button" onClick={props.onConfirmDelete}>
               {props.confirmDeleteButton}
            </button>
         </ButtonStyle>
      </DialogWrapper>
   )
}

const DialogWrapper = styled(Dialog)`
   .MuiDialog-paper {
      border-radius: 10px;
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
