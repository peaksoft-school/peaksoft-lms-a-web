import './App.css'
import { MultiSelect } from './components/UI/MuiltiSelect'

function App() {
   const names = [
      'Oliver Hansen',
      'Van Henry',
      'April Tucker',
      'Ralph Hubbard',
      'Omar Alexander',
      'Carlos Abbott',
      'Miriam Wagner',
      'Bradley Wilkerson',
   ]
   return (
      <div className="App">
         <MultiSelect names={names} />
      </div>
   )
}

export default App
