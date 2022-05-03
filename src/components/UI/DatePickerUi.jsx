import React from 'react'
import TextField from '@mui/material/TextField'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { ru } from 'date-fns/locale'
import styled from '@emotion/styled'

export default function Datepicker(props) {
   return (
      <LocalizationProvider dateAdapter={AdapterDateFns} locale={ru}>
         <DatePicker
            value={props.dateValue}
            onChange={props.onChange}
            renderInput={(params) => (
               <TextFieldStyle
                  {...params}
                  inputProps={{ ...params.inputProps, placeholder: 'дд.мм.гг' }}
               />
            )}
         />
      </LocalizationProvider>
   )
}

const TextFieldStyle = styled(TextField)`
   .css-o9k5xi-MuiInputBase-root-MuiOutlinedInput-root {
      border-radius: 10px;
      width: 149px;
      height: 42px;
      color: gray;
      position: absolute;
   }
`
