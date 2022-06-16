import styled from '@emotion/styled'
import React from 'react'

export const Image = ({ image }) => {
   return (
      <StyledImage>
         <img src={image.value} alt={image.name} />
      </StyledImage>
   )
}

const StyledImage = styled.div`
   img {
      border-radius: 10px;
      width: 792px;
      height: 464px;
   }
`
