import styled from '@emotion/styled'
import { Button } from '../../../UI/button/Button'
import ConfirmModal from '../../../UI/modal/ConfirmModal'

export const ConfirmModalOnDelete = ({ showModal, onClose, onDelete }) => {
   return (
      <ConfirmModal
         title="Вы уверены, что хотите удалить урок ... ?"
         isConfirmModalOpen={Boolean(showModal)}
         closeConfirmModal={onClose}
      >
         <StyledButton>
            <Button
               background="none"
               border="1px solid #3772FF"
               color="#3772FF"
               onClick={onClose}
            >
               Отмена
            </Button>
            <Button
               background="#C91E1E"
               bgHover="#B62727"
               bgActive="#E13A3A"
               onClick={onDelete}
            >
               Удалить
            </Button>
         </StyledButton>
      </ConfirmModal>
   )
}
const StyledButton = styled.div`
   width: 241px;
   display: flex;
   justify-content: space-between;
`
