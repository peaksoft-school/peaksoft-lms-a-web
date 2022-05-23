import styled from '@emotion/styled/macro'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export const showSuccessMessage = (msg) => toast.success(msg)
export const showErrorMessage = (msg) => toast.error(msg)

export const Notification = () => {
   return (
      <StyledToastContainer
         position="top-right"
         autoClose={3000}
         hideProgressBar
         newestOnTop={false}
         closeOnClick
         rtl={false}
         pauseOnFocusLoss
         draggable
         pauseOnHover
         closeButton={false}
      />
   )
}

const StyledToastContainer = styled(ToastContainer)`
   .Toastify__toast--success {
      background: #36ac0c;
      border-radius: 10px;
      color: #fff;
      svg {
         fill: #fff;
      }
   }
   .Toastify__toast--error {
      background: #c91e1e;
      border-radius: 10px;
      color: #fff;
      svg {
         fill: #fff;
      }
   }
`
