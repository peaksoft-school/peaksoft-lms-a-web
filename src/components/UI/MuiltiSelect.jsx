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

export const MultiSelect = ({ names }) => {
   const [personName, setPersonName] = useState([])
   console.log(personName)

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
            <InputLabel>Tag</InputLabel>
            <Select
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
   border-bottom: 1px solid #1a237e12;
   .MuiButtonBase-root:active {
      color: blue;
   }
   .MuiTypography-root {
      font-size: 15px;
      color: #000000;
   }
   .MuiSvgIcon-root {
      font-size: 16px;
   }
`
