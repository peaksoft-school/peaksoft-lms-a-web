import './App.css'
import Select from './components/UI/Select'

const options = [
   {
      label: 'Students',
      value: 'Students',
   },
   {
      label: 'Teachers',
      value: 'Teachers',
   },
]

function App() {
   return (
      <div className="App">
         <Select options={options} placeholder="Группа" />
         <Select options={options} placeholder="Оформить" />
      </div>
   )
}

export default App
