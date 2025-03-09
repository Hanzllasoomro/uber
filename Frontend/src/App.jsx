import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import UserSignup from './Pages/UserSignup'
import UserLogin from './Pages/UserLogin'
import CaptainSignup from './Pages/CaptainSignup'
import CaptainLogin from './Pages/CaptainLogin'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/user-signup" element={<UserSignup />} />
      <Route path="/user-login" element={<UserLogin />} />
      <Route path="/captain-signup" element={<CaptainSignup />} />
      <Route path="/captain-login" element={<CaptainLogin />} />
    </Routes>
  )
}

export default App