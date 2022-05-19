import styled from '@emotion/styled'
import { styled as muiStyled } from '@mui/material/styles'
import {
   TableContainer as MuiTableContainer,
   Table,
   TableHead,
   TableBody,
   TableRow,
   TableCell,
   Paper,
   ThemeProvider,
   createTheme,
} from '@mui/material'
import { Pagination } from '../pagination/Pagination'

export const AppTable = ({ columns, data, pagination }) => {
   return (
      <ThemeProvider theme={customTheme}>
         <Container component={Paper}>
            <Table>
               <TableHead>
                  <TableRowContainer>
                     {columns.map((col) => {
                        return (
                           <TableContainer key={col.accessKey}>
                              <TableTitleLabel>{col.title}</TableTitleLabel>
                           </TableContainer>
                        )
                     })}
                  </TableRowContainer>
               </TableHead>
               <TableBody>
                  {data.map((item) => {
                     return (
                        <StyledTableRow key={item.id}>
                           {columns.map((col) => {
                              if (col.action) {
                                 return col.action(item)
                              }
                              return (
                                 <StyledTable key={col.accessKey}>
                                    <StyledItemLabel>
                                       {item[col.accessKey]}
                                    </StyledItemLabel>
                                 </StyledTable>
                              )
                           })}
                        </StyledTableRow>
                     )
                  })}
               </TableBody>
            </Table>
            <StyledTable>
               {pagination && (
                  <Pagination
                     count={pagination.count}
                     onChange={pagination.onChange}
                  />
               )}
            </StyledTable>
         </Container>
      </ThemeProvider>
   )
}

const Container = styled(MuiTableContainer)`
   min-width: 1140px;
   min-height: 587px;
   margin: 20px auto;
   position: relative;
   background: #ffffff;
   border: 1px solid #d4d4d4;
   box-sizing: border-box;
   border-radius: 10px;
`
const TableRowContainer = styled(TableRow)`
   border-bottom: 1.5px solid #f7f8fa;
`
const StyledTable = styled(TableCell)`
   border: none;
   font-family: 'Open Sans', sans-serif;
   font-style: normal;
   font-weight: 400;
   font-size: 16px;
   line-height: 22px;
   color: #1d293f;
   letter-spacing: 0.02em;
`
const StyledItemLabel = styled.label`
   display: flex;
   justify-content: center;
   align-items: center;
`
const TableContainer = styled(TableCell)`
   font-family: 'Open Sans', sans-serif;
   font-style: normal;
   font-weight: 600;
   font-size: 14px;
   line-height: 19px;
   color: #1d293f;
   border: none;
`
const TableTitleLabel = styled.label`
   display: flex;
   justify-content: center;
   align-items: center;
`
const customTheme = createTheme({
   palette: {
      main: 'rgba(26, 35, 126, 0.07);',
      hover: 'rgba(27, 35, 119, 0.199)',
   },
})

const StyledTableRow = muiStyled(TableRow)(({ theme }) => ({
   '&:nth-of-type(even)': {
      backgroundColor: theme.palette.main,
   },
   '&:hover': {
      background: theme.palette.hover,
   },
}))
