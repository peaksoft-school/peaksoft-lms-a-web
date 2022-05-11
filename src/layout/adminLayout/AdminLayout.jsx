import React from 'react'
import styled from '@emotion/styled'
import { Header } from '../header/Header'
import { Dashboard } from '../../components/UI/dashboard/Dashboard'
import { ADMINTABS } from '../../utils/constants/general'
import { AdminRoutes } from '../../routes/AdminRoutes'

export const AdminLayout = () => {
   return (
      <Wrapper>
         <Dashboard tabs={ADMINTABS} />
         <Container>
            <Header />
            <AdminRoutes />
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
