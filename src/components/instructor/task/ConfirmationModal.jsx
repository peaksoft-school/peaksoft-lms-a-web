import React from 'react'
import { useDispatch } from 'react-redux'
import ConfirmModal from '../../UI/modal/ConfirmModal'
import { Button } from '../../UI/button/Button'
import {
   showErrorMessage,
   showSuccessMessage,
} from '../../UI/notification/Notification'
import { deleteLessonTask } from '../../../store/task-slice'

export const ConfirmationModal = ({ isModalOpen, onClose, id }) => {
   const dispatch = useDispatch()

   const deleteHandler = () => {
      dispatch(deleteLessonTask(id))
         .unwrap()
         .then(() => {
            showSuccessMessage('Вы удалили task')
            onClose()
         })
         .catch(() => {
            showErrorMessage('Не удалось удалить task')
         })
   }
   return (
      <ConfirmModal
         title="Вы уверены, что хотите удалить task ... ?"
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
