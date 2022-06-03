/* eslint-disable no-unused-expressions */
import styled from '@emotion/styled'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getSingleCourse } from '../../../../../store/courses-slice'
import { getInstructorTests } from '../../../../../store/instructor-tests-slice'
import { TEST_INFO } from '../../../../../utils/constants/general'
import { BreadCrumbs } from '../../../../UI/BreadCrumb/BreadCrumbs'
import { ToggleSwitch } from '../../../../UI/switcher/ToggleSwitch'
import { AppTable } from '../../../../UI/table/AppTable'

export const InstructorTests = () => {
   const dispatch = useDispatch()
   const { tests, singleCourse } = useSelector((state) => state.instructorTests)

   const { id } = useParams()
   const [toggle, setToggle] = useState(false)

   const toggler = () => {
      toggle ? setToggle(false) : setToggle(true)
   }

   const breadcrumbs = [
      { path: 'instructor/instructor_course', name: 'Мои Курсы' },
      {
         path: 'instructor/tests',
         name: singleCourse?.courseName,
      },
      {
         path: 'instructor/instructors',
         name: <StyledTestName> {tests?.testName}</StyledTestName>,
      },
   ]

   const answers = toggle ? (
      <p className="green">0 ответов</p>
   ) : (
      <p className="red">4 ответов</p>
   )

   const acceptAnswers = toggle ? (
      <p className="green">Ответы принимаются</p>
   ) : (
      <p className="red">Ответы не принимаются</p>
   )

   useEffect(() => {
      dispatch(getInstructorTests(4))
      dispatch(getSingleCourse(id))
   }, [])

   const TEST_RESULTS = [
      {
         fullName: 'Baya Asanova',
         date: '2022-06-02',
         result: 'FAILED',
         grade: '50%',
      },
      {
         fullName: 'Baya Asanova',
         date: '2022-06-02',
         result: 'FAILED',
         grade: '50%',
      },
   ]

   return (
      <Wrapper>
         <TitleContainer>
            <h1>{tests.testName}</h1>
            <BreadCrumbs pathsArray={breadcrumbs} />
         </TitleContainer>
         <AnswersContainer>
            <div
               className={toggle ? 'answers-accepted' : 'no-answers-accepted'}
            >
               <InnerContainer>
                  {answers}
                  <div>
                     {acceptAnswers}
                     <ToggleSwitch id="1" name={toggle} onClick={toggler} />
                  </div>
               </InnerContainer>
            </div>
         </AnswersContainer>
         <AppTable data={TEST_RESULTS} columns={TEST_INFO} />
      </Wrapper>
   )
}
const Wrapper = styled.div`
   width: 100%;
`
const AnswersContainer = styled.div`
   .answers-accepted {
      height: 68px;
      display: flex;
      margin-right: 5px;
      background: rgba(54, 172, 12, 0.1);
      border: 1px solid #d4d4d4;
      border-radius: 10px;
   }
   .no-answers-accepted {
      height: 68px;
      display: flex;
      margin-right: 5px;
      border: 1px solid #d4d4d4;
      border-radius: 10px;
      background: rgba(201, 30, 30, 0.1);
   }
   p {
      color: #36ac0c;
      font-size: 16px;
   }
`
const InnerContainer = styled.div`
   display: flex;
   justify-content: space-between;
   align-items: center;
   width: 100%;
   padding: 20px;
   div {
      display: flex;
      align-items: center;
      p {
         margin-right: 12px;
      }
   }
   .green {
      color: #36ac0c;
   }
   .red {
      color: #c91e1e;
   }
`
const TitleContainer = styled.div`
   display: flex;
   height: 60px;
   h1 {
      font-family: 'Open Sans', sans-serif;
      font-style: normal;
      font-weight: 600;
      font-size: 24px;
      line-height: 33px;
      color: #292929;
      margin-top: 11px;
   }
`
const StyledTestName = styled.p`
   color: #1f6ed4;
   font-family: sans-serif;
   font-weight: 600;
   font-size: 14px;
   letter-spacing: 0.04em;
`
