import styled from '@emotion/styled'
import React from 'react'
import { useDispatch } from 'react-redux'
import { ReactComponent as LinkIcon } from '../../../../assets/icons/linkIcon.svg'
import { ReactComponent as RemoveIcon } from '../../../../assets/icons/deleteIcon.svg'
import { taskActions } from '../../../../store/task-slice'

export const Link = ({ link }) => {
   const dispatch = useDispatch()

   const deleteLinkHandler = (id) => {
      dispatch(taskActions.deleteTask(id))
   }
   return (
      <Container>
         <StyledIcon id="container">
            <RemoveIcon
               id="remove"
               onClick={() => deleteLinkHandler(link.id)}
            />
            <LinkIcon id="link" />
         </StyledIcon>
         <a href={link.value}>{link.name}</a>
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
