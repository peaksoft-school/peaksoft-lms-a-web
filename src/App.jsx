import styled from '@emotion/styled'
import './App.css'
import { Courses } from './components/admin/courses/Courses'

function App() {
   return (
      <div className="App">
         <Courses />
      </div>
   )
}
export default App

const StyledButton = styled.div`
   display: flex;
   flex-direction: row;
   justify-content: center;
   align-items: center;
   padding: 10px 24px 10px 16px;
   gap: 8px;

   position: absolute;
   width: 161px;
   height: 40px;
   left: 979px;
   top: 85px;

   /* button */

   background: #3772ff;
   border-radius: 8px;
`
