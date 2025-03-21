import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { ThemeProvider } from "./contexts/ThemeContext";
import { BrowserRouter } from 'react-router-dom';
import { AuthContextProvider } from './contexts/AuthContext.jsx';
import Footer from './Components/Footer.jsx';

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <AuthContextProvider>
        <BrowserRouter>
          <App />
          
        </BrowserRouter>
      </AuthContextProvider>
    </ThemeProvider>
    
  </React.StrictMode>
);
