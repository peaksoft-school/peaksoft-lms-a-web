import styled from '@emotion/styled'
import React from 'react'
import { Input } from '../../UI/input/Input'
import { ReactComponent as CodeIcon } from '../../../assets/icons/code.svg'

export const Code = () => {
   return (
      <CodeContainer>
         <CodeIcon />
         <Input placeholder="Вставьте код" />
      </CodeContainer>
   )
}
const CodeContainer = styled.div`
   display: flex;
   align-items: center;
   height: 40px;
   margin-top: 10px;
   width: 515px;
   svg {
      margin-right: 17px;
   }
`
