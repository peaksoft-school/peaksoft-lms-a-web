import styled from '@emotion/styled'
import React from 'react'
import { useDispatch } from 'react-redux'
import uuid from 'react-uuid'
import { ReactComponent as PictureIcon } from '../../../../assets/icons/picture.svg'
import { taskActions } from '../../../../store/INSTRUCTOR/task-slice'
import { IMAGE } from '../../../../utils/constants/general'
import { StyledTooltip } from '../../../UI/tooltip/StyledTooltip'

export const SelectImage = () => {
   const dispatch = useDispatch()

   function onDrop(e) {
      const selectedImageUrl = URL.createObjectURL(e.target.files[0])
      const selectedImageFile = e.target.files[0]
      dispatch(
         taskActions.addTask({
            taskType: IMAGE,
            name: selectedImageFile.name,
            value: selectedImageUrl,
            id: uuid(),
            selectedImageFile,
         })
      )
   }
   return (
      <StyledTooltip title="Добавить картинку" placement="top">
         <StyledIcon>
            <label htmlFor="uploadImage">
               <PictureIcon />
            </label>
            <input
               type="file"
               id="uploadImage"
               onChange={onDrop}
               accept="image/*"
            />
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
