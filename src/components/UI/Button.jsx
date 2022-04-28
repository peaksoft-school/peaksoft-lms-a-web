import styled from '@emotion/styled'
import React from 'react'

export const Button = ({ children }) => {
   return <WrapperButton>{children}</WrapperButton>
}

const WrapperButton = styled.button`
   background-color: #3772ff;
   height: 40px;
   padding: 10px 24px 10px 16px;
   color: white;
   border-radius: 8px;
   letter-spacing: 1px;
   font-size: 16px;
   border: none;
   outline: none;
   &:hover {
      background-color: #104bd3;
   }
   &:active {
      background-color: #6190ff;
   }
`
