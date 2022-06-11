import React from 'react'
import { useDispatch } from 'react-redux'
import ConfirmModal from '../../../../UI/modal/ConfirmModal'
import { Button } from '../../../../UI/button/Button'
import { deleteLink } from '../../../../../store/INSTRUCTOR/linkSlice'

import {
   showErrorMessage,
   showSuccessMessage,
} from '../../../../UI/notification/Notification'

export const LinkDeleteConfirm = ({ isModalOpen, onClose, deletedLinkId }) => {
   const dispatch = useDispatch()

   const deleteLinkHandler = () => {
      dispatch(deleteLink({ id: deletedLinkId }))
         .unwrap()
         .then(() => {
            showSuccessMessage('Вы удалили ссылку')
            onClose()
         })
         .catch(() => {
            showErrorMessage('Не удалось удалить ссылку')
         })
   }
   return (
      <ConfirmModal
         title="Вы уверены, что хотите удалить ссылку ... ?"
         isConfirmModalOpen={Boolean(isModalOpen)}
      >
         <Button
            onClick={onClose}
            background="none"
            border="1px solid #3772FF"
            color="#3772FF"
            bgHover="rgba(29, 96, 255, 0.1)"
            bgActive="rgba(97, 144, 255, 0.3)"
         >
            Отмена
         </Button>
         <Button
            onClick={deleteLinkHandler}
            background="#C91E1E"
            bgHover="#B62727"
            bgActive="#E13A3A"
         >
            Удалить
         </Button>
      </ConfirmModal>
   )
}
