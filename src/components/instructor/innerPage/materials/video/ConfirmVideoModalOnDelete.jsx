import React from 'react'
import { useDispatch } from 'react-redux'
import ConfirmModal from '../../../../UI/modal/ConfirmModal'
import { Button } from '../../../../UI/button/Button'
import {
   showErrorMessage,
   showSuccessMessage,
} from '../../../../UI/notification/Notification'
import { deleteVideo } from '../../../../../store/INSTRUCTOR/video-slice'

export const ConfirmVideoModalOnDelete = ({ isModalOpen, onClose, id }) => {
   const dispatch = useDispatch()

   const deleteHandler = () => {
      dispatch(deleteVideo(id))
         .unwrap()
         .then(() => {
            showSuccessMessage('Вы удалили видеоурок')
            onClose()
         })
         .catch(() => {
            showErrorMessage('Не удалось удалить видеоурок')
         })
   }
   return (
      <ConfirmModal
         title="Вы уверены, что хотите удалить видеоурок ... ?"
         isConfirmModalOpen={Boolean(isModalOpen)}
         closeConfirmModal={onClose}
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
            onClick={deleteHandler}
            background="#C91E1E"
            bgHover="#B62727"
            bgActive="#E13A3A"
         >
            Удалить
         </Button>
      </ConfirmModal>
   )
}
