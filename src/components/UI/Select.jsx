import styled from '@emotion/styled'
import {
   FormControl,
   InputLabel,
   //  InputLabel,
   MenuItem,
   Select as MuiSelect,
} from '@mui/material'
import { useState } from 'react'

export default function Selecte(props) {
   const [age, setAge] = useState('')

   const handleChange = (event) => {
      setAge(event.target.value)
   }

   return (
      <FormStyled {...props}>
         <InputLabel>Группа</InputLabel>
         <MuiSelect value={age} onChange={handleChange}>
            <MenuItem value="online">{props.online}</MenuItem>
            <MenuItem value="offline">{props.offline}</MenuItem>
         </MuiSelect>
      </FormStyled>
   )
}

const FormStyled = styled(FormControl)`
   width: 500px;
   .MuiInputBase-root {
      border-radius: 10px;
   }
   .MuiSelect-select {
      width: 491px;
   }
   .MuiOutlinedInput-root {
      /* border: 1px solid red; */
   }
   .MuiFormControl {
      width: 491px;
   }
`
