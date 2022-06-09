import styled from '@emotion/styled'
import { useDispatch, useSelector } from 'react-redux'
import { Input } from '../../../UI/input/Input'
import { RadioButton } from '../../../UI/radioButton/RadioButton'
import { ReactComponent as Clone } from '../../../../assets/icons/clone.svg'
import { ReactComponent as Delete } from '../../../../assets/icons/Delete.svg'
import { SingleChoice } from './SingleChoice'
import { MultipleChoice } from './MultipleChoice'
import { testActions } from '../../../../store/create-test-slice'

export const TestQuestion = () => {
   const dispatch = useDispatch()
   const { questions } = useSelector((state) => state.createTest.test)

   const onGetOptionValue = (event, questionId, optionId) => {
      dispatch(
         testActions.saveOptionData({
            optionValue: event.target.value,
            questionId,
            optionId,
         })
      )
   }

   const onGetQuestionValue = (e, questionId) => {
      dispatch(
         testActions.saveQuestionData({
            questionValue: e.target.value,
            questionId,
         })
      )
   }

   const addOption = (id) => {
      dispatch(testActions.addOption(id))
   }

   const addVariantAnother = (id) => {
      dispatch(testActions.addOptionAnother(id))
   }

   const deleteOption = (optionId, questionId) => {
      dispatch(testActions.deleteOption({ optionId, questionId }))
   }

   const deleteQuestion = (id) => {
      dispatch(testActions.deleteQuestion(id))
   }

   const onChooseVariantOne = (id) => {
      dispatch(testActions.changeOptionToMore(id))
   }

   const onChooseVariantMore = (id) => {
      dispatch(testActions.changeOptionToOne(id))
   }

   const chooseCorrectOptionFromMany = (
      questionId,
      optionId,
      checked,
      type
   ) => {
      dispatch(
         testActions.chooseOptionMany({ questionId, optionId, checked, type })
      )
   }

   const chooseCorrectOptionFromOne = (questionId, optionId) => {
      dispatch(testActions.chooseOptionOne({ questionId, optionId }))
   }

   const onCloneQuestion = (id) => {
      dispatch(testActions.cloneQuestion(id))
   }

   return (
      <>
         {questions.map((question, i) => (
            <StyledQuestionContainer key={question.id}>
               <QuestionContainer>
                  <StyledNumberInList>{i + 1}</StyledNumberInList>
                  <StyledQuestion>
                     <Input
                        placeholder="Вопрос"
                        value={question.question}
                        onChange={(e) => onGetQuestionValue(e, question.id)}
                     />
                  </StyledQuestion>
                  <StyledOptionsContainer>
                     <OneOfList>
                        <RadioButton
                           id="one"
                           name={`option of variants ${question.id}`}
                           onChange={() => onChooseVariantMore(question.id)}
                           checked={question.questionType === 'ONE'}
                        />
                        <label htmlFor="one">Один из списка</label>
                     </OneOfList>
                     <MoreOfList>
                        <RadioButton
                           id="more"
                           name={`option of variants ${question.id}`}
                           onChange={() => onChooseVariantOne(question.id)}
                           checked={question.questionType === 'MANY'}
                        />
                        <label htmlFor="more">Несколько из списка</label>
                     </MoreOfList>
                  </StyledOptionsContainer>
               </QuestionContainer>
               {question.options.map((option) => (
                  <OptionsContainer key={option.id}>
                     {(question.questionType === 'ONE' && (
                        <SingleChoice
                           optionName={`option ${question.id}`}
                           placeholder={`Вариант ${option.id}`}
                           checked={option.isTrue}
                           onClick={() => deleteOption(option.id, question.id)}
                           inputValue={option.option}
                           inputDisabled={option.option === 'Другое...'}
                           onChangeOption={() =>
                              chooseCorrectOptionFromOne(question.id, option.id)
                           }
                           onGetInputValue={(e) =>
                              onGetOptionValue(e, question.id, option.id)
                           }
                        />
                     )) || (
                        <MultipleChoice
                           placeholder={`Вариант ${option.id}`}
                           onClick={() => deleteOption(option.id, question.id)}
                           inputValue={option.option}
                           checked={option.isTrue}
                           inputDisabled={option.option === 'Другое...'}
                           onChangeOption={(e) =>
                              chooseCorrectOptionFromMany(
                                 question.id,
                                 option.id,
                                 e.target.checked,
                                 e.type
                              )
                           }
                           onGetInputValue={(e) =>
                              onGetOptionValue(e, question.id, option.id)
                           }
                        />
                     )}
                  </OptionsContainer>
               ))}
               <StyledFooterConatiner>
                  <StyledAddOption>
                     <AddOption onClick={() => addOption(question.id)}>
                        Добавить вариант
                     </AddOption>
                     или
                     <AnotherOption
                        onClick={() => addVariantAnother(question.id)}
                     >
                        добавить вариант “Другое”
                     </AnotherOption>
                  </StyledAddOption>
                  <StyledActions>
                     <Clone
                        onClick={() => onCloneQuestion(question.id)}
                        cursor="pointer"
                     />
                     <Delete
                        onClick={() => deleteQuestion(question.id)}
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
