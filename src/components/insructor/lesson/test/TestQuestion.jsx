import styled from '@emotion/styled'
import { Input } from '../../../UI/input/Input'

export const TestQuestion = () => {
   return (
      <StyledQuestionContainer>
         <QuestionContainer>
            <StyledNumberInList>1</StyledNumberInList>
            <StyledQuestion>
               <Input placeholder="Вариант 1" />
            </StyledQuestion>
            <StyledOptionsContainer>Baiaaly</StyledOptionsContainer>
         </QuestionContainer>
      </StyledQuestionContainer>
   )
}

const StyledQuestionContainer = styled.div`
   min-width: 1140px;
   min-height: 230px;
   display: flex;
   justify-content: space-around;
   align-items: center;
   flex-direction: column;
   padding: 20px;
   background: #ffffff;
   border: 1px solid #d4d4d4;
   border-radius: 10px;
   padding: 20px 26px;
`
const QuestionContainer = styled.div`
   width: 100%;
   height: 56px;
   display: flex;
   align-items: center;
   justify-content: space-between;
`
const StyledQuestion = styled.div`
   min-width: 680px;
   height: 42px;
   display: flex;
   align-items: center;
   justify-content: flex-start;
`
const StyledNumberInList = styled.div`
   width: 22px;
   height: 12px;
   display: flex;
   justify-content: center;
   align-items: center;
   margin-right: 18px;
   font-family: 'Open Sans' sans-serif;
   font-style: normal;
   font-weight: 600;
   font-size: 20px;
   line-height: 22px;
   color: #1f6ed4;
`
const StyledOptionsContainer = styled.div`
   min-width: 376px;
   height: 24px;
   display: flex;
   justify-content: space-between;
   align-items: center;
`
