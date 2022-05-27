import React from 'react'
import TextField from '@mui/material/TextField'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { ru } from 'date-fns/locale'
import styled from '@emotion/styled'

export default function DatepickerUi(props) {
   return (
      <LocalizationProvider dateAdapter={AdapterDateFns} locale={ru}>
         <DatePicker
            value={props.dateValue}
            onChange={props.onChange}
            renderInput={(params) => (
               <TextFieldStyle
                  {...params}
                  sx={{
                     '& .MuiOutlinedInput-root.Mui-focused': {
                        '& > fieldset': {
                           border: '1px solid #1f6ed4',
                        },
                     },
                  }}
                  border="none"
                  inputProps={{
                     ...params.inputProps,
                     readOnly: true,
                     placeholder: 'дд.мм.гг',
                  }}
               />
            )}
         />
      </LocalizationProvider>
   )
}

const TextFieldStyle = styled(TextField)`
   outline: none;
   .MuiInputBase-root {
      border-radius: 10px;
      width: 149px;
      height: 44px;
      color: gray;
      position: absolute;
      outline: none;
   }
`
