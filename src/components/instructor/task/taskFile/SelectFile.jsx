import styled from '@emotion/styled'
import React from 'react'
import { useDispatch } from 'react-redux'
import uuid from 'react-uuid'
import { ReactComponent as FileIcon } from '../../../../assets/icons/Frame.svg'
import { taskActions } from '../../../../store/task-slice'
import { FILE } from '../../../../utils/constants/general'
import { StyledTooltip } from '../../../UI/tooltip/StyledTooltip'

export const SelectFile = () => {
   const dispatch = useDispatch()

   const onDrop = (e) => {
      const selectedFileUrl = URL.createObjectURL(e.target.files[0])
      const selectedFile = e.target.files[0]
      dispatch(
         taskActions.addTask({
            taskType: FILE,
            selectedFile,
            selectedFileUrl,
            name: selectedFile.name,
            id: uuid(),
         })
      )
   }

   return (
      <StyledTooltip title="Прикрепить файл">
         <StyledIcon>
            <label htmlFor="upload">
               <FileIcon />
            </label>
            <input type="file" id="upload" onChange={onDrop} />
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
