import React from 'react'
import styled from '@emotion/styled'
import { Pagination as MuiPagination, PaginationItem } from '@mui/material'

export const Pagination = (props) => {
   return <Pagination count={10} renderItem={(item) => <PagItem {...item} />} />
}
const PagItem = styled(PaginationItem)`
   .MuiPaginationItem-root {
      color: red;
   }
`
