import { useState } from 'react'

const useInput = (initialState) => {
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
      onChange: handleChange,
   }
}

export default useInput
