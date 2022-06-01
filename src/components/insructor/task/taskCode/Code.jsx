import styled from '@emotion/styled'
import React from 'react'
import { useDispatch } from 'react-redux'
import { ReactComponent as CodeIcon } from '../../../../assets/icons/code.svg'
import { taskActions } from '../../../../store/task-slice'

export const Code = () => {
   const dispatch = useDispatch()
   const onChangeHandler = (e) => {
      dispatch(taskActions.addCode(e.target.value))
   }
   return (
      <CodeContainer>
         <CodeIcon />
         <StyledTextArea
            placeholder="Вставьте код"
            onChange={onChangeHandler}
         />
      </CodeContainer>
   )
}
const CodeContainer = styled.div`
   display: flex;
   align-items: center;
   min-height: 40px;
   max-height: 200px;
   margin-top: 10px;
   width: 100%;
   svg {
      margin-right: 12px;
      margin-left: 5px;
   }
`
const StyledTextArea = styled.textarea`
   border: 1px solid #d4d4d4;
   border-radius: 10px;
   padding: 10px 8px 10px 18px;
   width: 100%;
   min-height: 42px;
   max-height: 200px;
   outline: none;
   display: flex;
   overflow: hidden;
`
