import React from 'react'
import styled from '@emotion/styled'
import { Dashboard } from '../../components/UI/dashboard/Dashboard'
import { STUDENTTABS } from '../../utils/constants/general'
import { StudentRoutes } from '../../routes/StudentRoutes'
import { StudentHeader } from './header/StudentHeader'

export const StudentLayout = () => {
   return (
      <Wrapper>
         <Dashboard tabs={STUDENTTABS} />
         <Container>
            <StudentHeader />
            <StudentRoutes />
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
