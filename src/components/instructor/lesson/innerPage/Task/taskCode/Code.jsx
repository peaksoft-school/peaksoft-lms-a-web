import styled from '@emotion/styled'
import React from 'react'

export const Code = ({ code }) => {
   return (
      <Container>
         <span>
            <pre>
               <code>
                  <p>{code.value}</p>
               </code>
            </pre>
         </span>
      </Container>
   )
}

const Container = styled.div`
   width: min-content;
   background: #eff0f4;
   border-radius: 2px;
   font-size: 14px;
   padding: 1em;
   p {
      line-height: 2;
      font-size: 15px;
   }
`
