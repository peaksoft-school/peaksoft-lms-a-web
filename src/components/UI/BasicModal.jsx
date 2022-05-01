import * as React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import styled from '@emotion/styled'

function BasicModal(props) {
   return (
      <Modal
         isModalOpen={props.isModalOpen}
         onModalClose={props.modalClosehandler}
      >
         <Box sx={style}>
            <Header>{props.title}</Header>
            <InputContent>{props.children}</InputContent>
            <Footer>
               <button type="button">{props.cancelButton}</button>
               <button type="button">{props.confirmButton}</button>
            </Footer>
         </Box>
      </Modal>
   )
}
const style = {
   position: 'absolute',
   top: '50%',
   left: '50%',
   transform: 'translate(-50%, -50%)',
   width: '541px',
   bgcolor: 'background.paper',
   boxShadow: 24,
   borderRadius: '10px',
}
const Header = styled(Typography)`
   background: #3772ff;
   color: #ffffff;
   display: flex;
   align-items: center;
   justify-content: center;
   height: 68px;
   -moz-border-radius-topleft: 10px;
   -moz-border-radius-topright: 10px;
   border-top-left-radius: 10px;
   border-top-right-radius: 10px;
   font-family: 'Open Sans';
   font-weight: 400;
   font-size: 20px;
`
const InputContent = styled(Typography)`
   display: flex;
   flex-direction: column;
   align-items: center;
   padding: 10px 8px 10px 18px;
   margin-top: 20px;
`
const Footer = styled(Typography)`
   display: flex;
   justify-content: flex-end;
   padding: 40px;
`
export default BasicModal
