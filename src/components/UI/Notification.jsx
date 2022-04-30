import styled from '@emotion/styled/macro'
import { Alert } from '@mui/material'

export const Notification = (props) => {
   return (
      <Container>
         <StyledAlert variant="filled" severity={props.status}>
            <StyledMessage>{props.message}</StyledMessage>
         </StyledAlert>
      </Container>
   )
}
const Container = styled.div`
   display: flex;
   flex-direction: row;
   align-items: center;
   animation: 3s slide-right;
   @keyframes slide-right {
      from {
         margin-left: -100%;
      }
      to {
         margin-left: 0%;
      }
   }
   .MuiAlert-filledSuccess {
      background-color: #36ac0c;
   }
   .MuiAlert-filledError {
      background-color: #c91e1e;
   }
`
const StyledAlert = styled(Alert)`
   border-radius: 12px;
   padding: 15px 28px;
`

const StyledMessage = styled.p`
   font-family: 'Open Sans', sans-serif;
   font-style: normal;
   font-weight: 400;
   font-size: 16px;
   line-height: 22px;
   color: #ffffff;
`
