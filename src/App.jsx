import './App.css'
import { BreadCrumbs } from './components/UI/BreadCrumbs'

function App() {
   const pathsArray = [
      {
         path: 'materialUi',
         name: 'материал юай',
      },
      {
         path: 'administrator',
         name: 'администратор',
      },
      {
         path: 'student',
         name: 'студент',
      },
   ]
   return (
      <div className="App">
         <BreadCrumbs pathsArray={pathsArray} />
      </div>
   )
}

export default App
