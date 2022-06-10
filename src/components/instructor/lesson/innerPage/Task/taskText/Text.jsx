import React from 'react'

export const Text = ({ text }) => {
   const valuesArray = JSON.parse(text.value)
   console.log(valuesArray)
   return (
      <div>
         {valuesArray.map((value) => (
            <p>
               {value.children.map((el) => (
                  <p>{el.text}</p>
               ))}
            </p>
         ))}
      </div>
   )
}
