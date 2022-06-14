import React from 'react'
import ConfirmModal from '../../UI/modal/ConfirmModal'
import { Button } from '../../UI/button/Button'

const GroupDeleteConfirm = (props) => {
   return (
      <ConfirmModal
         title="Вы уверены, что хотите удалить группу ... ?"
         isConfirmModalOpen={props.isModalOpen}
         closeConfirmModal={() => props.setIsModalOpen(false)}
      >
         <Button
            onClick={() => props.setIsModalOpen(false)}
            background="none"
            border="1px solid #3772FF"
            color="#3772FF"
            bgHover="rgba(29, 96, 255, 0.1)"
            bgActive="rgba(97, 144, 255, 0.3)"
         >
            Отмена
         </Button>
         <Button
            onClick={props.deletingModalHandler}
            background="#C91E1E"
            bgHover="#B62727"
            bgActive="#E13A3A"
         >
            Удалить
         </Button>
      </ConfirmModal>
   )
}

export default GroupDeleteConfirm
