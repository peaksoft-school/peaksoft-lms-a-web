import styled from '@emotion/styled'
import React from 'react'

export const Code = ({ code }) => {
   return (
      <Container>
         <code>{code.value}</code>
      </Container>
   )
}

const Container = styled.div`
   width: 338px;
   height: 308px;
   background: #eff0f4;
   border-radius: 2px;
   code {
      letter-spacing: 2px;
   }
`
