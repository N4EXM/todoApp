import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Home from './pages/Home'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './pages/Login'
import Register from './pages/Register'
import CalendarPage from './pages/CalendarPage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route
            index
            path='/'
            element={
              <ProtectedRoute>
                <Home/>
              </ProtectedRoute>
            }
          />
          <Route
            index
            path='/Calendar'
            element={
              <ProtectedRoute>
                <CalendarPage/>
              </ProtectedRoute>
            }
          />
          <Route
            path='/Login'
            element={<Login/>}
          />
          <Route
            path='/Register'
            element={<Register/>}
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
