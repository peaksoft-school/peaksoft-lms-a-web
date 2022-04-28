import styled from '@emotion/styled'
import React from 'react'

export const Input = (props) => {
   return <InputWrapper {...props} />
}

const InputWrapper = styled.input`
   display: flex;
   flex-direction: row;
   align-items: center;
   padding: 10px 8px 10px 18px;
   width: 491px;
   height: 42px;
   background: #ffffff;
   border: 1px solid #d4d4d4;
   box-sizing: border-box;
   border-radius: 10px;
   font-family: 'Open Sans';
   font-style: normal;
   font-weight: 300;
   font-size: 16px;
   line-height: 22px;
   gap: 10px;
   &:focus {
      outline: none !important;
      border: 1px solid #1f6ed4 !important;
   }
`
