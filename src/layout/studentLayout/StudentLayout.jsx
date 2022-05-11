import React from 'react'
import styled from '@emotion/styled'
import { SideBar } from '../../components/UI/sideBar/SideBar'
import { STUDENTTABS } from '../../utils/constants/general'
import { StudentRoutes } from '../../routes/StudentRoutes'
import { Header } from '../header/Header'

export const StudentLayout = () => {
   return (
      <Wrapper>
         <SideBar tabs={STUDENTTABS} />
         <Container>
            <Header />
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
