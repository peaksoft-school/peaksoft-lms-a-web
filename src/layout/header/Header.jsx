import styled from '@emotion/styled'
import React from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { LogoutButton } from '../../components/UI/logoutButton/Logoutbutton'
import { logOut } from '../../store/authSlice'
import {
   COURSE_INNER_TABS,
   MATERIALS_INNER_TABS,
   ROUTES,
} from '../../utils/constants/general'
import NavTabs from '../../components/UI/tabs/Tabs'

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
            <>
               <Routes>
                  <Route
                     path={`${ROUTES.COURSES}/:id/*`}
                     element={<NavTabs tabs={COURSE_INNER_TABS} />}
                  />
               </Routes>
               <Container>
                  <LogoutButton
                     logoutHandler={logoutHandler}
                     title="Администратор"
                  />
                  <Rectangle />
               </Container>
            </>
         )
         break
      case 'INSTRUCTOR':
         content = (
            <Container>
               <Routes>
                  <Route
                     path={`${ROUTES.INSTRUCTOR_COURSES}/:id/materials`}
                     element={<NavTabs tabs={MATERIALS_INNER_TABS} />}
                  />
                  <Route
                     path={`${ROUTES.INSTRUCTOR_COURSES}/:id/students`}
                     element={<NavTabs tabs={MATERIALS_INNER_TABS} />}
                  />
               </Routes>
               <LogoutButton logoutHandler={logoutHandler} title="Инструктор" />
               <Rectangle />
            </Container>
         )
         break
      case 'STUDENT':
         content = (
            <Container>
               <LogoutButton logoutHandler={logoutHandler} title="Студент" />
               <Rectangle />
            </Container>
         )
         break
      default:
         break
   }
   return <div>{content}</div>
}
const Rectangle = styled.div`
   position: absolute;
   width: 81.5%;
   height: 1px;
   top: 78px;
   left: 260px;
   background: #c4c4c4;
`
const Container = styled.div`
   width: 100%;
   height: 70px;
   display: flex;
   justify-content: flex-end;
`
