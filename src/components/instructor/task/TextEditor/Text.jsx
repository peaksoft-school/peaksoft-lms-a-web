import styled from '@emotion/styled'
import React from 'react'
import { useDispatch } from 'react-redux'
import uuid from 'react-uuid'
import { taskActions } from '../../../../store/task-slice'
import { TEXT } from '../../../../utils/constants/general'
import { ReactComponent as TextIcon } from '../../../../assets/icons/text.svg'
import { StyledTooltip } from '../../../UI/tooltip/StyledTooltip'

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
      <StyledTooltip title="Текстовое поле">
         <StyledIcon>
            <TextIcon onClick={addTextEditor} />
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
   svg {
      margin-top: 4px;
   }
`
