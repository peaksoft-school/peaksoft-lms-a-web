import * as React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import styled from '@emotion/styled'

export default function ConfirmModal(props) {
   return (
      <Modal open={props.isConfirmModalOpen} onClose={props.closeConfirmModal}>
         <Box sx={style}>
            <TitleStyle id="modal-modal-title" variant="h6" component="h2">
               {props.title}
            </TitleStyle>
            <ButtonStyle id="modal-modal-description">
               {props.children}
            </ButtonStyle>
         </Box>
      </Modal>
   )
}
const style = {
   position: 'absolute',
   top: '50%',
   left: '50%',
   transform: 'translate(-50%, -50%)',
   width: '315px',
   height: '145px',
   bgcolor: 'background.paper',
   boxShadow: 24,
   p: 4,
   borderRadius: '10px',
   outline: 'none',
}

const TitleStyle = styled(Typography)`
   color: #1f1c1c;
   font-size: 17px;
   line-height: 22px;
   text-align: center;
`
const ButtonStyle = styled(Typography)`
<<<<<<< HEAD
   display: flex;
   align-items: center;
   justify-content: space-between;
=======
   border-radius: 10px;
   display: flex;
   align-items: center;
   justify-content: space-around;
>>>>>>> 346b8abe0dbc75dfa928315eb4d11f32bc2c844d
   margin: 10px;
`
