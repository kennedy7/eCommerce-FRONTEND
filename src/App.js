import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Redirect } from 'react-router-dom';
import Cart from './components/Cart';
import Home from './components/Home';
import NavBar from './components/NavBar';

function App() {
  return (
    <div className="App">
      <Router>
        
      <NavBar/>
      <Routes>
        <Route path="/cart" element={<Cart/>} />
        <Route path="/" element={<Home/>} />
      </Routes>
      
      </Router>
    </div>
  );
}



export default App;
