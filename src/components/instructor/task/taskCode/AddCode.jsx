import styled from '@emotion/styled'
import { Tooltip } from '@mui/material'
import React from 'react'
import { useDispatch } from 'react-redux'
import uuid from 'react-uuid'
import { ReactComponent as CodeIcon } from '../../../../assets/icons/code.svg'
import { taskActions } from '../../../../store/task-slice'
import { CODE } from '../../../../utils/constants/general'

export const AddCode = () => {
   const dispatch = useDispatch()
   const addCodeTask = () => {
      dispatch(
         taskActions.addTask({
            taskType: CODE,
            name: 'code',
            id: uuid(),
         })
      )
   }
   return (
      <StyledTooltip title="Код" placement="top">
         <StyledIcon>
            <CodeIcon onClick={addCodeTask} />
         </StyledIcon>
      </StyledTooltip>
   )
}

const StyledTooltip = styled(({ className, ...props }) => (
   <Tooltip {...props} classes={{ popper: className }} />
))`
   & .MuiTooltip-tooltip {
      background: #8d949e;
      border-radius: 8px;
      height: 28px;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      padding: 6px 8px;
      gap: 10px;
   }
`
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
