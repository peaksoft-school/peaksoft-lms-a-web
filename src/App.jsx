// import { AppRoutes } from './routes/AppRoutes'
import { useState } from 'react'
import { Select } from './components/UI/select/Select'

const options = [
   {
      id: 'Online',
      title: 'Online',
   },
   {
      id: 'Offline',
      title: 'Offline',
   },
]
function App() {
   const [value, setValue] = useState('')
   const handleChange = (e) => {
      setValue(e.target.value)
   }
   const selectedHandler = (selected) => {
      console.log(selected)
   }
   return (
      <div style={{ width: '200px', margin: '300px' }}>
         <Select
            options={options}
            placeholder="Формат обучения"
            type={'Second' && true}
            value={value}
            onChange={handleChange}
            selectedOption={selectedHandler}
         />
      </div>
   )
}

export default App
