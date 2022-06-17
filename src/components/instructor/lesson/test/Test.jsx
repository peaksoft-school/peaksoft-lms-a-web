import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import styled from '@emotion/styled'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from '../../../UI/button/Button'
import { TestQuestion } from './TestQuestion'
import { TestTitle } from './TestTitle'
import { ReactComponent as AddIcon } from '../../../../assets/icons/VectorAdd.svg'
import {
   addTest,
   editTest,
   testActions,
} from '../../../../store/INSTRUCTOR/create-test-slice'
import { TEST_KEY } from '../../../../utils/constants/general'
import { localStorageHelper } from '../../../../utils/helpers/general'
import {
   showErrorMessage,
   showSuccessMessage,
} from '../../../UI/notification/Notification'
import { Spinner } from '../../../UI/Spinner/Spinner'

const Test = () => {
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const { id, lessonId, testId } = useParams()
   const { test, isLoading } = useSelector((state) => state.createTest)

   const addQuestionHandler = () => {
      dispatch(testActions.addQuestion())
   }

   const onCancelTest = () => {
      navigate(`/instructor/instructor_course/${id}/materials`, {
         replace: true,
      })
      dispatch(testActions.clearTest())
      localStorageHelper.clear(TEST_KEY)
   }

   const sendTestHandler = () => {
      const currentTest = { ...test }
      const questions = currentTest.questions.map((question) => {
         return {
            question: question.question,
            questionType: question.questionType,
            options: question.options.map((option) => {
               return { option: option.option, isTrue: option.isTrue }
            }),
         }
      })
      const newTest = { ...currentTest, questions }
      dispatch(addTest({ value: newTest, id: lessonId }))
         .unwrap()
         .then(() => {
            showSuccessMessage('Тест успешно создан')
            onCancelTest()
            dispatch(testActions.clearTest())
         })
         .catch((error) => {
            showErrorMessage(error)
         })
   }

   const sendEditedTestData = () => {
      dispatch(editTest({ value: test, id: testId }))
         .unwrap()
         .then(() => {
            showSuccessMessage('Изменения успешно сохранены')
            onCancelTest()
            dispatch(testActions.clearTest())
         })
         .catch(() => {
            showErrorMessage('Не удалось изменить данные')
         })
   }

   useEffect(() => {
      window.onbeforeunload = () => {
         return localStorageHelper.store(TEST_KEY, test)
      }
   }, [test])

   return (
      <div>
         {(isLoading && <Spinner />) || (
            <StyledContainer>
               <TestTitle testName={test.testName} />
               <TestQuestion />
               <StyledButtonContainer>
                  <Button
                     background="none"
                     border="1px solid #3772FF"
                     color="#3772FF"
                     onClick={onCancelTest}
                  >
                     Отмена
                  </Button>
                  <Button
                     background="#3772FF"
                     bgHover="#1D60FF"
                     bgActive="#6190FF"
                     onClick={testId ? sendEditedTestData : sendTestHandler}
                  >
                     Сохранить
                  </Button>
               </StyledButtonContainer>
               <StyledAddOptionIcon onClick={addQuestionHandler}>
                  <AddIcon />
               </StyledAddOptionIcon>
            </StyledContainer>
         )}
      </div>
   )
}
export default Test

const StyledContainer = styled.div`
   display: grid;
   grid-template-columns: 1fr;
   grid-template-rows: repeat(1, 1fr);
   grid-column-gap: 0px;
   grid-row-gap: 20px;
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
   cursor: pointer;
   svg {
      width: 21px;
      height: 21px;
   }
`
