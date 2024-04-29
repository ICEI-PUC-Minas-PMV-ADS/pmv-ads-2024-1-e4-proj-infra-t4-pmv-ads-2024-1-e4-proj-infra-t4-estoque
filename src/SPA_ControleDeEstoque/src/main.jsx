import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { GlobalStyle } from './GlobalStyled.jsx';
import Header from './components/Header/Header.jsx';

import Home from './pages/Home/Home.jsx';


createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GlobalStyle />
 
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={
          <Home />} />
          
       
        </Routes>
      </BrowserRouter>

  </React.StrictMode>
);
