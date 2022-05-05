import { Breadcrumbs, Link, Typography } from '@mui/material'
import styled from '@emotion/styled'
import { useLocation } from 'react-router-dom'

export const BreadCrumbs = (props) => {
   const { pathname } = useLocation()

   const paths = pathname.split('/').filter((x) => x)

   return (
      <StyledCrumbs aria-label="breadcrumbs" separator="\">
         {paths.map((crumb) => {
            return (
               <Link
                  underline="hover"
                  color="inherit"
                  href={`/${crumb}`}
                  key={new Date().toLocaleString()}
               >
                  {crumb}
               </Link>
            )
         })}
         <Typography color="textPrimary">{props.titleThird}</Typography>
      </StyledCrumbs>
   )
}
const StyledCrumbs = styled(Breadcrumbs)`
   font-size: 20px;
   letter-spacing: 0.02em;
`
