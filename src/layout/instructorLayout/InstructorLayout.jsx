import React from 'react'
import styled from '@emotion/styled'
import { AdminHeader } from '../adminLayout/header/AdminHeader'
import { Dashboard } from '../../components/UI/dashboard/Dashboard'
import { INSTRUCTORTABS } from '../../utils/constants/general'
import { InstructorRoutes } from '../../routes/InstructorRoutes'

export const InstructorLayout = () => {
   return (
      <Wrapper>
         <Dashboard tabs={INSTRUCTORTABS} />
         <Container>
            <AdminHeader />
            <InstructorRoutes />
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
