import styled from '@emotion/styled'
import React from 'react'
import { NavLink } from 'react-router-dom'
import { ReactComponent as Logo } from '../../../assets/icons/Logo.svg'

export const SideBar = ({ tabs }) => {
   return (
      <Container>
         <StyledLogo>
            <Logo />
         </StyledLogo>
         <div>
            {tabs.map((item) => (
               <StyledContainer
                  key={item.title}
                  to={item.pathName}
                  className={(isActive) => isActive && 'active'}
               >
                  <StyledDiv>
                     {item.icon}
                     <p>{item.title}</p>
                  </StyledDiv>
               </StyledContainer>
            ))}
         </div>
      </Container>
   )
}

const Container = styled.div`
   width: 240px;
   height: 100vh;
   background-color: #ffffff;
   padding-top: 31px;
`
const StyledLogo = styled.div`
   width: 142px;
   height: 42;
   margin-left: 49px;
   margin-bottom: 62px;
`
const StyledContainer = styled(NavLink)`
   &.active {
      color: #1f6ed4;
      background: #dde9f9;
      border-radius: 0px 10px 10px 0px;
      border-left: 4px solid blue;
      p {
         color: #1f6ed4;
      }
   }
   border-left: 4px solid transparent;
   width: 220px;
   height: 50px;
   display: flex;
   align-items: center;
   text-decoration: none;
   color: #292929;
`
const StyledDiv = styled.div`
   margin-left: 40px;
   display: flex;
   & p {
      margin-left: 18px;
      font-family: 'Open Sans', sans-serif;
      font-weight: 600;
      line-height: 22px;
   }
`
