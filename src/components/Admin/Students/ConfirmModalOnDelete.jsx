import styled from '@emotion/styled'
import { Button } from '../../UI/button/Button'
import ConfirmModal from '../../UI/modal/ConfirmModal'

export const ConfirmModalOnDelete = ({
   showConfirmModal,
   closeConfirmModal,
   deleteStudentHandler,
}) => {
   return (
      <ConfirmModal
         title="Вы уверены, что хотите удалить студента ... ?"
         isConfirmModalOpen={Boolean(showConfirmModal)}
         closeConfirmModal={closeConfirmModal}
      >
         <StyledButton>
            <Button
               background="none"
               border="1px solid #3772FF"
               color="#3772FF"
               onClick={closeConfirmModal}
            >
               Отмена
            </Button>
            <Button
               background="#C91E1E"
               bgHover="#B62727"
               bgActive="#E13A3A"
               onClick={deleteStudentHandler}
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
