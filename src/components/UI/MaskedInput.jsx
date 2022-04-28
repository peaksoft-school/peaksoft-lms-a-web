import styled from '@emotion/styled'
import React from 'react'
import InputMask from 'react-input-mask'

export const MaskedInput = (props) => {
   return <Input mask={'+\\9\\9\\6\\ 999 99 99 99'} {...props} />
}

const Input = styled(InputMask)`
   display: flex;
   flex-direction: row;
   align-items: center;
   padding: 10px 8px 10px 18px;
   width: ${({ width }) => width || '491px'};
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
