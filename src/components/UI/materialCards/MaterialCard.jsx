import styled from '@emotion/styled'
import { ReactComponent as EditTitle } from '../../../assets/icons/editTitle.svg'
import { ReactComponent as DeleteIcon } from '../../../assets/icons/Delete.svg'
import { ReactComponent as LinkIcon } from '../../../assets/icons/Link.svg'
import { ReactComponent as PresentationIcon } from '../../../assets/icons/Presentation .svg'
import { ReactComponent as TaskIcon } from '../../../assets/icons/Task.svg'
import { ReactComponent as TestIcon } from '../../../assets/icons/Test.svg'
import { ReactComponent as VideoIcon } from '../../../assets/icons/Video.svg'
import { Select } from '../select/Select'

const STUDY_FORMAT_OPTION = [
   {
      id: 'ALL',
      title: 'ALL',
   },
   {
      id: 'ONLINE',
      title: 'ONLINE',
   },
   {
      id: 'OFFLINE',
      title: 'OFFLINE',
   },
]

export const MaterialCard = () => {
   return (
      <StyledContainer>
         <StyledTitleContainer>
            <StyledTitle>
               <StyledEditIcon>
                  <EditTitle />
               </StyledEditIcon>
               <h1>LESSON_1</h1>
            </StyledTitle>
            <StyledManageContainer>
               <StyledSelectContainer>
                  <Select
                     placeholder="Добавить"
                     options={STUDY_FORMAT_OPTION}
                  />
               </StyledSelectContainer>

               <DeleteIcon />
            </StyledManageContainer>
         </StyledTitleContainer>
         <StyledContentContainer>
            <StyledContentItem>
               <StyledContentIcon>
                  <VideoIcon />
               </StyledContentIcon>
               <h2>Видеоурок</h2>
            </StyledContentItem>
            <StyledContentItem>
               <StyledContentIcon>
                  <PresentationIcon />
               </StyledContentIcon>
               <h2>Презентация</h2>
            </StyledContentItem>
            <StyledContentItem>
               <StyledContentIcon>
                  <TaskIcon />
               </StyledContentIcon>
               <h2>Задание</h2>
            </StyledContentItem>
            <StyledContentItem>
               <StyledContentIcon>
                  <LinkIcon />
               </StyledContentIcon>
               <h2>Ссылка</h2>
            </StyledContentItem>
            <StyledContentItem>
               <StyledContentIcon>
                  <TestIcon />
               </StyledContentIcon>
               <h2>Тест</h2>
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
   height: 24px;
   h2 {
      font-family: 'Open Sans' sans-serif;
      font-style: normal;
      font-weight: 600;
      font-size: 16px;
      line-height: 22px;
      color: #000000;
   }
   display: flex;
   align-items: center;
   justify-content: start;
`
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
