/* eslint-disable no-param-reassign */
import styled from '@emotion/styled'
import React from 'react'
import { useDispatch } from 'react-redux'
import { ReactComponent as CodeIcon } from '../../../../assets/icons/code.svg'
import { taskActions } from '../../../../store/task-slice'
import { ReactComponent as RemoveIcon } from '../../../../assets/icons/deleteIcon.svg'

export const Code = ({ code }) => {
   const dispatch = useDispatch()

   const setCodeHandler = (e) => {
      dispatch(
         taskActions.setCode({
            code: e.target.value,
            id: code.id,
         })
      )
   }
   const handleKeyDown = (e) => {
      e.target.style.height = 'inherit'
      e.target.style.height = `${e.target.scrollHeight}px`
   }

   const deleteCodeHandler = (id) => {
      dispatch(taskActions.deleteTask(id))
   }
   return (
      <Container>
         <StyledIcon id="container">
            <RemoveIcon
               id="remove"
               onClick={() => deleteCodeHandler(code.id)}
            />
            <CodeIcon id="code" />
         </StyledIcon>

         <StyledTextArea
            value={code.value}
            placeholder="Вставьте код"
            onChange={setCodeHandler}
            onKeyDown={handleKeyDown}
         />
      </Container>
   )
}
const Container = styled.div`
   display: flex;
   margin-left: 5px;
   margin-top: 10px;
   max-height: 300px;
   width: 100%;
   #remove {
      display: none;
   }
   &:hover {
      #remove {
         display: block;
      }
      #code {
         display: none;
      }
      #container {
         background: #c4c4c4;
         border-radius: 3px;
      }
   }
`
const StyledTextArea = styled.textarea`
   border: 1px solid #d4d4d4;
   border-radius: 10px;
   padding: 10px 8px 10px 18px;
   width: 100%;
   height: 42px;
   max-height: 300px;
   outline: none;
   resize: none;
   &::-webkit-scrollbar {
      width: 0;
   }
`
const StyledIcon = styled.div`
   width: 27px;
   height: 28px;
   display: flex;
   align-items: center;
   justify-content: center;
   margin-right: 10px;
   margin-top: 8px;
   cursor: pointer;
   &:hover {
      background: #c4c4c4;
      border-radius: 3px;
   }
`
