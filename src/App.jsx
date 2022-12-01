import {Routes, Route} from 'react-router-dom'
import { EmailForm } from './components/EmailForm'
import { Layout } from './components/Layout'
import { ProtectedRoute } from './components/ProtectedRoute'
import { Request } from './Page/Request'

function App() {

  return (
    <div className="App bg-gradient-to-r from-blue-100 to-blue-400 h-full max-w-full">
     <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<EmailForm />} />

        <Route path='/song' element={<ProtectedRoute />}>
          <Route path='/song/request' element={<Request />} />
        </Route>

      </Route>
     </Routes>
    </div>
  )
}

export default App
