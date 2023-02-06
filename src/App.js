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
import ProductsList from "./components/admin/list/ProductsList";

function App() {
  return (
    <div className="App">
      <Router>
        <ToastContainer />
        <NavBar />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout-success" exact element={<CheckOutSuccess />} />
          <Route path="/register" exact element={<Register />} />
          <Route path="/login" exact element={<Login />} />
          {/* Nested Route */}
          <Route path="/admin" exact element={<Dashboard />}>
            {/* another nested route */}
            <Route path="products" element={<Products />}>
              <Route index element={<ProductsList />} />
              <Route path="create-product" element={<CreateProduct />} />
            </Route>
            <Route path="summary" element={<Summary />} />
            <Route path="orders" element={<Orders />} />
            <Route path="users" element={<Users />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
