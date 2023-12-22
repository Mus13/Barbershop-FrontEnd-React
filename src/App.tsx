import './App.css';
import React from 'react';
import { Navbar } from './layouts/NavbarAndFooter/Navbar';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { HomePage } from './layouts/HomePage/HomePage';
import { Footer } from './layouts/NavbarAndFooter/Footer';

export const App = () => {
  return (
    <div className='d-flex flex-column min-vh-100'>
      <Router>
      <Navbar />
      <div className='flex-grow-1'>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<HomePage />} />
          </Routes>
      </div>
      <Footer />
      </Router>
    </div>
  );
}
