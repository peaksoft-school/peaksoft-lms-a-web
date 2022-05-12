import styled from '@emotion/styled'
import React from 'react'

export const Button = (props) => {
   return <StyledButton {...props}>{props.children}</StyledButton>
}

const StyledButton = styled.button`
   color: ${({ color }) => color || 'white'};
   background: ${({ background }) => background || ''};
   border: ${({ border }) => border || 'none'};
   padding: 10px 24px 10px 24px;
   border-radius: 8px;
   outline: none;
   font-weight: 500;
   font-size: 14px;
   line-height: 20px;
   letter-spacing: 0.07em;
   &:hover {
      background: ${({ bgHover }) => bgHover || ''};
   }
   &:active {
      background: ${({ bgActive }) => bgActive || ''};
   }
   &:disabled {
      background: ${({ disabled }) => disabled || ''};
   }
`
