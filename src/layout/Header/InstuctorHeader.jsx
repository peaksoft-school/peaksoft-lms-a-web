import styled from '@emotion/styled'
import React from 'react'
import { ReactComponent as ProfileIcon } from '../../assets/icons/Profile.svg'
import { ReactComponent as ArrowIcon } from '../../assets/icons/Arrows.svg'
import LinkTab from '../../components/UI/Tabs/Tabs'

const tabs = [
   {
      title: ' teachers',
      to: '/teachers',
   },
   {
      title: ' teachers',
      to: '/teachers',
   },
]
export const AdminHeader = () => {
   return (
      <Container>
         <StyledProfile>
            <ProfileIcon />
            <p>Инструктор</p>
            <ArrowIcon />
         </StyledProfile>
         <Rectangle />
         {/* <LinkTab tabs={tabs} /> */}
      </Container>
   )
}

const Rectangle = styled.div`
   position: absolute;
   width: 80%;
   height: 1px;
   top: 75px;
   left: 260px;
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
   left: 1280px;
   top: 10px;
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
const Container = styled.div`
   width: 100%;
   height: 15%;
`
