import React from 'react'

export const File = ({ file }) => {
   return (
      <div>
         <a href={file.value}>{file.name}</a>
      </div>
   )
}
