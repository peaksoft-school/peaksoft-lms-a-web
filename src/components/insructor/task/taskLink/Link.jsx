import styled from '@emotion/styled'
import React from 'react'
import { useSelector } from 'react-redux'
import { ReactComponent as LinkIcon } from '../../../../assets/icons/linkIcon.svg'
import { ReactComponent as RemoveIcon } from '../../../../assets/icons/deleteIcon.svg'

export const Link = () => {
   const { linkText } = useSelector((state) => state.tasks)

   return (
      <Container>
         <StyledIcon id="container">
            <RemoveIcon id="remove" />
            <LinkIcon id="link" />
         </StyledIcon>
         <p>{linkText}</p>
      </Container>
   )
}
const Container = styled.div`
   display: flex;
   align-items: center;
   margin-left: 5px;
   margin-top: 10px;
   height: 30pxs;
   #remove {
      display: none;
   }
   &:hover {
      #remove {
         display: block;
      }
      #link {
         display: none;
      }
      #container {
         background: #c4c4c4;
         border-radius: 3px;
      }
   }
`
const StyledIcon = styled.div`
   width: 27px;
   height: 28px;
   display: flex;
   align-items: center;
   justify-content: center;
   margin-right: 10px;
   cursor: pointer;
   &:hover {
      background: #c4c4c4;
      border-radius: 3px;
   }
`
