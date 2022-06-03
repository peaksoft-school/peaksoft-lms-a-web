import styled from '@emotion/styled'
import React from 'react'
import { useDispatch } from 'react-redux'
import { ReactComponent as FileIcon } from '../../../../assets/icons/Frame.svg'
import { ReactComponent as RemoveIcon } from '../../../../assets/icons/deleteIcon.svg'
import { taskActions } from '../../../../store/task-slice'

export const File = ({ file }) => {
   const dispatch = useDispatch()

   const deleteFileHandler = (id) => {
      dispatch(taskActions.deleteTask(id))
   }

   return (
      <Container>
         <StyledIcon id="container">
            <RemoveIcon
               id="remove"
               onClick={() => deleteFileHandler(file.id)}
            />
            <FileIcon id="file" />
         </StyledIcon>
         <p>{file.fileName}</p>
      </Container>
   )
}

const Container = styled.div`
   display: flex;
   align-items: center;
   margin-left: 5px;
   margin-top: 10px;
   height: 30px;
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
