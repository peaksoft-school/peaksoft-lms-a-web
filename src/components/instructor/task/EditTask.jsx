import styled from '@emotion/styled'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '../../UI/button/Button'
import { Input } from '../../UI/input/Input'
import { BreadCrumbs } from '../../UI/BreadCrumb/BreadCrumbs'
import { TextEditor } from './TextEditor/TextEditor'
import { SelectFile } from './taskFile/SelectFile'
import { SelectImage } from './taskImage/SelectImage'
import { Link as TaskLink } from './taskLink/Link'
import { Code } from './taskCode/Code'
import { Image } from './taskImage/Image'
import { File } from './taskFile/File'
import { AddLinkModal } from './taskLink/AddLink'
import { CODE, FILE, IMAGE, LINK, TEXT } from '../../../utils/constants/general'
import { AddCode } from './taskCode/AddCode'
import { Text } from './TextEditor/Text'
import { taskActions, updateFile } from '../../../store/task-slice'

export const EditTask = () => {
   const dispatch = useDispatch()
   const { taskId, id } = useParams()
   const navigate = useNavigate()
   const { lessonTasks, taskName } = useSelector((state) => state.tasks.task)

   const onChangeHandler = (e) => {
      dispatch(taskActions.addTaskName(e.target.value))
   }
   const navigateAfterSuccessResponse = () => {
      navigate(`/instructor/instructor_course/${id}/materials`, {
         replace: true,
      })
   }
   const editHandler = () => {
      dispatch(
         updateFile({
            lessonTasks,
            taskName,
            taskId,
            navigateAfterSuccessResponse,
         })
      )
   }
   const cancelHandler = () => {
      navigateAfterSuccessResponse()
   }
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
                  onChange={onChangeHandler}
               />
               <StyledIcons>
                  <Text />
                  <SelectFile />
                  <SelectImage />
                  <AddLinkModal />
                  <AddCode />
               </StyledIcons>
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
                     onClick={cancelHandler}
                  >
                     Отмена
                  </Button>
                  <Button
                     background="#3772FF"
                     bgHover="#1D60FF"
                     bgActive="#6190FF"
                     onClick={editHandler}
                  >
                     Сохранить
                  </Button>
               </StyledButton>
            </ButtonContainer>
         </Container>
      </>
   )
}

const pathsArray = [
   {
      path: 'admin',
      name: 'курсы',
   },
   {
      path: 'courses',
      name: 'courseName',
   },
   {
      path: '/instructors',
      name: 'Студенты',
   },
]
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
   width: 154px;
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
const StyledIcons = styled.div`
   margin-left: 30px;
   margin-bottom: 7px;
   width: 280px;
   display: flex;
   justify-content: space-between;
   align-items: center;
   cursor: pointer;
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
