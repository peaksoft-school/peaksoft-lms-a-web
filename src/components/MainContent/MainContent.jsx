import styled from '@emotion/styled'
import { Card } from '@mui/material'
import React from 'react'
import { ReactComponent as ProfileIcon } from '../../assets/icons/Profile.svg'
import { ReactComponent as ArrowIcon } from '../../assets/icons/Arrows.svg'

export const MainContent = () => {
   return (
      <Container>
         <StyledProfile>
            <ProfileIcon />
            <p>Администратор</p>
            <ArrowIcon />
         </StyledProfile>
         <Rectangle />
         <Card />
      </Container>
   )
}

const Container = styled.div`
   position: absolute;
   width: 1140px;
   left: 260px;
   top: 15px;
`
const Rectangle = styled.div`
   position: absolute;
   width: 1220px;
   height: 1px;
   top: 75px;
   background: #c4c4c4;
`
const StyledProfile = styled.div`
   display: flex;
   flex-direction: row;
   justify-content: space-around;
   align-items: center;
   padding: 8px;
   position: absolute;
   width: 213px;
   height: 46px;
   left: 1000px;
   cursor: pointer;
   & p {
      font-family: 'Open Sans', sans-serif;
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      line-height: 22px;
      color: #232323;
   }
`
