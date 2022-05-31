import { useState } from 'react'
import styled from '@emotion/styled'
import { Input } from '../../../UI/input/Input'
import { RadioButton } from '../../../UI/radioButton/RadioButton'
import { ReactComponent as Clone } from '../../../../assets/icons/clone.svg'
import { ReactComponent as Delete } from '../../../../assets/icons/Delete.svg'
import { OneOfTheList } from './OneOfTheList'
import { FewFromTheList } from './FewFromTheList'

export const TestQuestion = ({
   questions,
   onAddOption,
   onDeleteOption,
   onDeleteQuestion,
}) => {
   const [variantsOption, setVariantsOption] = useState(false)

   const onChooseVariantsOption = () => {
      setVariantsOption((prevState) => !prevState)
   }

   return (
      <>
         {questions.map((question) => (
            <StyledQuestionContainer key={question.id}>
               <QuestionContainer>
                  <StyledNumberInList>{question.id}</StyledNumberInList>
                  <StyledQuestion>
                     <Input placeholder="Вопрос" />
                  </StyledQuestion>
                  <StyledOptionsContainer>
                     <OneOfList>
                        <RadioButton
                           id="one"
                           name={`option of variants ${question.id}`}
                           onChange={onChooseVariantsOption}
                           checked={!variantsOption}
                        />
                        <label htmlFor="one">Один из списка</label>
                     </OneOfList>
                     <MoreOfList>
                        <RadioButton
                           id="more"
                           name={`option of variants ${question.id}`}
                           onChange={onChooseVariantsOption}
                           checked={variantsOption}
                        />
                        <label htmlFor="more">Несколько из списка</label>
                     </MoreOfList>
                  </StyledOptionsContainer>
               </QuestionContainer>
               {question.options.map((option) => (
                  <OptionsContainer key={option.id}>
                     {(!variantsOption && (
                        <OneOfTheList
                           name={`option ${question.id}`}
                           placeholder={`Вариант ${option.id}`}
                           onClick={() =>
                              onDeleteOption(option.id, question.id)
                           }
                        />
                     )) || (
                        <FewFromTheList
                           placeholder={`Вариант ${option.id}`}
                           onClick={() =>
                              onDeleteOption(option.id, question.id)
                           }
                        />
                     )}
                  </OptionsContainer>
               ))}
               <StyledFooterConatiner>
                  <StyledAddOption>
                     <AddOption onClick={() => onAddOption(question.id)}>
                        Добавить вариант
                     </AddOption>
                     или
                     <AnotherOption>добавить вариант “Другое”</AnotherOption>
                  </StyledAddOption>
                  <StyledActions>
                     <Clone />
                     <Delete
                        onClick={() => onDeleteQuestion(question.id)}
                        cursor="pointer"
                     />
                  </StyledActions>
               </StyledFooterConatiner>
            </StyledQuestionContainer>
         ))}
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
   cursor: pointer;
`
const AnotherOption = styled.span`
   font-family: 'Nunito' sans-serif;
   font-style: normal;
   font-weight: 400;
   font-size: 18px;
   line-height: 25px;
   letter-spacing: 0.002em;
   color: #258aff;
   cursor: pointer;
`
const OptionsContainer = styled.div`
   width: 100%;
   min-height: 56px;
   display: flex;
   align-items: center;
   flex-direction: column;
   gap: 10px;
`
