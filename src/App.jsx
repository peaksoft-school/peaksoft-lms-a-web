import './App.css'
import { BasicTabs } from './components/UI/Tabs'

const tabs = [
   {
      label: 'Учителя',
      Component: <div>Hello, I am tab 1</div>,
   },
   {
      label: 'Студенты',
      Component: <div>Hello, I am tab 2</div>,
   },
]
function App() {
   return (
      <div className="App">
         <BasicTabs tabs={tabs} />
      </div>
   )
}

export default App
