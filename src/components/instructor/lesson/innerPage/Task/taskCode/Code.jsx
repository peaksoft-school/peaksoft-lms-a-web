import styled from '@emotion/styled'
import React from 'react'

export const Code = ({ code }) => {
   return (
      <Container>
         <span>
            <pre>
               <p>{code.value}</p>
            </pre>
         </span>
      </Container>
   )
}

const Container = styled.div`
   width: 500px;
   height: 308px;
   background: #eff0f4;
   border-radius: 2px;
   font-size: 14px;
   /* display: flex;
   justify-content: center; */
   span {
      display: flex;
      justify-content: center;
      width: 338px;
      height: 308px;
   }
   pre {
      tab-size: 40;
   }
   p {
      line-height: 2;
      width: 338px;
      height: 308px;
   }
`
