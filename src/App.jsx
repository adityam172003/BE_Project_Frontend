import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from '../src/Components/Navbar'
import Login from './Components/Login'
import Home from './Components/Home'
import Footer from './Components/Footer'
import Dropbox from './Components/Dropbox'


function App() {
  return (
    <>
      {/* <Login/> */}
      
        {/* <Dropbox /> */}
     

      <Navbar />
      <Home />
      {/* <Home />
      <Home /> */}
      <Footer />
    </>
  );
}

export default App
