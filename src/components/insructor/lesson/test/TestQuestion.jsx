import styled from '@emotion/styled'
import { Input } from '../../../UI/input/Input'
import { Button } from '../../../UI/button/Button'
import { RadioButton } from '../../../UI/radioButton/RadioButton'
import { ReactComponent as Clone } from '../../../../assets/icons/clone.svg'
import { ReactComponent as Delete } from '../../../../assets/icons/Delete.svg'
import { ReactComponent as AddIcon } from '../../../../assets/icons/VectorAdd.svg'
import { OneOfTheList } from './OneOfTheList'
import { FewFromTheList } from './FewFromTheList'

export const TestQuestion = () => {
   return (
      <>
         <StyledQuestionContainer>
            <QuestionContainer>
               <StyledNumberInList>1</StyledNumberInList>
               <StyledQuestion>
                  <Input placeholder="Вопрос" />
               </StyledQuestion>
               <StyledOptionsContainer>
                  <OneOfList>
                     <RadioButton id="one" name="option of variants" />
                     <label htmlFor="one">Один из списка</label>
                  </OneOfList>
                  <MoreOfList>
                     <RadioButton id="more" name="option of variants" />
                     <label htmlFor="more">Несколько из списка</label>
                  </MoreOfList>
               </StyledOptionsContainer>
            </QuestionContainer>
            <OptionsContainer>
               <OneOfTheList name="question-1" placeholder="Вариант 1" />
               {/* <OneOfTheList name="question-1" placeholder="Вариант 2" /> */}
               {/* <FewFromTheList name="question-1" placeholder="Вариант 3" /> */}
               {/* <FewFromTheList name="question-1" placeholder="Вариант 4" /> */}
            </OptionsContainer>
            <StyledFooterConatiner>
               <StyledAddOption>
                  <AddOption>Добавить вариант</AddOption> или
                  <AnotherOption>добавить вариант “Другое”</AnotherOption>
               </StyledAddOption>
               <StyledActions>
                  <Clone />
                  <Delete />
               </StyledActions>
            </StyledFooterConatiner>
         </StyledQuestionContainer>
         <StyledButtonContainer>
            <Button
               background="none"
               border="1px solid #3772FF"
               color="#3772FF"
            >
               Отмена
            </Button>
            <Button background="#3772FF" bgHover="#1D60FF" bgActive="#6190FF">
               Сохранить
            </Button>
         </StyledButtonContainer>
         <StyledAddOptionIcon>
            <AddIcon />
         </StyledAddOptionIcon>
      </>
   )
}

const StyledQuestionContainer = styled.div`
   min-width: 1140px;
   min-height: 210px;
   display: grid;
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
   label {
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
   margin-left: 35px;
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
const OptionsContainer = styled.div`
   width: 100%;
   min-height: 56px;
   display: flex;
   align-items: center;
   flex-direction: column;
   gap: 10px;
`
const StyledButtonContainer = styled.div`
   width: 100%;
   height: 45px;
   display: flex;
   align-items: center;
   justify-content: flex-end;
   button {
      margin-left: 10px;
   }
`
const StyledAddOptionIcon = styled.button`
   position: fixed;
   width: 58px;
   height: 58px;
   left: 93%;
   top: 80%;
   border-radius: 50%;
   border: none;
   display: flex;
   align-items: center;
   justify-content: center;
   background: linear-gradient(225deg, #fa2b56 0%, #f91c3d 100%);
   svg {
      width: 21px;
      height: 21px;
   }
`
