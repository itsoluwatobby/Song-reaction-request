import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { DataContextProvider } from './context/DataContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/*' element={
          <DataContextProvider>
            <App />
          </DataContextProvider>
          } />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)