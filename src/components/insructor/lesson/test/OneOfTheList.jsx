import styled from '@emotion/styled'
import { ReactComponent as Cancel } from '../../../../assets/icons/Cancel.svg'
import { RadioButton } from '../../../UI/radioButton/RadioButton'

export const OneOfTheList = (props) => {
   return (
      <StyledOptions>
         <RadioButton {...props} />
         <StyledInputWithIcon>
            <StyledInput {...props} />
            <Cancel />
         </StyledInputWithIcon>
      </StyledOptions>
   )
}
const StyledInputWithIcon = styled.div`
   display: flex;
   flex-direction: row;
   align-items: center;
   justify-content: flex-end;
   width: 100%;
   background: #ffffff;
   border: 1px solid #d4d4d4;
   box-sizing: border-box;
   border-radius: 10px;
   font-family: 'Open Sans', sans-serif;
   font-style: normal;
   font-weight: 300;
   font-size: 16px;
   line-height: 22px;
   gap: 10px;
   input {
      border: none;
      outline: none;
   }
   svg {
      margin-right: 18px;
   }
   path {
      fill: #9f9f9f;
   }
`
const StyledInput = styled.input`
   display: flex;
   flex-direction: row;
   align-items: center;
   padding: 10px 8px 10px 18px;
   width: 100%;
   background: #ffffff;
   border: none;
   box-sizing: border-box;
   border-radius: 10px;
   font-family: 'Open Sans', sans-serif;
   font-style: normal;
   font-weight: 300;
   font-size: 16px;
   line-height: 22px;
   gap: 10px;
`
const StyledOptions = styled.div`
   width: 100%;
   height: 56px;
   display: flex;
   justify-content: flex-start;
   align-items: center;
   input {
      margin-right: 14px;
   }
`
