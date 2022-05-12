import styled from '@emotion/styled/macro'

export const RadioButton = (props) => {
   return (
      <div>
         <StyledInput
            id={props.id}
            value={props.value}
            type="radio"
            name="radio"
            onChange={props.onChange}
            checked={props.checked}
         />
         <StyledLabel htmlFor={props.id}>{props.label}</StyledLabel>
      </div>
   )
}

const StyledInput = styled.input`
   width: 24px;
   height: 24px;
`
const StyledLabel = styled.label`
   cursor: pointer;
`
