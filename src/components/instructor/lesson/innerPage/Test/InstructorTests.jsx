import styled from '@emotion/styled'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getInstructorTests } from '../../../../../store/instructor-tests-slice'
import { ToggleSwitch } from '../../../../UI/switcher/ToggleSwitch'

export const InstructorTests = () => {
   const { tests } = useSelector((state) => state.instructorTests)
   const dispatch = useDispatch()

   useEffect(() => {
      dispatch(getInstructorTests(2))
   }, [])

   return (
      <>
         <Title>{tests.testName}</Title>
         <AnswersContainer>
            <InnerContainer>
               <p>0 ответов</p>
               <div>
                  <p>Ответы принимаются</p>
                  <ToggleSwitch id="1" name="ff" />
               </div>
            </InnerContainer>
         </AnswersContainer>
         <TableContainer>
            <p>Ответы принимаются</p>
         </TableContainer>
      </>
   )
}

const AnswersContainer = styled.div`
   width: 100%;
   height: 68px;
   display: flex;
   margin-right: 5px;
   background: rgba(54, 172, 12, 0.1);
   border: 1px solid #d4d4d4;
   border-radius: 10px;
   p {
      color: #36ac0c;
      font-size: 16px;
   }
`
const InnerContainer = styled.div`
   width: 100%;
   display: flex;
   justify-content: space-between;
   align-items: center;
   padding: 20px;
   div {
      display: flex;
      align-items: center;
      p {
         margin-right: 12px;
      }
   }
`
const TableContainer = styled.div`
   display: flex;
   align-items: center;
   justify-content: center;
   width: 100%;
   height: 68px;
   background: #ffffff;
   border-radius: 10px;
   border: 1px solid #d4d4d4;
   margin-top: 25px;
   p {
      color: #70757a;
   }
`
const Title = styled.h1`
   font-family: 'Open Sans', sans-serif;
   font-style: normal;
   font-weight: 600;
   font-size: 24px;
   line-height: 33px;
   color: #292929;
`
