import { PaginationItem } from '@mui/material'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import './App.css'
import styled from '@emotion/styled'
import { Pagination } from './components/UI/Pagination'

function App() {
   return (
      <div className="App">
         <WrapperPagination
            count={37}
            color="primary"
            renderItem={(item) => (
               <Wrapper
                  components={{
                     previous: ArrowBackIosNewIcon,
                     next: ArrowForwardIosIcon,
                  }}
                  {...item}
               />
            )}
         />
      </div>
   )
}

const WrapperPagination = styled(Pagination)`
   .css-1uvvthh-MuiButtonBase-root-MuiPaginationItem-root.Mui-selected {
      color: blue;
      background-color: white;
      text-decoration: underline;
   }
   .css-1uvvthh-MuiButtonBase-root-MuiPaginationItem-root {
      color: #8f8e8e;
   }
`
const Wrapper = styled(PaginationItem)`
   .MuiPaginationItem-icon {
      color: #3772ff;
   }
`

export default App
