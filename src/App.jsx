import './App.css'
import DatePickerUi from './components/UI/DatePickerUi'
// import { BasicModal } from './components/UI/BasicModal'
// import ConfirmModal from './components/UI/ConfirmModal'

function App() {
   return (
      <div className="App">
         {/* <BasicModal
            title="Добавить студента"
            cancel="Отмена"
            save="Добавить"
         /> */}

         {/* <ConfirmModal /> */}
         <DatePickerUi />
      </div>
   )
}

export default App
