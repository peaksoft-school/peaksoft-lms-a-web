import { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useSearchParams } from 'react-router-dom'
import { Button } from '../../../UI/button/Button'
import { ReactComponent as AddIcon } from '../../../../assets/icons/AddIcon.svg'
import { BreadCrumbs } from '../../../UI/breadCrumb/BreadCrumbs'
import { LessonCreateModal } from './MaterialsCreateModal'
import {
   ADD_LESSON,
   ADD_PRESENTATION,
   DELETE_LESSON,
   DELETE_PRESENTATION,
   EDIT_LESSON,
   EDIT_PRESENTATION,
   ADD_LINK_MODAL,
   EDIT_LINK,
   DELETE_LINK,
} from '../../../../utils/constants/general'
import {
   addLesson,
   deleteLesson,
   editLesson,
   getCourse,
   getLesson,
   getLessons,
} from '../../../../store/materials-slice'
import {
   showErrorMessage,
   showSuccessMessage,
} from '../../../UI/notification/Notification'
import { Spinner } from '../../../UI/Spinner/Spinner'
import { LessonEditModal } from './MaterialsEditModal'
import { ConfirmModalOnDelete } from './ConfirmModalOnDelete'
import { LessonCard } from '../../../UI/lessonCard/LessonCard'
import {
   addPresentation,
   deletePresentation,
   editPresentation,
   getPresentation,
} from '../../../../store/presentation-slice'
import { ConfirmModalOnDeletePresentation } from './ConfirmModalOnDeletePresentation'
import { AddLinkModal } from '../../../insructor/AddLinkModal'
import { getSingleLink } from '../../../../store/INSTRUCTOR/linkSlice'
import { LinkEdit } from './LinkEdit'
import { LinkDeleteConfirm } from './LinkDeleteConfirm'
import { PresentationForm } from '../../lesson/presentation/PresentationForm'

export const Materials = () => {
   const dispatch = useDispatch()
   const { id } = useParams()

   const { lessons, isLoading, lesson, course } = useSelector(
      (state) => state.materials
   )
   const { presentation } = useSelector((state) => state.presentation)

   const [searchParams, setSearchParams] = useSearchParams()

   const showCreateModal = searchParams.get(ADD_LESSON)
   const showEditModal = searchParams.get(EDIT_LESSON)
   const showConfirmationModal = searchParams.get(DELETE_LESSON)
   const showPresentationModal = searchParams.get(ADD_PRESENTATION)
   const showEditPresentationModal = searchParams.get(EDIT_PRESENTATION)
   const showConfirmPresentationModal = searchParams.get(DELETE_PRESENTATION)
   const showAddLinkModal = searchParams.get(ADD_LINK_MODAL)
   const showEditLinkModal = searchParams.get(EDIT_LINK)
   const showDeleteLinkConfirmationModal = searchParams.get(DELETE_LINK)

   const [deletedLinkId, setDeletedLinkId] = useState(null)
   const [deletedLessonId, setDeletedLessonId] = useState(null)
   const [deletedPresentationId, setDeletedPresentationId] = useState(null)
   const [linkId, setLinkId] = useState('')

   // ----------------LINK RELATED --------------------

   const followLinkHandler = (link) => {
      window.open(link, '_blank')
   }

   const openDeleteLinkConfirmModal = (id) => {
      setDeletedLinkId(id)
      setSearchParams({ [DELETE_LINK]: true })
   }
   const editLink = (id) => {
      setLinkId(id)
      dispatch(getSingleLink(id))
      setSearchParams({ [EDIT_LINK]: true, linkId: id })
   }

   const addLessonMaterials = (option) => {
      if (option.id === 'presentation') {
         setSearchParams({
            [ADD_PRESENTATION]: true,
            lessonId: option.lessonId,
         })
      }
      if (option.id === 'link') {
         setSearchParams({ [ADD_LINK_MODAL]: true, lessonId: option.lessonId })
      }
   }

   // ------------------------------LESSON RELATED-----------------
   const closeModals = () => {
      setSearchParams('')
   }

   const openCreateLessonModal = () => {
      setSearchParams({ [ADD_LESSON]: true })
   }

   const deleteLessonModal = (id) => {
      setDeletedLessonId(id)
      setSearchParams({ [DELETE_LESSON]: true })
   }

   const openEditLessonModal = (id) => {
      dispatch(getLesson(id))
      setSearchParams({ [EDIT_LESSON]: true })
   }

   const openPresentationEditModal = (id) => {
      dispatch(getPresentation(id))
      setSearchParams({ [EDIT_PRESENTATION]: true, presentationId: id })
   }

   const deletePresentationModal = (id) => {
      setDeletedPresentationId(id)
      setSearchParams({ [DELETE_PRESENTATION]: true })
   }

   const addLessonHandler = (value, onClear) => {
      dispatch(addLesson({ lessonData: value, id }))
         .unwrap()
         .then(() => {
            showSuccessMessage('Урок успешно создан')
            closeModals()
            onClear()
            dispatch(getLessons())
         })
         .catch(() => {
            showErrorMessage('Не удалось создать урок')
         })
   }

   const sendEditedLessonHandler = (value, onClear) => {
      dispatch(editLesson({ id: lesson.id, lessonData: value }))
         .unwrap()
         .then(() => {
            showSuccessMessage('Изменения успешно сохранены')
            closeModals()
            onClear()
            dispatch(getLessons())
         })
         .catch(() => {
            showErrorMessage('Не удалось изменить данные')
         })
   }

   const deleteLessonHandler = () => {
      dispatch(deleteLesson(deletedLessonId))
         .unwrap()
         .then(() => {
            showSuccessMessage('Урок успешно удален')
            closeModals()
            dispatch(getLessons())
         })
         .catch(() => {
            showErrorMessage('Не удалось удалить урок')
         })
   }

   const addPresentationHandler = (value, file, id, onClear) => {
      dispatch(addPresentation({ value, file, id }))
         .unwrap()
         .then(() => {
            showSuccessMessage('Презентация успешно создана')
            onClear()
            closeModals()
            dispatch(getLessons())
         })
         .catch(() => {
            showErrorMessage('Не удалось создать презентацию')
         })
   }

   const senEditedPresentationHandler = (value, file, id, onClear) => {
      dispatch(editPresentation({ value, file, id }))
         .unwrap()
         .then(() => {
            showSuccessMessage('Изменения успешно сохранены')
            onClear()
            closeModals()
            dispatch(getLessons())
         })
         .catch(() => {
            showErrorMessage('Не удалось изменить данные')
         })
   }

   const deletePresentationHandler = () => {
      dispatch(deletePresentation(deletedPresentationId))
         .unwrap()
         .then(() => {
            showSuccessMessage('Презентация успешно удален')
            closeModals()
            dispatch(getLessons())
         })
         .catch(() => {
            showErrorMessage('Не удалось удалить презентацию')
         })
   }

   useEffect(() => {
      const lessonId = searchParams.get('lessonId')
      const presentationId = searchParams.get('presentationId')

      if (lessonId) {
         dispatch(getLesson(lessonId))
      }

      if (presentationId) {
         dispatch(getPresentation(presentationId))
      }

      if (showConfirmationModal) {
         closeModals()
      }

      if (showConfirmPresentationModal) {
         closeModals()
      }

      dispatch(getLessons())
      dispatch(getCourse(id))
   }, [])

   const pathsArray = [
      {
         path: '/instructor_course',
         name: 'Kурсы',
      },
      {
         path: '/materials',
         name: course?.courseName,
      },
      {
         path: '/instructors',
         name: 'Материалы',
      },
   ]
   return (
      <>
         <StyledButtonContainer>
            <BreadCrumbs pathsArray={pathsArray} />

            <Button
               background="#3772FF"
               bgHover="#1D60FF"
               bgActive="#6190FF"
               onClick={openCreateLessonModal}
            >
               <StyledAddIcon /> Добавить урок
            </Button>
         </StyledButtonContainer>
         <Container>
            {(isLoading && <Spinner />) ||
               lessons.map((lesson) => (
                  <LessonCard
                     lessonId={lesson.id}
                     title={lesson.lessonName}
                     key={lesson.id}
                     presentation={lesson.presentationResponse}
                     selectedOption={addLessonMaterials}
                     onEditPresentation={openPresentationEditModal}
                     onDeletePresentation={deletePresentationModal}
                     onEditTitle={() => openEditLessonModal(lesson.id)}
                     onEditLink={editLink}
                     onDeleteLesson={() => deleteLessonModal(lesson.id)}
                     onDeleteLink={openDeleteLinkConfirmModal}
                     link={lesson.linkResponse}
                     followLinkHandler={followLinkHandler}
                  />
               ))}
         </Container>
         <LessonCreateModal
            showModal={showCreateModal}
            onClose={closeModals}
            onAdd={addLessonHandler}
         />
         {lesson && (
            <LessonEditModal
               lesson={lesson}
               onAdd={sendEditedLessonHandler}
               onClose={closeModals}
               showModal={showEditModal}
            />
         )}
         <ConfirmModalOnDelete
            showModal={showConfirmationModal}
            onClose={closeModals}
            onDelete={deleteLessonHandler}
         />
         <PresentationForm
            showModal={showPresentationModal}
            onClose={closeModals}
            onAdd={addPresentationHandler}
         />
         {presentation && (
            <PresentationForm
               showModal={showEditPresentationModal}
               onClose={closeModals}
               onEdit={senEditedPresentationHandler}
               presentation={presentation}
            />
         )}
         <ConfirmModalOnDeletePresentation
            showModal={showConfirmPresentationModal}
            onClose={closeModals}
            onDelete={deletePresentationHandler}
         />
         <AddLinkModal
            isModalOpen={showAddLinkModal}
            closeModals={closeModals}
         />
         <LinkEdit
            showEditLinkModal={showEditLinkModal}
            onClose={closeModals}
            id={linkId}
         />
         <LinkDeleteConfirm
            isModalOpen={showDeleteLinkConfirmationModal}
            onClose={closeModals}
            deletedLinkId={deletedLinkId}
         />
      </>
   )
}

const Container = styled.div`
   display: grid;
   grid-template-columns: repeat(2, 1fr);
   grid-template-rows: repeat(2, 1fr);
   grid-column-gap: 20px;
   grid-row-gap: 20px;
`

const StyledButtonContainer = styled.div`
   width: 100%;
   height: 88px;
   display: flex;
   align-items: center;
   justify-content: space-between;
`
const StyledAddIcon = styled(AddIcon)`
   margin-right: 5px;
`
