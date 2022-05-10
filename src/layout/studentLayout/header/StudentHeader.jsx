import styled from '@emotion/styled'
import React from 'react'
import { ReactComponent as ProfileIcon } from '../../../assets/icons/Profile.svg'
import LinkTabs from '../../../components/UI/tabs/Tabs'
import { ReactComponent as BellIcon } from '../../../assets/icons/Bell.svg'
import { Logout } from '../../../components/UI/logoutButton/Logoutbutton'

export const StudentHeader = () => {
   return (
      <Container>
         <StyledProfile>
            <BellIcon />
            <ProfileIcon />
            <p>Инструктор</p>
         </StyledProfile>
         <Rectangle />
      </Container>
   )
}
const tabs = [
   {
      title: 'student',
      to: '/tabs',
   },
   {
      title: 'student',
      to: '/sss',
   },
]
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
   justify-content: end;
   align-items: center;
   padding: 8px;
   position: absolute;
   width: 259px;
   justify-content: space-between;
   height: 46px;
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
   display: flex;
   justify-content: end;
   height: 15%;
`
