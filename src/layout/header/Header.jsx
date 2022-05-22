import styled from '@emotion/styled'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { ReactComponent as ProfileIcon } from '../../assets/icons/Profile.svg'
import { LogoutButton } from '../../components/UI/logoutButton/Logoutbutton'
import { ReactComponent as BellIcon } from '../../assets/icons/Bell.svg'
import { logOut } from '../../store/authSlice'
import { ROUTES } from '../../utils/constants/general'

export const Header = () => {
   const navigate = useNavigate()
   const dispatch = useDispatch()
   const { role } = useSelector((state) => state.auth.user)
   const logoutHandler = () => {
      dispatch(logOut())
      navigate(ROUTES.LOGIN)
   }

   let content
   switch (role) {
      case 'ADMIN':
         content = (
            <StyledProfile>
               <ProfileIcon />
               <p>Администратор</p>
               <LogoutButton logoutHandler={logoutHandler} />
            </StyledProfile>
         )
         break
      case 'INSTRUCTOR':
         content = (
            <StyledProfile>
               <ProfileIcon />
               <p>Инструктор</p>
               <LogoutButton logoutHandler={logoutHandler} />
            </StyledProfile>
         )
         break
      case 'STUDENT':
         content = (
            <StyledProfile>
               <BellIcon />
               <ProfileIcon />
               <p>Student</p>
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
   width: 83%;
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
