import './App.css'
import { ToggleSwitch } from './components/UI/ToggleSwitch'

function App() {
   return (
      <div className="App">
         <ToggleSwitch id="switcher1" name="switcher1" />
         <ToggleSwitch id="switcher2" name="switcher2" />
      </div>
   )
}

export default App
