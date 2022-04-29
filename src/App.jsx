// import { Pagination } from '@mui/material'
import { Pagination, PaginationItem } from '@mui/material'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import './App.css'
import styled from '@emotion/styled'

function App() {
   return (
      <div className="App">
         <WrapperPagination
            count={10}
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
   .MuiPagination-root {
      color: red;
      background-color: red;
   }
`
const Wrapper = styled(PaginationItem)`
   .MuiPaginationItem-icon {
      color: #3772ff;
   }
`

export default App
