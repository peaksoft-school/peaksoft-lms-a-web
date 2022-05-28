import styled from '@emotion/styled'
import { Input } from '../../../UI/input/Input'
import { RadioButton } from '../../../UI/radioButton/RadioButton'
import { ReactComponent as Clone } from '../../../../assets/icons/clone.svg'
import { ReactComponent as Delete } from '../../../../assets/icons/Delete.svg'
import { Options } from './Options'

export const TestQuestion = () => {
   return (
      <StyledQuestionContainer>
         <QuestionContainer>
            <StyledNumberInList>1</StyledNumberInList>
            <StyledQuestion>
               <Input placeholder="Вопрос" />
            </StyledQuestion>
            <StyledOptionsContainer>
               <OneOfList>
                  <RadioButton />
                  <p>Один из списка</p>
               </OneOfList>
               <MoreOfList>
                  <RadioButton />
                  <p>Несколько из списка</p>
               </MoreOfList>
            </StyledOptionsContainer>
         </QuestionContainer>
         <StyledOptions>
            <RadioButton />
            <Options placeholder="Вариант 1" />
         </StyledOptions>
         <StyledFooterConatiner>
            <StyledAddOption>
               <AddOption>Добавить вариант</AddOption> или{' '}
               <AnotherOption>добавить вариант “Другое”</AnotherOption>
            </StyledAddOption>
            <StyledActions>
               <Clone />
               <Delete />
            </StyledActions>
         </StyledFooterConatiner>
      </StyledQuestionContainer>
   )
}

const StyledQuestionContainer = styled.div`
   min-width: 1140px;
   min-height: 210px;
   display: grid;
   grid-template-columns: 1fr;
   grid-template-rows: repeat(3, 1fr);
   grid-column-gap: 0px;
   grid-row-gap: 24px;
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
   width: 100%;
   height: 42px;
   display: flex;
   align-items: center;
   justify-content: flex-start;
   margin-right: 19px;
`
const StyledNumberInList = styled.div`
   width: 24px;
   height: 24px;
   display: flex;
   justify-content: center;
   align-items: center;
   margin-right: 18px;
   margin-left: 4px;
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
const OneOfList = styled.div`
   width: 157px;
   height: 24px;
   display: flex;
   justify-content: space-between;
   align-items: center;
   p {
      font-family: 'Open Sans' sans-serif;
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      line-height: 22px;
      color: #000000;
   }
`
const MoreOfList = styled.div`
   width: 195px;
   height: 24px;
   display: flex;
   justify-content: space-between;
   align-items: center;
   p {
      font-family: 'Open Sans' sans-serif;
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      line-height: 22px;
      color: #000000;
   }
`
const StyledFooterConatiner = styled.div`
   width: 100%;
   height: 45px;
   display: flex;
   justify-content: space-between;
   align-items: center;
`
const StyledAddOption = styled.div`
   width: 431px;
   height: 25px;
   display: flex;
   justify-content: space-between;
   align-items: center;
`
const StyledActions = styled.div`
   width: 68px;
   height: 25px;
   display: flex;
   justify-content: space-between;
   align-items: center;
   margin-right: 16px;
   path {
      fill: #9f9f9f;
   }
`
const AddOption = styled.span`
   font-family: 'Nunito' sans-serif;
   font-style: normal;
   font-weight: 400;
   font-size: 18px;
   line-height: 25px;
   letter-spacing: 0.002em;
   color: #7a7a7a;
`
const AnotherOption = styled.span`
   font-family: 'Nunito' sans-serif;
   font-style: normal;
   font-weight: 400;
   font-size: 18px;
   line-height: 25px;
   letter-spacing: 0.002em;
   color: #258aff;
`
const StyledOptions = styled.div`
   width: 100%;
   height: 56px;
   display: flex;
   justify-content: flex-start;
   align-items: center;
   input {
      margin-right: 12px;
   }
`
