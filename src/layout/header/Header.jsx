import styled from '@emotion/styled'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ReactComponent as ProfileIcon } from '../../assets/icons/Profile.svg'
import { LogoutButton } from '../../components/UI/logoutButton/LogoutButton'
import { ReactComponent as BellIcon } from '../../assets/icons/Bell.svg'

export const Header = () => {
   const navigate = useNavigate()
   const logoutHandler = () => {
      navigate('/login')
   }

   const role = 'admin'

   let content
   switch (role) {
      case 'admin':
         content = (
            <StyledProfile>
               <ProfileIcon />
               <p>Администратор</p>
               <LogoutButton logoutHandler={logoutHandler} />
            </StyledProfile>
         )
         break
      case 'instructor':
         content = (
            <StyledProfile>
               <ProfileIcon />
               <p>Инструктор</p>
               <LogoutButton logoutHandler={logoutHandler} />
            </StyledProfile>
         )
         break
      case 'student':
         content = (
            <StyledProfile>
               <BellIcon />
               <ProfileIcon />
               <p>Инструктор</p>
               <LogoutButton logoutHandler={logoutHandler} />
            </StyledProfile>
         )
         break
      default:
         break
   }
   return (
      <Container>
         {content}
         <Rectangle />
      </Container>
   )
}

const Rectangle = styled.div`
   position: absolute;
   width: 80%;
   height: 1px;
   top: 78px;
   left: 260px;
   background: #c4c4c4;
`
const StyledProfile = styled.div`
   display: flex;
   justify-content: space-around;
   align-items: center;
   padding: 8px;
   position: absolute;
   width: 213px;
   height: 46px;
   top: 15px;
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
   height: 70px;
   display: flex;
   justify-content: flex-end;
`
