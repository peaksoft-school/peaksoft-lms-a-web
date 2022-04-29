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

export const AppTable = ({ columns, data }) => {
   return (
      <ThemeProvider theme={customTheme}>
         <Container component={Paper}>
            <Table>
               <TableHead>
                  <TableRow>
                     {columns.map((col) => {
                        return (
                           <TableContainer key={col.accessKey}>
                              {col.title}
                           </TableContainer>
                        )
                     })}
                  </TableRow>
               </TableHead>
               <TableBody>
                  {data.map((item) => {
                     return (
                        <StyledTableRow key={item.id}>
                           {columns.map((col) => (
                              <StyledTable key={col.accessKey}>
                                 {item[col.accessKey]}
                              </StyledTable>
                           ))}
                        </StyledTableRow>
                     )
                  })}
               </TableBody>
            </Table>
         </Container>
      </ThemeProvider>
   )
}

const Container = styled(MuiTableContainer)`
   min-width: 1140px;
   min-height: 587px;
   margin: 20px auto;
   left: 10%;
   right: 0%;
   top: 137px;
   background: #ffffff;
   border: 1px solid #d4d4d4;
   box-sizing: border-box;
   border-radius: 10px;
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
const TableContainer = styled(TableCell)`
   font-family: 'Open Sans', sans-serif;
   font-style: normal;
   font-weight: 600;
   font-size: 14px;
   line-height: 19px;
   color: #1d293f;
   border: none;
`
const customTheme = createTheme({
   palette: {
      main: 'rgba(26, 35, 126, 0.07);',
   },
})

const StyledTableRow = muiStyled(TableRow)(({ theme }) => ({
   '&:nth-of-type(even)': {
      backgroundColor: theme.palette.main,
   },
}))
