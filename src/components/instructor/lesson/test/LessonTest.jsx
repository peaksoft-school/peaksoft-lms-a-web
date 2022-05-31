/* eslint-disable no-param-reassign */
import { useEffect } from 'react'
import styled from '@emotion/styled'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from '../../../UI/button/Button'
import { TestQuestion } from './TestQuestion'
import { TestTitle } from './TestTitle'
import { ReactComponent as AddIcon } from '../../../../assets/icons/VectorAdd.svg'
import { testActions } from '../../../../store/create-test-slice'
import { TEST_KEY } from '../../../../utils/constants/general'
import { localStorageHelper } from '../../../../utils/helpers/general'

export const LessonTest = () => {
   const dispatch = useDispatch()
   const testState = useSelector((state) => state.createTest)

   const addQuestionHandler = () => {
      dispatch(testActions.addQuestion())
   }
   const sendTestDataHandler = () => {
      // dispatch(testActions.test())
      console.log(testState)
   }

   useEffect(() => {
      window.onbeforeunload = () => {
         return localStorageHelper.store(TEST_KEY, testState)
      }
   }, [testState])

   return (
      <StyledContainer>
         <TestTitle testName={testState.testName} />
         <TestQuestion />
         <StyledButtonContainer>
            <Button
               background="none"
               border="1px solid #3772FF"
               color="#3772FF"
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
