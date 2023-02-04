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
import Register from "./components/auth/register";
import Login from "./components/auth/login";
import CheckOutSuccess from "./components/CheckoutSuccess";
import Dashboard from "./components/admin/Dashboard";
import Products from "./components/admin/Products";
import Summary from "./components/admin/Summary";
import CreateProduct from "./components/admin/CreateProduct";
import Orders from "./components/admin/Orders";
import Users from "./components/admin/Users";

function App() {
  return (
    <div className="App">
      <Router>
        <ToastContainer />
        <NavBar />
        <Routes>
          <Route path="/checkout-success" exact element={<CheckOutSuccess />} />
          <Route path="/register" exact element={<Register />} />
          <Route path="/login" exact element={<Login />} />
          {/* Nested Route */}
          <Route path="/admin" exact element={<Dashboard />}>
            <Route path="summary" element={<Summary />} />
            {/* <Route path="/not-found" element={<NotFound />} /> */}
            {/* another nested route */}
            <Route path="products" element={<Products />}>
              <Route path="create-product" element={<CreateProduct />} />
            </Route>
            <Route path="orders" element={<Orders />} />
            <Route path="users" element={<Users />} />
          </Route>
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
