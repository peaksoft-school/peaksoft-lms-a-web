import styled from '@emotion/styled'
import { styled as muiStyled } from '@mui/material/styles'
import {
   TableContainer,
   Table,
   TableHead,
   TableBody,
   TableRow,
   TableCell,
   Paper,
} from '@mui/material'

export const AppTable = ({ columns, data }) => {
   return (
      <Wrapper component={Paper}>
         <Table>
            <TableHead>
               <TableRow>
                  {columns.map((col) => {
                     return (
                        <WrapperTable key={col.accessKey}>
                           {col.title}
                        </WrapperTable>
                     )
                  })}
               </TableRow>
            </TableHead>
            <TableBody>
               {data.map((item) => {
                  return (
                     <StyledTableRow key={item.id}>
                        {columns.map((col) => (
                           <TableWrapper key={col.accessKey}>
                              {item[col.accessKey]}
                           </TableWrapper>
                        ))}
                     </StyledTableRow>
                  )
               })}
            </TableBody>
         </Table>
      </Wrapper>
   )
}

const Wrapper = styled(TableContainer)`
   width: 1140px;
   height: 587px;
   margin: 20px auto;
   left: 10%;
   right: 0%;
   top: 137px;
   background: #ffffff;
   border: 1px solid #d4d4d4;
   box-sizing: border-box;
   border-radius: 10px;
`
const TableWrapper = styled(TableCell)`
   border: none;
   font-family: 'Open Sans', sans-serif;
   font-style: normal;
   font-weight: 400;
   font-size: 16px;
   line-height: 22px;
   color: #1d293f;
   letter-spacing: 0.02em;
   & span {
      cursor: pointer;
      width: 115px;
      display: flex;
      border: none;
      align-items: center;
      justify-content: space-between;
   }
`
const WrapperTable = styled(TableCell)`
   font-family: 'Open Sans', sans-serif;
   font-style: normal;
   font-weight: 600;
   font-size: 14px;
   line-height: 19px;
   color: #1d293f;
   border: none;
`

const StyledTableRow = muiStyled(TableRow)(({ theme }) => ({
   '&:nth-of-type(even)': {
      backgroundColor: theme.palette.action.hover,
   },
}))
