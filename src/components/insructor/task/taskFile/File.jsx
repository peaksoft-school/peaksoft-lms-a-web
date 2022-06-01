import styled from '@emotion/styled'
import React from 'react'
import { useSelector } from 'react-redux'
import { ReactComponent as FileIcon } from '../../../../assets/icons/Frame.svg'
import { ReactComponent as RemoveIcon } from '../../../../assets/icons/deleteIcon.svg'

export const File = () => {
   const { file } = useSelector((state) => state.tasks)
   return (
      <>
         {file.fileName.map((el) => (
            <Container>
               <StyledIcon id="container">
                  <RemoveIcon id="remove" />
                  <FileIcon id="file" />
               </StyledIcon>
               <p>{el.fileName}</p>
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
      #file {
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
