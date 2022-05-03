import React from 'react'
import { Pagination as MuiPagination } from '@mui/material'
import styled from '@emotion/styled'

export const Pagination = (props) => {
   return <StyledPagination {...props} />
}

const StyledPagination = styled(MuiPagination)`
   .MuiButtonBase-root {
      color: #8f8e8e;
      :hover {
         background-color: transparent;
      }
   }
   .Mui-selected {
      color: #3772ff;
      text-decoration: underline;
      background-color: white !important;
   }
   .MuiPaginationItem-icon {
      color: #3772ff;
      font-size: 30px;
   }
`
