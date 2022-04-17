import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from '../components/Login';
import '../styles/App.css';
import Home from '../components/Home';


function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Login/>} />
        <Route exact path="/home" element={<Home/>} />
      </Routes>
    </BrowserRouter>
        
      </div>
    
  );
}

export default App;
