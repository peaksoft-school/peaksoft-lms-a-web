import styled from '@emotion/styled'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { taskActions } from '../../../../store/task-slice'
import { Button } from '../../../UI/button/Button'

export const Image = () => {
   const dispatch = useDispatch()
   const { image } = useSelector((state) => state.tasks)

   const removeImage = () => {
      dispatch(taskActions.selectImage(null))
   }
   return (
      <ImageContainer>
         <img alt="" src={image} />
         <Overlay>
            <Button id="delete" background="#C91E1E" onClick={removeImage}>
               Удалить
            </Button>
         </Overlay>
      </ImageContainer>
   )
}

const ImageContainer = styled.div`
   width: 792px;
   height: 450px;
   margin: 30px 0;
   position: relative;

   & img {
      display: block;
      border-radius: 7px;
      background-size: cover;
      width: 100%;
      height: 100%;
      backface-visibility: hidden;
      background-blend-mode: saturation;
   }
`
const Overlay = styled.div`
   position: absolute;
   top: 0px;
   left: 0px;
   width: 100%;
   height: 100%;
   display: flex;
   justify-content: center;
   align-items: center;
   border-radius: 7px;
   opacity: 0;
   transition-delay: 0.3s;
   &:hover {
      opacity: 1;
      background-color: #00000075;
   }
   &:hover #delete {
      transition-delay: 0.6s;
      position: absolute;
      z-index: 20;
      display: block;
      opacity: 1;
   }
`
