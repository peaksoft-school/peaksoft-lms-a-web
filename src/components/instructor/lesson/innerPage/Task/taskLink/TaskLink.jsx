import styled from '@emotion/styled'
import React from 'react'

export const TaskLink = ({ link }) => {
   return (
      <StyledLink>
         <a href={link.value}>{link.name}</a>
      </StyledLink>
   )
}

const StyledLink = styled.div`
   a {
      color: #3772ff;
      font-size: 18px;
   }
`
