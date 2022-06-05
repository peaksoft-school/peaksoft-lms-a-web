import styled from '@emotion/styled'
import { Tooltip } from '@mui/material'
import React from 'react'
import { useDispatch } from 'react-redux'
import uuid from 'react-uuid'
import { taskActions } from '../../../../store/task-slice'
import { TEXT } from '../../../../utils/constants/general'
import { ReactComponent as TextIcon } from '../../../../assets/icons/text.svg'

export const Text = () => {
   const dispatch = useDispatch()
   const addTextEditor = () => {
      dispatch(
         taskActions.addTask({
            taskType: TEXT,
            id: uuid(),
         })
      )
   }
   return (
      <StyledTooltip title="Текстовое поле" placement="top">
         <StyledIcon>
            <TextIcon onClick={addTextEditor} />
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
   svg {
      margin-top: 4px;
   }
`
