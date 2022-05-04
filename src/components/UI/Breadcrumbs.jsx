import * as React from 'react'
import Typography from '@mui/material/Typography'
import MUIBreadcrumbs from '@mui/material/Breadcrumbs'
import Link from '@mui/material/Link'
import { useLocation } from 'react-router-dom'

export default function Breadcrumbs(props) {
   const {
      navigate,
      useLocation: { pathname },
   } = props

   return (
      <MUIBreadcrumbs aria-label="breadcrumb" separator="\">
         <Link underline="hover" color="inherit" href="/">
            MUI
         </Link>
         <Link
            underline="hover"
            color="inherit"
            href="/material-ui/getting-started/installation/"
         >
            Core
         </Link>
         <Typography color="text.primary">Breadcrumbs</Typography>
      </MUIBreadcrumbs>
   )
}
