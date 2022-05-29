import React from 'react'
import styled from '@emotion/styled'
import { Tooltip } from '@mui/material'
import { useDispatch } from 'react-redux'
import { ReactComponent as FileIcon } from '../../../assets/icons/Frame.svg'
import { taskActions } from '../../../store/task-slice'

export const File = ({ showFileHandler }) => {
   const dispatch = useDispatch()

   const changeHandler = (event) => {
      const file = event.target.files[0]
      dispatch(taskActions.selectFile(file.name))
   }
   return (
      <StyledTooltip title="Прикрепить файл" placement="top">
         <StyledIcon /* onClick={showFileHandler} */>
            <label htmlFor="upload">
               <FileIcon />
            </label>
            <input type="file" id="upload" onChange={changeHandler} />
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
