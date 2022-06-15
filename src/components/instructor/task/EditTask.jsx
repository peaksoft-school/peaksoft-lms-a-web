import styled from '@emotion/styled'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '../../UI/button/Button'
import { Input } from '../../UI/input/Input'
import { BreadCrumbs } from '../../UI/breadCrumb/BreadCrumbs'
import { TextEditor } from './TextEditor/TextEditor'
import { Link as TaskLink } from './taskLink/Link'
import { Code } from './taskCode/Code'
import { Image } from './taskImage/Image'
import { File } from './taskFile/File'
import { CODE, FILE, IMAGE, LINK, TEXT } from '../../../utils/constants/general'
import {
   getLessonTask,
   taskActions,
   uploadFile,
} from '../../../store/INSTRUCTOR/task-slice'
import { getCourse } from '../../../store/INSTRUCTOR/materials-slice'
import { TaskCreatorOptions } from './TaskCreatorOptions'
import { Spinner } from '../../UI/Spinner/Spinner'

const EditTask = () => {
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const { taskId, id } = useParams()
   const { lessonTasks, taskName } = useSelector((state) => state.tasks.task)
   const { isLoading } = useSelector((state) => state.tasks)
   const { course } = useSelector((state) => state.materials)

   const changeTaskNameHandler = (e) => {
      dispatch(taskActions.setTaskName(e.target.value))
   }
   useEffect(() => {
      dispatch(getLessonTask(taskId))
      dispatch(getCourse(id))
   }, [])

   const sendTaskHandler = () => {
      dispatch(
         uploadFile({
            lessonTasks,
            taskName,
            taskId,
            navigateToMaterials,
            isUpdate: true,
         })
      )
   }
   const cancelTasklHandler = () => {
      navigateToMaterials()
      dispatch(taskActions.clearTask())
   }
   const navigateToMaterials = () => {
      navigate(`/instructor/instructor_course/${id}/materials`, {
         replace: true,
      })
   }

   const pathsArray = [
      {
         path: '/instructor_course',
         name: 'курсы',
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
         <StyledBreadCrumbs>
            <BreadCrumbs pathsArray={pathsArray} />
         </StyledBreadCrumbs>
         <Container>
            <StyledTitle>Редактировать задание</StyledTitle>
            <Title>
               <StyledText
                  placeholder="Название задания"
                  value={taskName}
                  onChange={changeTaskNameHandler}
               />
               <TaskCreatorOptions />
            </Title>
            <StyledContainer>
               {lessonTasks.map((el) => {
                  if (el.taskType === FILE) {
                     return <File file={el} key={el.id} />
                  }
                  if (el.taskType === IMAGE) {
                     return <Image image={el} key={el.id} />
                  }
                  if (el.taskType === CODE) {
                     return <Code code={el} key={el.id} />
                  }
                  if (el.taskType === LINK) {
                     return <TaskLink link={el} key={el.id} />
                  }
                  if (el.taskType === TEXT) {
                     return <TextEditor text={el} key={el.id} />
                  }
                  return el
               })}
            </StyledContainer>
            <ButtonContainer>
               <StyledButton>
                  <Button
                     background="none"
                     border="1px solid #3772FF"
                     color="#3772FF"
                     onClick={cancelTasklHandler}
                  >
                     Отмена
                  </Button>
                  <Button
                     background="#3772FF"
                     bgHover="#1D60FF"
                     bgActive="#6190FF"
                     onClick={sendTaskHandler}
                  >
                     Сохранить
                  </Button>
               </StyledButton>
            </ButtonContainer>
         </Container>
         {isLoading && <Spinner />}
      </>
   )
}

export default EditTask

const Container = styled.div`
   width: 100%;
   border-radius: 8px;
   padding: 20px 20px 0 20px;
   background-color: #fbfbfb;
`
const StyledTitle = styled.div`
   font-family: 'Open Sans', sans-serif;
   font-style: normal;
   font-weight: 500;
   font-size: 19px;
   line-height: 22px;
   color: #1f6ed4;
   height: 22px;
`
const Title = styled.div`
   height: 70px;
   display: flex;
   align-items: flex-end;
`
const StyledText = styled(Input)`
   width: 842px;
   height: 42px;
`

const StyledContainer = styled.div`
   margin-top: 20px;
   width: 100%;
   background: #ffffff;
   border: 1px solid #d4d4d4;
   border-radius: 10px;
   padding: 18px;
   display: grid;
   grid-row-gap: 20px;
`
const ButtonContainer = styled.div`
   height: 80px;
   display: flex;
   justify-content: flex-end;
   align-items: center;
`
const StyledButton = styled.div`
   width: 250px;
   display: flex;
   justify-content: space-between;
   height: 40px;
`
const StyledBreadCrumbs = styled.div`
   height: 65px;
   padding-bottom: 16px;
   display: flex;
   align-items: flex-end;
`
