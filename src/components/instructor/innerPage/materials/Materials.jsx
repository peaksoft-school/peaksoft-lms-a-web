import { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { Button } from '../../../UI/button/Button'
import { ReactComponent as AddIcon } from '../../../../assets/icons/AddIcon.svg'
import { BreadCrumbs } from '../../../UI/BreadCrumb/BreadCrumbs'
import { LessonCreateModal } from './MaterialsCreateModal'
import {
   ADD_LESSON,
   DELETE_LESSON,
   EDIT_LESSON,
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
import { AddLinkModal } from '../../../insructor/AddLinkModal'
import { getSingleLink } from '../../../../store/INSTRUCTOR/linkSlice'
import { LinkEdit } from './LinkEdit'
import { LinkDeleteConfirm } from './LinkDeleteConfirm'

export const Materials = () => {
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const { id } = useParams()

   const { lessons, isLoading, lesson, course } = useSelector(
      (state) => state.materials
   )

   const [searchParams, setSearchParams] = useSearchParams()

   const showCreateModal = searchParams.get(ADD_LESSON)
   const showEditModal = searchParams.get(EDIT_LESSON)
   const showConfirmationModal = searchParams.get(DELETE_LESSON)
   const showAddLinkModal = searchParams.get(ADD_LINK_MODAL)
   const showEditLinkModal = searchParams.get(EDIT_LINK)
   const showDeleteLinkConfirmationModal = searchParams.get(DELETE_LINK)

   const [deletedLessonId, setDeletedLessonId] = useState(null)
   const [deletedLinkId, setDeletedLinkId] = useState(null)

   // ----------------LINK RELATED --------------------

   const followLinkHandler = (link) => {
      window.open(link, '_blank')
   }

   const selectedOptionHandler = (option) => {
      if (option.id === 'link') {
         setSearchParams({ [ADD_LINK_MODAL]: true, lessonId: option.lessonId })
      }
   }

   const openDeleteLinkConfirmModal = (id) => {
      setDeletedLinkId(id)
      setSearchParams({ [DELETE_LINK]: true })
   }
   const [linkId, setLinkId] = useState('')
   const editLink = (id) => {
      setLinkId(id)
      dispatch(getSingleLink(id))
      setSearchParams({ [EDIT_LINK]: true, linkId: id })
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

   const openTestInnerPage = (lessonId, testId) => {
      navigate(`test/${lessonId}/${testId}`)
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

   useEffect(() => {
      const lessonId = searchParams.get('lessonId')
      if (lessonId) {
         dispatch(getLesson(lessonId))
      }
      if (showConfirmationModal) {
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
                     openTestInnerPage={openTestInnerPage}
                     test={lesson.testResponse}
                     onEditTitle={() => openEditLessonModal(lesson.id)}
                     onEditLink={editLink}
                     onDeleteLesson={() => deleteLessonModal(lesson.id)}
                     onDeleteLink={openDeleteLinkConfirmModal}
                     selectedOption={selectedOptionHandler}
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
