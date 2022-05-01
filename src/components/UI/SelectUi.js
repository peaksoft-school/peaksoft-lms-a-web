import * as React from 'react'
import Box from '@mui/material/Box'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import { InputLabel } from '@mui/material'
import Select from '@mui/material/Select'
import styled from '@emotion/styled'

const SelectStyle = styled(FormControl)`
   .css-1d3z3hw-MuiOutlinedInput-notchedOutline {
      width: 491px;
      background: #ffffff;
      border-radius: 10px;
   }
`
const SelectItem = styled(MenuItem)`
   height: 22px;
   line-height: 22px;
   font-size: 16px;
   color: black;
`

const style = {
   width: '491px',
   left: '50%',
   top: '50%',
   background: '#FFFFFF',
   borderRadius: '10px',
}

export default function SelectUi() {
   const [student, setStudents] = React.useState('')

   const handleChange = (event) => {
      setStudents(event.target.value)
   }

   return (
      <Box sx={style}>
         <Wrapper fullWidth>
            <InputLabel id="demo-simple-select-label">Age</InputLabel>
            <Select
               labelId="demo-simple-select-label"
               id="demo-simple-select"
               value={student}
               onChange={handleChange}
            >
               <SelectItem value={10}>Ten</SelectItem>
               <SelectItem value={10}>Ten</SelectItem>
               <SelectItem value={10}>Ten</SelectItem>
               <SelectItem value={10}>Ten</SelectItem>
               <SelectItem value={10}>Ten</SelectItem>
               <SelectItem value={10}>Ten</SelectItem>
               <SelectItem value={10}>Ten</SelectItem>
               <SelectItem value={10}>Ten</SelectItem>
               <SelectItem value={10}>Ten</SelectItem>
               <SelectItem value={10}>Ten</SelectItem>
            </Select>
         </Wrapper>
      </Box>
   )
}

const Wrapper = styled(SelectStyle)`
   background-color: var(--base-color);
   font-family: var(--font-family);
`
