import styled from '@emotion/styled'
import {
   FormControl,
   InputLabel,
   MenuItem,
   Select as MuiSelect,
} from '@mui/material'

export default function Select({
   placeholder,
   value,
   onChange,
   options,
   selectedOption,
}) {
   return (
      <FormStyled>
         <InputLabel>{placeholder}</InputLabel>
         <MuiSelect value={value} label={placeholder} onChange={onChange}>
            {options.map((el) => (
               <MenuItem
                  key={el.label}
                  value={el.value}
                  onClick={() => selectedOption(el.value)}
               >
                  {el.label}
               </MenuItem>
            ))}
         </MuiSelect>
      </FormStyled>
   )
}

const FormStyled = styled(FormControl)`
   .MuiInputBase-root {
      border-radius: 10px;
      min-width: 491px;
      height: 42px;
   }
   .MuiInputLabel-root {
      top: -7px;
   }
`
