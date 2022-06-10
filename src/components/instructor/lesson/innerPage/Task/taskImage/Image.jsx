import styled from '@emotion/styled'
import React from 'react'

export const Image = ({ image }) => {
   return (
      <div>
         <Img src={image.value} alt={image.name} />
      </div>
   )
}

const Img = styled.img`
   width: 338px;
   height: 308px;
`
