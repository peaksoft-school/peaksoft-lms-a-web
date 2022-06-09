import styled from '@emotion/styled'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import {
   getAllResults,
   getInstructorTests,
   getLesson,
   getSingleCourse,
} from '../../../../../store/instructor-tests-slice'
import { TEST_INFO } from '../../../../../utils/constants/general'
import { BreadCrumbs } from '../../../../UI/breadCrumb/BreadCrumbs'
import { ToggleSwitch } from '../../../../UI/switcher/ToggleSwitch'
import { AppTable } from '../../../../UI/table/AppTable'

export const InstructorTests = () => {
   const dispatch = useDispatch()
   const { tests, course, results, lesson } = useSelector(
      (state) => state.instructorTests
   )
   const { id, lessonId, testId } = useParams()
   const [toggle, setToggle] = useState(false)

   const toggler = () => {
      return toggle ? setToggle(false) : setToggle(true)
   }

   const amount = results.length

   const Content = () => {
      if (amount === 0) {
         return (
            <Container>
               <p>Ответы принимаются </p>
            </Container>
         )
      }
      if (amount > 0) {
         return <AppTable data={results} columns={TEST_INFO} />
      }
      return amount
   }

   const currentClassName = (isActive) => {
      return isActive ? 'green' : 'red'
   }

   const breadcrumbs = [
      { path: 'instructor/instructor_course', name: course?.courseName },
      {
         path: 'instructor/materials',
         name: lesson?.lessonName,
      },
   ]

   useEffect(() => {
      dispatch(getInstructorTests(lessonId))
      dispatch(getSingleCourse(id))
      dispatch(getLesson(testId))
      dispatch(getAllResults())
   }, [])

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
                  <p className={currentClassName(toggle)}>{amount} ответов</p>
                  <div>
                     <p className={currentClassName(toggle)}>
                        {toggle
                           ? 'Ответы принимаются'
                           : 'Ответы не принимаются'}
                     </p>
                     <ToggleSwitch
                        id="1"
                        name={toggle.toString()}
                        onClick={toggler}
                     />
                  </div>
               </InnerContainer>
            </div>
         </AnswersContainer>
         {Content()}
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
const Container = styled.div`
   width: 100%;
   height: 69px;
   background: #ffffff;
   border: 1px solid #d4d4d4;
   border-radius: 10px;
   display: flex;
   align-items: center;
   justify-content: center;
   color: #70757a;
   margin-top: 20px;
   font-size: 18px;
`
