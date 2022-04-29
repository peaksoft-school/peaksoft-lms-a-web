import React, { useState } from 'react'
import { Switch, FormControlLabel } from '@mui/material'

export function Switcher() {
   const [checked, setChecked] = useState(false)
   const handleChange = (event) => {
      setChecked(event.target.checked)
   }
   console.log(checked)
   return (
      <div className="App">
         <FormControlLabel
            control={
               <Switch
                  checked={checked}
                  onChange={handleChange}
                  name="checked"
               />
            }
         />
      </div>
   )
}
