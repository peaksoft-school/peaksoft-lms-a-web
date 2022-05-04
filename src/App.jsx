import './App.css'
import { Card } from './components/UI/Card'

function App() {
   return (
      <div className="App">
         <Card
            img="https://cdn.pixabay.com/photo/2021/08/25/20/42/field-6574455__340.jpg"
            title="javascript"
            date="20.02.22"
            description="javaвввввscript is a modввввввввввввввввввввввввввввввввввввввввввввввввввввввввввввввввввввввввern programвыыыввввввввввввввввввввввввввввввввввввввввввввввввввввввввввввввввввввввввввввввввввввввввввввввввввввввввввввввmatic language"
         />
         <Card
            img="https://cdn.pixabay.com/photo/2021/08/25/20/42/field-6574455__340.jpg"
            title="javascript"
            date="20.02.22"
            // description="javascript is a modern programmatic language"
         />
         <Card img="https://cdn.pixabay.com/photo/2021/08/25/20/42/field-6574455__340.jpg" />
      </div>
   )
}

export default App
