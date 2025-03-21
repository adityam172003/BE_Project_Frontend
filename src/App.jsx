import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from '../src/Components/Navbar'
import Login from './Components/Login'
import Home from './Components/Home'
import Footer from './Components/Footer'
import Dropbox from './Components/Dropbox'
import ViewDoc from './Components/ViewDoc'
import Chunks from './Components/Chunks'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {
  return (
   
   <>
    <Navbar />
    <Login/>
    
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/viewdoc/:projectId" element={<ViewDoc />} />
      <Route path="/chunks/:projectId/:fileId/:chunkId" element={<Chunks />} />

    </Routes>
    <Footer />
  </>
   
     
    //   
    //    <Home /> 
     
    //   {/* <Navbar /> */}
    //     <Dropbox />
    //      
    //     <ViewDoc/>
     
    //   <Footer />
    // </>
  );
}

export default App