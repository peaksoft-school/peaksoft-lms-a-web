import React from 'react'

export const TaskLink = ({ link }) => {
   return (
      <div>
         <a href={link.value}>{link.name}</a>
      </div>
   )
}
