import React from 'react'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Footer from './components/Footer'
import Properties from './components/Properties'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import SignIn from './components/SignIn'
import Register from './components/Register'
import About from './pages/About'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const App = () => {
  return (
    
    <>

    <BrowserRouter>
    <ToastContainer position="top-right" autoClose={3000} />


      <Navbar/>

      <Routes>
        <Route path='/' element = {<Home/>}/>
        <Route path='/properties' element = {<Properties/>}/>
        <Route path='/sign-in' element = {<SignIn/>}/>
        <Route path='/register' element = {<Register/>}/>
        <Route path='/about' element = {<About/>}/>


      </Routes>

      <Footer/>

    </BrowserRouter>


    
    </>
  )
}

export default App