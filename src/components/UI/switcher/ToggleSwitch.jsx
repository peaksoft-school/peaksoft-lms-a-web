import React from 'react'
import styled from '@emotion/styled/macro'

export const ToggleSwitch = (props) => {
   return (
      <div>
         <CheckBox name={props.name} type="checkbox" id={props.id} {...props} />
         <CheckBoxLabel htmlFor={props.id} />
      </div>
   )
}

const CheckBoxLabel = styled.label`
   position: absolute;
   width: 51px;
   height: 31px;
   margin: 10px auto;
   border-radius: 15px;
   background: #ebe8e8;
   cursor: pointer;
   &::after {
      content: '';
      display: block;
      border-radius: 50%;
      width: 27px;
      height: 27px;
      margin: 2px;
      background: #c91e1e;
      transition: 0.2s;
   }
`
const CheckBox = styled.input`
   opacity: 0;
   z-index: 1;
   border-radius: 15px;
   width: 51px;
   height: 31px;
   &:checked + ${CheckBoxLabel} {
      background: #ebe8e8;
      &::after {
         content: '';
         background: #36ac0c;
         display: block;
         border-radius: 50%;
         width: 27px;
         height: 27px;
         margin: 2px;
         margin-left: 22px;
         transition: 0.2s;
      }
   }
`
