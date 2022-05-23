import React from 'react'
import styled from '@emotion/styled'
import { Header } from '../header/Header'
import { SideBar } from '../../components/UI/sideBar/SideBar'
import { INSTRUCTORTABS } from '../../utils/constants/general'
import { InstructorRoutes } from '../../routes/InstructorRoutes'

export const InstructorLayout = () => {
   return (
      <Wrapper>
         <SideBar tabs={INSTRUCTORTABS} />
         <Container>
            <Header />
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
   width: 83%;
   margin-left: 270px;
`
