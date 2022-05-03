import './App.css'
import { Button } from './components/UI/Button'

function App() {
   return (
      <div className="divka">
         <Button background="#3772ff">+ Создать группу</Button>
         <div className="box">
            <Button background="#C91E1E">Отправить</Button>
         </div>
         <div className="box">
            <Button background="none">Отмена</Button>
         </div>
      </div>
   )
}
export default App
