import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import styled from '@emotion/styled'

export const BasicModal = (props) => {
   return (
      <Modal open={props.isModalOpen} onClose={props.onClose}>
         <Box sx={style}>
            <Header>{props.title}</Header>
            <Container>{props.children}</Container>
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
   outline: 'none',
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
   font-family: 'Open Sans', sans-serif;
   font-weight: 400;
   font-size: 20px;
`
const Container = styled.div`
   display: flex;
   flex-direction: column;
   align-items: center;
   padding: 16px 25px 25px 25px;
`
