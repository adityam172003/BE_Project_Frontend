import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from '../src/Components/Navbar'
import Login from './Components/Login'
import Home from './Components/Home'
import About from './Components/About'
import Footer from './Components/Footer'
import Dropbox from './Components/Dropbox'
import ViewDoc from './Components/ViewDoc'
import Chunks from './Components/Chunks'
import { useLocation } from 'react-router-dom';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {
  
    const location = useLocation();

  return (
    <div className="app-container layout">
      <Navbar />

      {/* Scrollable content section */}
      <main className="main-content bg-base-300">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about/" element={<About />} />
          <Route path="/viewdoc/:projectId" element={<ViewDoc />} />
          <Route path="/chunks/:projectId/:fileId/:chunkId" element={<Chunks />} />
          <Route path="/dropbox" element={<Dropbox />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App