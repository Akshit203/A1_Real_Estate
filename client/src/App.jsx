import React, { useEffect } from 'react'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Footer from './components/Footer'
import Properties from './components/Properties'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SignIn from './pages/SignIn'
import Register from './pages/Register'
import About from './pages/About'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ListProperty from './pages/ListProperty'
import Dashboard from './pages/Dashboard'
import UpdateProperty from './components/UpdateProperty'
import ContactSeller from './components/ContactSeller'

// Import redux hooks and action
import { useDispatch } from 'react-redux'
import { loadUserFromStorage } from './redux/authSlice'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    // Load user and token from localStorage on app start
    dispatch(loadUserFromStorage())
  }, [dispatch])

  return (
    <>
      <BrowserRouter>
        <ToastContainer position="top-right" autoClose={3000} />

        <Navbar />

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/properties' element={<Properties />} />
          <Route path='/sign-in' element={<SignIn />} />
          <Route path='/register' element={<Register />} />
          <Route path='/about' element={<About />} />
          <Route path='/list-property' element={<ListProperty />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/contact-seller' element={<ContactSeller />} />

          <Route path='/edit-property/:propertyId' element={<UpdateProperty />} />
        </Routes>

        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
