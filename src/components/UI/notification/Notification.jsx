import styled from '@emotion/styled/macro'
import { Alert, Snackbar } from '@mui/material'

export const Notification = (props) => {
   return (
      <Snackbar
         open={props.open}
         autoHideDuration={3000}
         onClose={props.onClose}
         anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
         }}
      >
         <StyledAlert variant="filled" severity={props.status}>
            <StyledMessage>{props.message}</StyledMessage>
         </StyledAlert>
      </Snackbar>
   )
}

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
