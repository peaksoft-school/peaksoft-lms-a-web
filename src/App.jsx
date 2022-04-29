import './App.css'

import { BasicModal } from './components/UI/BasicModal'

function App() {
   return (
      <div className="App">
         <BasicModal
            title="Добавить студента"
            cancel="Отмена"
            save="Добавить"
         />
      </div>
   )
}

export default App
