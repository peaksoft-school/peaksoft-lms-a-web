import React from 'react'
import styled from '@emotion/styled'
import { Pagination as MuiPagination, PaginationItem } from '@mui/material'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'

export const Pagination = () => {
   return (
      <MuiPagination
         count={10}
         renderItem={(item) => (
            <PaginationItem
               components={{
                  previous: <ArrowBackIosNewIcon style={{ color: 'green' }} />,
                  next: (
                     <ArrowForwardIosIcon
                        fontSize="30px"
                        style={{ fill: 'green' }}
                     />
                  ),
               }}
               {...item}
            />
         )}
      />
   )
}
