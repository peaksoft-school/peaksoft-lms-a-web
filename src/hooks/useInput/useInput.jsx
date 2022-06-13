import { useState } from 'react'

export const useInput = (initialState) => {
   const [value, setValue] = useState(initialState)

   const handleChange = (event) => {
      const { name, value } = event.target
      setValue((prevState) => {
         return {
            ...prevState,
            [name]: value,
         }
      })
   }
   return {
      value,
      onClear: () => {
         setValue(initialState)
      },
      onChange: handleChange,
      setValue,
   }
}
