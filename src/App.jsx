import './App.css'
import { useState } from 'react'
import Datepicker from './components/UI/DatePickerUi'

function App() {
   const [dateValue, setDateValue] = useState(null)
   const dateChangeHandler = (newValue) => {
      setDateValue(newValue)
   }
   return (
      <div className="App">
         <Datepicker onChange={dateChangeHandler} dateValue={dateValue} />
      </div>
   )
}

export default App
