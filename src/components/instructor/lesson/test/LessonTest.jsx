import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import styled from '@emotion/styled'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from '../../../UI/button/Button'
import { TestQuestion } from './TestQuestion'
import { TestTitle } from './TestTitle'
import { ReactComponent as AddIcon } from '../../../../assets/icons/VectorAdd.svg'
import { addTest, testActions } from '../../../../store/create-test-slice'
import { TEST_KEY } from '../../../../utils/constants/general'
import { localStorageHelper } from '../../../../utils/helpers/general'
import {
   showErrorMessage,
   showSuccessMessage,
} from '../../../UI/notification/Notification'
import { Spinner } from '../../../UI/Spinner/Spinner'

export const LessonTest = () => {
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const { id, lessonId } = useParams()
   const { test, isLoading } = useSelector((state) => state.createTest)

   const addQuestionHandler = () => {
      dispatch(testActions.addQuestion())
   }

   const onCancelToCreateTest = () => {
      navigate(`/instructor/instructor_course/${id}/materials`, {
         replace: true,
      })
   }

   const sendTestDataHandler = () => {
      const testData = { ...test }
      const questions = testData.questions.map((question) => {
         return {
            question: question.question,
            questionType: question.questionType,
            options: question.options.map((option) => {
               return { option: option.option, isTrue: option.isTrue }
            }),
         }
      })
      const newTestData = { ...testData, questions }
      dispatch(addTest({ value: newTestData, id: lessonId }))
         .unwrap()
         .then(() => {
            showSuccessMessage('Тест успешно создан')
            onCancelToCreateTest()
            dispatch(testActions.clearTest())
            localStorageHelper.clear(TEST_KEY)
         })
         .catch((error) => {
            showErrorMessage(error)
         })
   }

   useEffect(() => {
      window.onbeforeunload = () => {
         return localStorageHelper.store(TEST_KEY, test)
      }
   }, [test])

   return (
      <StyledContainer>
         {(isLoading && <Spinner />) || <TestTitle testName={test.testName} />}
         {(isLoading && <Spinner />) || <TestQuestion />}
         <StyledButtonContainer>
            <Button
               background="none"
               border="1px solid #3772FF"
               color="#3772FF"
               onClick={onCancelToCreateTest}
            >
               Отмена
            </Button>
            <Button
               background="#3772FF"
               bgHover="#1D60FF"
               bgActive="#6190FF"
               onClick={sendTestDataHandler}
            >
               Сохранить
            </Button>
         </StyledButtonContainer>
         <StyledAddOptionIcon onClick={addQuestionHandler}>
            <AddIcon />
         </StyledAddOptionIcon>
      </StyledContainer>
   )
}

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
