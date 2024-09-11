import { useState } from 'react'
import './App.css'
import { Outlet } from 'react-router-dom'
import { UserProvider } from './Context/UserContext.jsx'

function App() {

  return (
    <UserProvider>
      <Outlet />
    </UserProvider>
  )
}

export default App
