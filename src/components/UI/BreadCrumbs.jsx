import { Box, Breadcrumbs, Link, Typography } from '@mui/material'

export const BreadCrumbs = (props) => {
   return (
      <Box>
         <Breadcrumbs aria-label="breadcrumbs" separator="\">
            <Link underline="hover" color="inherit" href="\">
               {props.title}
            </Link>
            <Link
               underline="hover"
               color="inherit"
               href="/material-ui/getting-started/installation/"
            >
               {props.title}
            </Link>
            <Typography color="GrayText.primary">smt</Typography>
         </Breadcrumbs>
      </Box>
   )
}
