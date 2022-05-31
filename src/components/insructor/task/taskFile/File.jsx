import styled from '@emotion/styled'
import React from 'react'
import { useSelector } from 'react-redux'
import { ReactComponent as FileIcon } from '../../../../assets/icons/Frame.svg'

export const File = () => {
   const { file } = useSelector((state) => state.tasks)
   return (
      <FileContainer>
         <FileIcon />
         <p>{file}</p>
      </FileContainer>
   )
}

const FileContainer = styled.div`
   display: flex;
   align-items: center;
   margin-left: 5px;
   height: 30pxs;
   svg {
      margin-right: 13px;
   }
`
