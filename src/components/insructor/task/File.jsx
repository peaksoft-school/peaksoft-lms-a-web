import React, { useState } from 'react'
import styled from '@emotion/styled'
import { ReactComponent as FileIcon } from '../../../assets/icons/Frame.svg'

export const File = () => {
   return (
      <FileContainer>
         <FileIcon />
         <p>Название файла.формат</p>
      </FileContainer>
   )
}
const FileContainer = styled.div`
   display: flex;
   align-items: center;
   margin-left: 5px;
   height: 30px;
   svg {
      margin-right: 17px;
   }
`
