import styled from '@emotion/styled'
import React from 'react'
import { ToggleSwitch } from '../../../../UI/switcher/ToggleSwitch'

export const InstructorTests = () => {
   return (
      <>
         <AnswersContainer>
            <InnerContainer>
               <p>0 ответов</p>
               <div>
                  <p>Ответы принимаются</p>
                  <ToggleSwitch id="1" name="ff" />
               </div>
            </InnerContainer>
         </AnswersContainer>
         <TableContainer>Ответы принимаются</TableContainer>
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
`
