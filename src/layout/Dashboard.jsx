import styled from '@emotion/styled'
import React from 'react'
import { ReactComponent as Logo } from '../assets/icons/Logo.svg'
import { ReactComponent as GroupsIcon } from '../assets/icons/group.svg'
import { ReactComponent as CoursesIcon } from '../assets/icons/courses.svg'
import { ReactComponent as TeachersIcon } from '../assets/icons/teacher.svg'
import { ReactComponent as StudentsIcon } from '../assets/icons/students.svg'

export const Dashboard = () => {
   return (
      <Container>
         <StyledLogo>
            <Logo />
         </StyledLogo>
         <div>
            <StyledContainer>
               <StyledDiv>
                  <GroupsIcon />
                  <p>Группы</p>
               </StyledDiv>
            </StyledContainer>
            <StyledContainer>
               <StyledDiv>
                  <CoursesIcon />
                  <p>Курсы</p>
               </StyledDiv>
            </StyledContainer>
            <StyledContainer>
               <StyledDiv>
                  <TeachersIcon />
                  <p>Учителя</p>
               </StyledDiv>
            </StyledContainer>
            <StyledContainer>
               <StyledDiv>
                  <StudentsIcon />
                  <p>Студенты</p>
               </StyledDiv>
            </StyledContainer>
         </div>
      </Container>
   )
}

const Container = styled.div`
   position: absolute;
   width: 240px;
   height: 100%;
   background-color: #ffffff;
`
const StyledLogo = styled.div`
   width: 142px;
   height: 42;
   margin: 32px 49px 62px;
`
const StyledContainer = styled.div`
   width: 224px;
   height: 50px;
   display: flex;
   align-items: center;
   &:hover {
      color: #1f6ed4;
      background: #dde9f9;
      border-radius: 0px 10px 10px 0px;
   }
`
const StyledDiv = styled.div`
   margin-left: 40px;
   display: flex;
   & p {
      margin-left: 18px;
      font-family: 'Open Sans', sans-serif;
      font-weight: 600;
      line-height: 22px;
      color: #292929;
   }
`
