import { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { Button } from '../../../UI/button/Button'
import { ReactComponent as AddIcon } from '../../../../assets/icons/AddIcon.svg'
import { BreadCrumbs } from '../../../UI/breadCrumb/BreadCrumbs'
import { LessonCreateModal } from './MaterialsCreateModal'
import {
   ADD_LESSON,
   ADD_PRESENTATION,
   ADD_VIDEO,
   DELETE_LESSON,
   DELETE_TASK,
   DELETE_TEST,
   TEST_KEY,
   DELETE_PRESENTATION,
   EDIT_LESSON,
   EDIT_PRESENTATION,
   ADD_LINK_MODAL,
   EDIT_LINK,
   DELETE_LINK,
   DELETE_VIDEO,
   EDIT_VIDEO,
} from '../../../../utils/constants/general'
import {
   addLesson,
   deleteLesson,
   editLesson,
   getCourse,
   getLesson,
   getLessons,
} from '../../../../store/INSTRUCTOR/materials-slice'
import {
   showErrorMessage,
   showSuccessMessage,
} from '../../../UI/notification/Notification'
import { Spinner } from '../../../UI/Spinner/Spinner'
import { LessonEditModal } from './MaterialsEditModal'
import { ConfirmModalOnDelete } from './ConfirmModalOnDelete'
import { LessonCard } from '../../../UI/lessonCard/LessonCard'
import { getLessonTask } from '../../../../store/INSTRUCTOR/task-slice'
import { localStorageHelper } from '../../../../utils/helpers/general'
import { ConfirmationModal } from '../../task/ConfirmationModal'
import {
   getTest,
   removeTest,
} from '../../../../store/INSTRUCTOR/create-test-slice'
import { ConfirmModalOnDeleteTest } from './ConfirmModalOnDeleteTest'
import {
   addPresentation,
   deletePresentation,
   editPresentation,
   getPresentation,
} from '../../../../store/INSTRUCTOR/presentation-slice'
import { ConfirmModalOnDeletePresentation } from './ConfirmModalOnDeletePresentation'
import { getSingleLink } from '../../../../store/INSTRUCTOR/linkSlice'
import { LinkDeleteConfirm } from './link/LinkDeleteConfirm'
import { PresentationForm } from '../../lesson/presentation/PresentationForm'
import { LessonVideo } from './video/LessonVideo'
import { AddLinkModal } from './link/AddLinkModal'
import { LinkEdit } from './link/LinkEdit'
import { getSingleVideo } from '../../../../store/INSTRUCTOR/video-slice'
import { ConfirmVideoModalOnDelete } from './video/ConfirmVideoModalOnDelete'
import { EditVideo } from './video/EditVideo'

const Materials = () => {
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const { id } = useParams()

   const { lessons, isLoading, lesson, course } = useSelector(
      (state) => state.materials
   )
   const { presentation } = useSelector((state) => state.presentation)

   const [searchParams, setSearchParams] = useSearchParams()

   const showCreateModal = searchParams.get(ADD_LESSON)
   const showEditModal = searchParams.get(EDIT_LESSON)
   const showDeleteLessonConfirmModal = searchParams.get(DELETE_LESSON)
   const showDeleteTestConfirmModal = searchParams.get(DELETE_TEST)
   const showConfirmationModal = searchParams.get(DELETE_LESSON)
   const showPresentationModal = searchParams.get(ADD_PRESENTATION)
   const showEditPresentationModal = searchParams.get(EDIT_PRESENTATION)
   const showConfirmPresentationModal = searchParams.get(DELETE_PRESENTATION)
   const showAddLinkModal = searchParams.get(ADD_LINK_MODAL)
   const showEditLinkModal = searchParams.get(EDIT_LINK)
   const showDeleteLinkConfirmationModal = searchParams.get(DELETE_LINK)
   const showTaskConfirmationModal = searchParams.get(DELETE_TASK)
   const showVideoModal = searchParams.get(ADD_VIDEO)
   const showVideoConfirmModal = searchParams.get(DELETE_VIDEO)
   const showVideoEditModal = searchParams.get(EDIT_VIDEO)

   const [deletedLessonId, setDeletedLessonId] = useState(null)
   const [materialId, setMaterialId] = useState(null)

   const addLessonMaterials = (option) => {
      if (option.id === 'video') {
         setSearchParams({ [ADD_VIDEO]: true, lessonId: option.lessonId })
      }
      if (option.id === 'link') {
         setSearchParams({ [ADD_LINK_MODAL]: true, lessonId: option.lessonId })
      }
      if (option.id === 'test') {
         navigate(`create_test/${option.lessonId}`)
      }
      if (option.id === 'presentation') {
         setSearchParams({
            [ADD_PRESENTATION]: true,
            lessonId: option.lessonId,
         })
      }
      if (option.id === 'task') {
         navigate(`create_task/${option.lessonId}`)
      }
   }

   const editTask = (id) => {
      navigate(`edit_task/${id}`)
      dispatch(getLessonTask(id))
   }

   const deleteTask = (id) => {
      setMaterialId(id)
      setSearchParams({ [DELETE_TASK]: true })
   }

   const editVideo = (id) => {
      setMaterialId(id)
      dispatch(getSingleVideo(id))
      setSearchParams({ [EDIT_VIDEO]: true, videoId: id })
   }
   const deleteVideo = (id) => {
      setMaterialId(id)
      setSearchParams({ [DELETE_VIDEO]: true, videoId: id })
   }

   const followLinkHandler = (link) => {
      window.open(link, '_blank')
   }

   const openDeleteLinkConfirmModal = (id) => {
      setMaterialId(id)
      setSearchParams({ [DELETE_LINK]: true })
   }
   const editLink = (id) => {
      setMaterialId(id)
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

   const deleteTest = (id) => {
      setMaterialId(id)
      setSearchParams({ [DELETE_TEST]: true })
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
      setMaterialId(id)
      setSearchParams({ [DELETE_PRESENTATION]: true })
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
            dispatch(getLessons(id))
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

   const deleteTestHandler = () => {
      dispatch(removeTest(materialId))
         .unwrap()
         .then(() => {
            showSuccessMessage('Тест успешно удален')
            closeModals()
            dispatch(getLessons())
            localStorageHelper.clear(TEST_KEY)
         })
         .catch(() => {
            showErrorMessage('Не удалось удалить тест')
         })
   }

   const editTestHandler = (id) => {
      navigate(`edit_test/${id}`)
      dispatch(getTest(id))
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
      dispatch(deletePresentation(materialId))
         .unwrap()
         .then(() => {
            showSuccessMessage('Презентация  успешно удален')
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
      if (showDeleteLessonConfirmModal) {
         closeModals()
      }
      if (showDeleteTestConfirmModal) {
         closeModals()
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
                     onEditTask={editTask}
                     onDeleteTask={deleteTask}
                     task={lesson.taskResponse}
                     onEditTest={editTestHandler}
                     onDeleteTest={deleteTest}
                     presentation={lesson.presentationResponse}
                     selectedOption={addLessonMaterials}
                     onEditPresentation={openPresentationEditModal}
                     onDeletePresentation={deletePresentationModal}
                     openTestInnerPage={openTestInnerPage}
                     test={lesson.testResponse}
                     onEditTitle={() => openEditLessonModal(lesson.id)}
                     onDeleteLesson={() => deleteLessonModal(lesson.id)}
                     onDeleteLink={openDeleteLinkConfirmModal}
                     onEditLink={editLink}
                     link={lesson.linkResponse}
                     followLinkHandler={followLinkHandler}
                     video={lesson.videoResponse}
                     onEditVideo={editVideo}
                     onDeleteVideo={deleteVideo}
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
            showModal={showDeleteLessonConfirmModal}
            onClose={closeModals}
            onDelete={deleteLessonHandler}
         />
         <ConfirmationModal
            showModal={showTaskConfirmationModal}
            onClose={closeModals}
            id={materialId}
         />
         <ConfirmModalOnDeleteTest
            showModal={showDeleteTestConfirmModal}
            onClose={closeModals}
            onDelete={deleteTestHandler}
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
            id={materialId}
         />
         <LinkDeleteConfirm
            isModalOpen={showDeleteLinkConfirmationModal}
            onClose={closeModals}
            deletedLinkId={materialId}
         />
         <LessonVideo
            isModalOpen={Boolean(showVideoModal)}
            closeModals={closeModals}
         />
         <EditVideo
            isModalOpen={showVideoEditModal}
            closeModals={closeModals}
            id={materialId}
         />
         <ConfirmVideoModalOnDelete
            isModalOpen={showVideoConfirmModal}
            onClose={closeModals}
            id={materialId}
         />
      </>
   )
}
export default Materials

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
