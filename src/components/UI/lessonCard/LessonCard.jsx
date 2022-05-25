import styled from '@emotion/styled'
import { ReactComponent as EditTitle } from '../../../assets/icons/editTitle.svg'
import { ReactComponent as DeleteIcon } from '../../../assets/icons/Delete.svg'
import { ReactComponent as LinkIcon } from '../../../assets/icons/Link.svg'
import { ReactComponent as PresentationIcon } from '../../../assets/icons/Presentation .svg'
import { ReactComponent as TaskIcon } from '../../../assets/icons/Task.svg'
import { ReactComponent as TestIcon } from '../../../assets/icons/Test.svg'
import { ReactComponent as VideoIcon } from '../../../assets/icons/Video.svg'
import { ReactComponent as EditIcon } from '../../../assets/icons/editIcon.svg'
import { Select } from '../select/Select'

export const LessonCard = ({
   title,
   video,
   presentation,
   link,
   task,
   test,
   onEditTitle,
}) => {
   const STUDY_FORMAT_OPTION = [
      {
         id: 'video',
         title: 'Видеоурок',
         disabled: Boolean(video),
      },
      {
         id: 'presentation',
         title: 'Презентация',
         disabled: Boolean(presentation),
      },
      {
         id: 'task',
         title: 'Задание',
         disabled: Boolean(task),
      },
      {
         id: 'link',
         title: 'Ссылка',
         disabled: Boolean(link),
      },
      {
         id: 'test',
         title: 'Тест',
         disabled: Boolean(test),
      },
   ]
   return (
      <StyledContainer>
         <StyledTitleContainer>
            <StyledTitle>
               <StyledEditIcon onClick={onEditTitle}>
                  <EditTitle />
               </StyledEditIcon>
               <h1>{title}</h1>
            </StyledTitle>
            <StyledManageContainer>
               <StyledSelectContainer>
                  <Select
                     placeholder="Добавить"
                     options={STUDY_FORMAT_OPTION}
                  />
               </StyledSelectContainer>
               <StyledDeleteIcon>
                  <DeleteIcon />
               </StyledDeleteIcon>
            </StyledManageContainer>
         </StyledTitleContainer>
         <StyledContentContainer>
            <StyledContentItem disabled={!video}>
               <StyledContentIcon>
                  <VideoIcon />
               </StyledContentIcon>
               <StyledDiv>
                  <h2>Видеоурок</h2>
               </StyledDiv>
               <ActionsContainer id="actions">
                  <StyledOnHoverActions>
                     <StyledEditContainer>
                        <EditIcon />
                        <h3>Редактировать</h3>
                     </StyledEditContainer>
                     <StyledDeleteContainer>
                        <StyledDeleteIcon>
                           <DeleteIcon />
                        </StyledDeleteIcon>
                        <h3>Удалить</h3>
                     </StyledDeleteContainer>
                  </StyledOnHoverActions>
               </ActionsContainer>
            </StyledContentItem>
            <StyledContentItem disabled={!presentation}>
               <StyledContentIcon>
                  <PresentationIcon />
               </StyledContentIcon>
               <StyledDiv>
                  <h2>Презентация</h2>
               </StyledDiv>
               <ActionsContainer id="actions">
                  <StyledOnHoverActions>
                     <StyledEditContainer>
                        <EditIcon />
                        <h3>Редактировать</h3>
                     </StyledEditContainer>
                     <StyledDeleteContainer>
                        <StyledDeleteIcon>
                           <DeleteIcon />
                        </StyledDeleteIcon>
                        <h3>Удалить</h3>
                     </StyledDeleteContainer>
                  </StyledOnHoverActions>
               </ActionsContainer>
            </StyledContentItem>
            <StyledContentItem disabled={!task}>
               <StyledContentIcon>
                  <TaskIcon />
               </StyledContentIcon>
               <StyledDiv>
                  <h2>Задание</h2>
               </StyledDiv>
               <ActionsContainer id="actions">
                  <StyledOnHoverActions>
                     <StyledEditContainer>
                        <EditIcon />
                        <h3>Редактировать</h3>
                     </StyledEditContainer>
                     <StyledDeleteContainer>
                        <StyledDeleteIcon>
                           <DeleteIcon />
                        </StyledDeleteIcon>
                        <h3>Удалить</h3>
                     </StyledDeleteContainer>
                  </StyledOnHoverActions>
               </ActionsContainer>
            </StyledContentItem>
            <StyledContentItem disabled={!link}>
               <StyledContentIcon>
                  <LinkIcon />
               </StyledContentIcon>
               <StyledDiv>
                  <h2>Ссылка</h2>
               </StyledDiv>
               <ActionsContainer id="actions">
                  <StyledOnHoverActions>
                     <StyledEditContainer>
                        <EditIcon />
                        <h3>Редактировать</h3>
                     </StyledEditContainer>
                     <StyledDeleteContainer>
                        <StyledDeleteIcon>
                           <DeleteIcon />
                        </StyledDeleteIcon>
                        <h3>Удалить</h3>
                     </StyledDeleteContainer>
                  </StyledOnHoverActions>
               </ActionsContainer>
            </StyledContentItem>
            <StyledContentItem disabled={!test}>
               <StyledContentIcon>
                  <TestIcon />
               </StyledContentIcon>
               <StyledDiv>
                  <h2>Тест</h2>
               </StyledDiv>
               <ActionsContainer id="actions">
                  <StyledOnHoverActions>
                     <StyledEditContainer>
                        <EditIcon />
                        <h3>Редактировать</h3>
                     </StyledEditContainer>
                     <StyledDeleteContainer>
                        <StyledDeleteIcon>
                           <DeleteIcon />
                        </StyledDeleteIcon>
                        <h3>Удалить</h3>
                     </StyledDeleteContainer>
                  </StyledOnHoverActions>
               </ActionsContainer>
            </StyledContentItem>
         </StyledContentContainer>
      </StyledContainer>
   )
}

const StyledContainer = styled.div`
   width: 560px;
   height: 306px;
   display: flex;
   justify-content: center;
   align-items: center;
   flex-direction: column;
   border: 1px solid #d4d4d4;
   border-radius: 10px;
   background: #ffffff;
`
const StyledTitleContainer = styled.div`
   width: 100%;
   height: 80px;
   display: flex;
   border-bottom: 0.5px solid #bfc4ce; ;
`
const StyledContentContainer = styled.div`
   width: 100%;
   height: 226px;
   display: flex;
   justify-content: space-between;
   align-items: center;
   flex-direction: column;
   padding: 18px 20px;
`
const StyledTitle = styled.div`
   width: 60%;
   height: 80px;
   display: flex;
   justify-content: start;
   align-items: center;
   h1 {
      font-family: 'Open Sans' sans-serif;
      font-style: normal;
      font-weight: 600;
      font-size: 18px;
      line-height: 25px;
      color: #000000;
   }
`
const StyledEditIcon = styled.div`
   width: 28px;
   height: 28px;
   margin: 0 20px;
   border-radius: 5px;
   background: #ebebeb;
   display: flex;
   justify-content: center;
   align-items: center;
   cursor: pointer;
`
const StyledManageContainer = styled.div`
   width: 45%;
   height: 80px;
   display: flex;
   align-items: center;
   justify-content: space-around;
`
const StyledContentItem = styled.div`
   min-width: 520px;
   height: 30px;
   display: flex;
   align-items: center;
   justify-content: start;
   border-radius: 6px;
   h2 {
      width: 107px;
      font-family: 'Open Sans' sans-serif;
      font-style: normal;
      font-weight: 600;
      font-size: 16px;
      line-height: 22px;
      color: ${({ disabled }) => (disabled && 'grey') || 'black'};
      cursor: pointer;
   }
   :hover {
      background: rgba(26, 35, 126, 0.07);
   }
   :hover #actions {
      display: block;
   }
   path {
      fill: ${({ disabled }) => (disabled && 'grey') || ''};
   }
   pointer-events: ${({ disabled }) => (disabled && 'none') || ''};
`
const StyledDiv = styled.div``

const StyledContentIcon = styled.div`
   margin-right: 24px;
   width: 24px;
   height: 24px;
   display: flex;
   align-items: center;
   justify-content: center;
`
const StyledSelectContainer = styled.div`
   width: 141px;
   height: 44px;
`
const StyledDeleteIcon = styled.div`
   width: 26px;
   height: 26px;
   margin-right: 5px;
`
const ActionsContainer = styled.div`
   width: 270px;
   height: 30px;
   display: none;
`
const StyledOnHoverActions = styled.div`
   width: 270px;
   height: 30px;
   display: flex;
   justify-content: space-between;
   align-items: center;
   margin-left: 70px;
`
const StyledEditContainer = styled.div`
   width: 152px;
   height: 30px;
   display: flex;
   justify-content: space-around;
   align-items: center;
   border-radius: 6px;
   gap: 4px;
   padding: 0 10px;
   cursor: pointer;
   h3 {
      font-family: 'Open Sans' sans-serif;
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      line-height: 22px;
      color: #292929;
   }
   :hover {
      background: #d4d4d4;
   }
`
const StyledDeleteContainer = styled.div`
   width: 108px;
   height: 30px;
   display: flex;
   justify-content: space-between;
   align-items: center;
   padding: 0 10px;
   cursor: pointer;
   h3 {
      font-family: 'Open Sans' sans-serif;
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      line-height: 22px;
      color: #292929;
   }
   :hover {
      background: #d4d4d4;
   }
   border-radius: 6px;
`
