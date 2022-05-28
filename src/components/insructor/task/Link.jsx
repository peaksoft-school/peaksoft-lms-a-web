import styled from '@emotion/styled'
import React from 'react'
import { ReactComponent as LinkIcon } from '../../../assets/icons/linkIcon.svg'

export const Link = () => {
   return (
      <LinkContainer>
         <LinkIcon />
         <p>Название ссылки</p>
      </LinkContainer>
   )
}
const LinkContainer = styled.div`
   display: flex;
   align-items: center;
   margin-left: 5px;
   height: 30px;
   margin-top: 25px;
   svg {
      margin-right: 17px;
   }
`
