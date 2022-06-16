import { Breadcrumbs, Typography } from '@mui/material'
import styled from '@emotion/styled'
import { Link } from 'react-router-dom'

export const BreadCrumbs = ({ pathsArray }) => {
   const crumbs = pathsArray.map((crumb, index) => {
      const isLast = index === pathsArray.length - 1
      return isLast ? (
         <LastPathStyle color="black" key={crumb.path}>
            {crumb.name}
         </LastPathStyle>
      ) : (
         <LinkStyleControl to={crumb.path} key={crumb.path}>
            {crumb.name}
         </LinkStyleControl>
      )
   })
   return (
      <StyledCrumbs aria-label="breadcrumbs" separator="/">
         {crumbs}
      </StyledCrumbs>
   )
}
const StyledCrumbs = styled(Breadcrumbs)`
   display: flex;
   align-items: center;
   text-align: center;
   font-size: 14px;
   letter-spacing: 0.02em;
   font-family: sans-serif;
   margin-left: 20px;
`
const LinkStyleControl = styled(Link)`
   color: ${({ color }) => color || 'gray'};
`
const LastPathStyle = styled(Typography)`
   font-size: 14px;
   letter-spacing: 0.02em;
   font-family: sans-serif;
`
