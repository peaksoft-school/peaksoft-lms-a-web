import styled from '@emotion/styled'
import React from 'react'

export const File = ({ file }) => {
   return (
      <StyledFile>
         <a href={file.value}>{file.name}</a>
      </StyledFile>
   )
}

const StyledFile = styled.div`
   a {
      color: #3772ff;
      font-size: 18px;
   }
`
