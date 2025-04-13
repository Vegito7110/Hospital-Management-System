// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import Navbar from './components/NavBar';
import './index.css';

import Doctors from './pages/Doctors';
import InPatients from './pages/InPatients';
import OutPatients from './pages/OutPatients';
import Cashier from './pages/Cashier';
import Billing from './pages/Billing';
import Rooms from './pages/Rooms';
import Staff from './pages/Staff';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/in-patients" element={<InPatients />} />
        <Route path="/out-patients" element={<OutPatients />}/>
        <Route path="/rooms" element={<Rooms />}/>
        <Route path="/cashier" element={<Cashier />}/>
        <Route path="/billing" element={<Billing />}/>
        <Route path="/staff" element={<Staff />}/>
        
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
