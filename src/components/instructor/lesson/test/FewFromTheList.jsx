import styled from '@emotion/styled'
import { ReactComponent as Cancel } from '../../../../assets/icons/Cancel.svg'
import { Checkbox } from '../../../UI/checkbox/Checkbox'

export const FewFromTheList = ({
   placeholder,
   onClick,
   onChangeOption,
   onGetInputValue,
   inputValue,
   checked,
   inputDisabled,
}) => {
   return (
      <StyledOptions>
         <StyledCheckbox>
            <Checkbox onChange={onChangeOption} checked={checked} />
         </StyledCheckbox>
         <StyledInputWithIcon>
            <StyledInput
               placeholder={placeholder}
               onChange={onGetInputValue}
               value={inputValue}
               disabled={inputDisabled}
            />
            <Cancel onClick={onClick} cursor="pointer" />
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
      margin-right: 12px;
   }
`
const StyledCheckbox = styled.div`
   width: 24px;
   height: 24px;
   display: flex;
   align-items: center;
   justify-content: center;
   margin-right: 12px;
`
