import './App.css'
import { Button } from './components/UI/Button'

function App() {
   return (
      <div>
         <Button onClick={() => alert('Hello :)')}>+ Создать группу</Button>
      </div>
   )
}
export default App
