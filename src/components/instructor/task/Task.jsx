import styled from '@emotion/styled'
import React, { useEffect, useState } from 'react'
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
import {
   CODE,
   FILE,
   IMAGE,
   LESSON_TASK,
   LINK,
   TEXT,
} from '../../../utils/constants/general'
import { taskActions, uploadFile } from '../../../store/task-slice'
import { localStorageHelper } from '../../../utils/helpers/general'
import { getCourse } from '../../../store/materials-slice'
import { TaskCreatorOptions } from './TaskCreatorOptions'
import { Spinner } from '../../UI/Spinner/Spinner'

export const Task = () => {
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const { lessonId, id } = useParams()
   const [formIsValid, setFormIsValid] = useState(false)
   const { lessonTasks, taskName } = useSelector((state) => state.tasks.task)
   const { task, isLoading } = useSelector((state) => state.tasks)
   const { course } = useSelector((state) => state.materials)

   useEffect(() => {
      window.onbeforeunload = () => {
         return localStorageHelper.store(LESSON_TASK, task)
      }
   }, [task])

   useEffect(() => {
      setFormIsValid(lessonTasks.length > 0)
   }, [lessonTasks])

   useEffect(() => {
      dispatch(getCourse(id))
   }, [])

   const changeTaskNameHandler = (e) => {
      dispatch(taskActions.setTaskName(e.target.value))
   }
   const navigateToMaterials = () => {
      navigate(`/instructor/instructor_course/${id}/materials`, {
         replace: true,
      })
   }
   const sendTaskHandler = () => {
      dispatch(
         uploadFile({
            lessonTasks,
            taskName,
            lessonId,
            navigateToMaterials,
         })
      )
   }
   const cancelTaskHandler = () => {
      localStorageHelper.clear(LESSON_TASK)
      dispatch(taskActions.clearTask())
      navigateToMaterials()
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
            <StyledTitle>Создать задание</StyledTitle>
            <Title>
               <StyledText
                  placeholder="Название задания"
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
                     onClick={cancelTaskHandler}
                  >
                     Отмена
                  </Button>
                  <Button
                     disabled={!formIsValid}
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
