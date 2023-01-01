import React from "react";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Cart from "./components/Cart";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import NotFound from "./components/NotFound";

function App() {
  return (
    <div className="App">
      <Router>
        <ToastContainer />
        <NavBar />
        <Routes>
          <Route path="/cart" element={<Cart />} />
          <Route path="/not-found" element={<NotFound />} />
          <Route path="/" exact element={<Home />} />
          <Route path="*" element={<Navigate to="/not-found" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
