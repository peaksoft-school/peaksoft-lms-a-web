import styled from '@emotion/styled'
import React from 'react'
import { useDispatch } from 'react-redux'
import uuid from 'react-uuid'
import { ReactComponent as CodeIcon } from '../../../../assets/icons/code.svg'
import { taskActions } from '../../../../store/task-slice'
import { CODE } from '../../../../utils/constants/general'
import { StyledTooltip } from '../../../UI/tooltip/StyledTooltip'

export const AddTaskCode = () => {
   const dispatch = useDispatch()

   const addTaskHandler = () => {
      dispatch(
         taskActions.addTask({
            taskType: CODE,
            name: CODE,
            id: uuid(),
         })
      )
   }
   return (
      <StyledTooltip title="Код">
         <StyledIcon>
            <CodeIcon onClick={addTaskHandler} />
         </StyledIcon>
      </StyledTooltip>
   )
}

const StyledIcon = styled.div`
   width: 34px;
   height: 28px;
   display: flex;
   align-items: center;
   justify-content: center;
   & input {
      display: none;
   }
   &:hover {
      background: #d4d4d4;
      border-radius: 6px;
   }
`
