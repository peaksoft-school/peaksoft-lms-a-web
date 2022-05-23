import styled from '@emotion/styled'
import {
   FormControl,
   InputLabel,
   MenuItem,
   Select as MuiSelect,
} from '@mui/material'

export function Select({
   options,
   placeholder,
   onChange,
   value,
   name,
   selectedOption,
   type,
}) {
   return (
      <FormControlForSelect type={type}>
         <InputLabel>{placeholder}</InputLabel>
         <MuiSelect
            value={value}
            label={placeholder}
            onChange={onChange}
            name={name}
         >
            {options.map((option) => (
               <MenuItem
                  key={option.id}
                  value={option.title}
                  onClick={() => selectedOption(option)}
               >
                  {option.title}
               </MenuItem>
            ))}
         </MuiSelect>
      </FormControlForSelect>
   )
}

const FormControlForSelect = styled(FormControl)`
   width: 100%;
   .MuiInputBase-root {
      border-radius: 10px;
      height: 42px;
   }
   .MuiInputLabel-root {
      top: -5px;
      font-family: 'Open Sans' sans-serif;
      font-style: normal;
      font-weight: 500;
      font-size: 14px;
      line-height: 20px;
      letter-spacing: 0.001em;
      color: ${({ type }) => (type ? '#3772ff' : '8D949E')};
   }
   .MuiSelect-icon {
      color: ${({ type }) => (type ? '#3772ff' : '8D949E')};
   }
   .MuiOutlinedInput-notchedOutline {
      border: ${({ type }) =>
         type ? '1px solid #3772ff' : '1px solid #D4D4D4'};
   }
   .css-1yk1gt9-MuiInputBase-root-MuiOutlinedInput-root-MuiSelect-root:hover
      .MuiOutlinedInput-notchedOutline {
      border: ${({ type }) =>
         type ? '1px solid #3772ff' : '1px solid #D4D4D4'};
   }
   .css-1yk1gt9-MuiInputBase-root-MuiOutlinedInput-root-MuiSelect-root.Mui-focused
      .MuiOutlinedInput-notchedOutline {
      border: 1px solid #3772ff;
   }
`
