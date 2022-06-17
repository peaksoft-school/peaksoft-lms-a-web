import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store/index'
import App from './App'
import { Spinner } from './components/UI/Spinner/Spinner'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
   <Provider store={store}>
      <React.StrictMode>
         <Suspense fallback={<Spinner />}>
            <BrowserRouter>
               <App />
            </BrowserRouter>
         </Suspense>
      </React.StrictMode>
   </Provider>
)
