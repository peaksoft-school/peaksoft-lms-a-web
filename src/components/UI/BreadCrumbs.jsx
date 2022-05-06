import { Breadcrumbs, Link, Typography } from '@mui/material'
import styled from '@emotion/styled'
import { useLocation } from 'react-router-dom'

export const BreadCrumbs = (props) => {
   const { pathname } = useLocation()

   const paths = pathname.split('/').filter((x) => x)

   return (
      <StyledCrumbs aria-label="breadcrumbs" separator="\">
         {paths.map((crumb, index) => {
            return (
               <LinkStyleControl
                  underline="hover"
                  color={crumb === paths.at(-1) && 'black'}
                  href={`/${paths.slice(0, index + 1).join('/')}`}
                  key={crumb}
               >
                  {crumb}
               </LinkStyleControl>
            )
         })}
         <Typography color="textPrimary">{props.titleThird}</Typography>
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
`

const LinkStyleControl = styled(Link)`
   color: ${({ color }) => color || 'gray'};
`
