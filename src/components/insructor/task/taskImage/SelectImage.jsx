import styled from '@emotion/styled'
import { Tooltip } from '@mui/material'
import React from 'react'
import { useDispatch } from 'react-redux'
import { ReactComponent as PictureIcon } from '../../../../assets/icons/picture.svg'
import { taskActions } from '../../../../store/task-slice'

export const SelectImage = ({ setShowImage }) => {
   const dispatch = useDispatch()

   function uploadSingleFile(e) {
      const image = URL.createObjectURL(e.target.files[0])
      dispatch(taskActions.selectImage(image))
      setShowImage(true)
   }

   return (
      <StyledTooltip title="Добавить картинку" placement="top">
         <StyledIcon>
            <label htmlFor="uploadImage">
               <PictureIcon />
            </label>
            <input type="file" id="uploadImage" onChange={uploadSingleFile} />
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
