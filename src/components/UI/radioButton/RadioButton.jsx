import styled from '@emotion/styled/macro'

export const RadioButton = (props) => {
   return (
      <div>
         <StyledInput
            id={props.id}
            value={props.value}
            type="radio"
            name={props.name}
            onChange={props.onChange}
            checked={props.checked}
         />
         <StyledLabel htmlFor={props.id}>{props.label}</StyledLabel>
      </div>
   )
}

const StyledInput = styled.input`
   width: 22px;
   height: 22px;
`
const StyledLabel = styled.label`
   cursor: pointer;
`
