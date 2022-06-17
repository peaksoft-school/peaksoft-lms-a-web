import styled from '@emotion/styled'
import React, { forwardRef } from 'react'

export const Input = forwardRef((props, ref) => {
   return <InputWrapper {...props} ref={ref} autoComplete="off" />
})

const InputWrapper = styled.input`
   display: flex;
   flex-direction: row;
   align-items: center;
   padding: 10px 8px 10px 18px;
   width: 100%;
   background: #ffffff;
   border: ${({ invalid }) =>
      invalid ? '1px solid red' : '1px solid #d4d4d4'};
   box-sizing: border-box;
   border-radius: 10px;
   font-family: 'Open Sans', sans-serif;
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
