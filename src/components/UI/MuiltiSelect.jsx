import React, { useState } from 'react'
import {
   OutlinedInput,
   InputLabel,
   MenuItem,
   FormControl,
   ListItemText,
   Select,
   Checkbox,
} from '@mui/material'
import styled from '@emotion/styled'

const ITEM_HEIGHT = 76
const ITEM_PADDING_TOP = 8
const MenuProps = {
   PaperProps: {
      style: {
         maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
         width: 250,
         borderRadius: '10px',
      },
   },
}

const names = [
   'Oliver Hansen',
   'Van Henry',
   'April Tucker',
   'Ralph Hubbard',
   'Omar Alexander',
   'Carlos Abbott',
   'Miriam Wagner',
   'Bradley Wilkerson',
]

export const MultiSelect = () => {
   const [personName, setPersonName] = useState([])

   const handleChange = (event) => {
      const {
         target: { value },
      } = event
      setPersonName(typeof value === 'string' ? value.split(',') : value)
   }

   return (
      <div>
         {personName}
         <StyledForm>
            <InputLabel id="demo-multiple-checkbox-label">Tag</InputLabel>
            <Select
               labelId="demo-multiple-checkbox-label"
               id="demo-multiple-checkbox"
               multiple
               value={personName}
               onChange={handleChange}
               input={<OutlinedInput label="Tag" />}
               renderValue={(selected) => selected.join(', ')}
               MenuProps={MenuProps}
            >
               {names.map((name) => (
                  <StyledMenuItem key={name} value={name}>
                     <ListItemText primary={name} />
                     <Checkbox checked={personName.indexOf(name) > -1} />
                  </StyledMenuItem>
               ))}
            </Select>
         </StyledForm>
      </div>
   )
}

const StyledForm = styled(FormControl)`
   width: 100%;
   .MuiInputBase-root {
      border-radius: 10px;
      height: 42px;
   }
   .MuiInputLabel-root {
      top: -7px;
   }
`
const StyledMenuItem = styled(MenuItem)`
   .MuiTypography-root {
      font-size: 16px;
      color: #000000;
      border: red;
   }
   .MuiSvgIcon-root {
      font-size: 16px;
   }
`
