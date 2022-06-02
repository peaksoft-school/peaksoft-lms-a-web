import styled from '@emotion/styled'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ReactComponent as LinkIcon } from '../../../../assets/icons/linkIcon.svg'
import { ReactComponent as RemoveIcon } from '../../../../assets/icons/deleteIcon.svg'
import { taskActions } from '../../../../store/task-slice'

export const Link = () => {
   const dispatch = useDispatch()
   const { links } = useSelector((state) => state.tasks)

   const deleteLinkHandler = (index) => {
      dispatch(taskActions.deleteLink(index))
   }
   return (
      <>
         {links.map((el, i) => (
            <Container key={el.id}>
               <StyledIcon id="container">
                  <RemoveIcon
                     id="remove"
                     onClick={() => deleteLinkHandler(i)}
                  />
                  <LinkIcon id="link" />
               </StyledIcon>
               <a href={el.link}>{el.linkText}</a>
            </Container>
         ))}
      </>
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
