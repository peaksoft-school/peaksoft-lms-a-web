import styled from '@emotion/styled'
import React from 'react'
import { useSelector } from 'react-redux'
import { ReactComponent as LinkIcon } from '../../../../assets/icons/linkIcon.svg'

export const Link = () => {
   const { linkText } = useSelector((state) => state.tasks)
   console.log(linkText)
   return (
      <LinkContainer>
         <LinkIcon />
         <p>{linkText}</p>
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
