import styled from '@emotion/styled'
import React from 'react'

export const Button = (props) => {
   return <WrapperButton {...props}>{props.children}</WrapperButton>
}

const WrapperButton = styled.button`
   color: ${({ color }) => color || 'white'};
   background: ${({ background }) => background || ''};
   padding: 10px 24px 10px 16px;
   border-radius: 8px;
   border: none;
   outline: none;
   font-weight: 400;
   font-size: 14px;
   line-height: 20px;
   letter-spacing: 0.07em;
   &:hover {
      background-color: #1d60ff;
   }
   &:active {
      background-color: #6190ff;
   }
`
