import React from 'react'
import styled from '@emotion/styled'
import { Outlet } from 'react-router-dom'
import { AdminDashboard } from '../layout/Dashboard/AdminDashboard'
import { AdminHeader } from '../layout/Header/AdminHeader'

export const AdminPage = () => {
   return (
      <Wrapper>
         <AdminDashboard />
         <Container>
            <AdminHeader />
            <Outlet />
         </Container>
      </Wrapper>
   )
}

const Wrapper = styled.div`
   display: flex;
   width: 100%;
`
const Container = styled.div`
   display: flex;
   flex-direction: column;
   margin: 20px;
   width: 80%;
`
