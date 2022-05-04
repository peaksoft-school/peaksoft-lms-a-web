import styled from '@emotion/styled'
import {
   FormControl,
   InputLabel,
   MenuItem,
   Select as MuiSelect,
} from '@mui/material'
import { useState } from 'react'

export default function Select(props) {
   const [value, setValue] = useState('')
   const handleChange = (e) => {
      setValue(e.target.value)
   }
   return (
      <FormStyled {...props}>
         <InputLabel id="demo-simple-select-label">
            {props.placeholder}
         </InputLabel>
         <MuiSelect
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={value}
            label={props.placeholder}
            onChange={handleChange}
         >
            {props.options.map((el) => (
               <MenuItem value={el.value}>{el.label} </MenuItem>
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
