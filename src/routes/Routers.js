import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Home from "../pages/Home";
import Menus from "../pages/Menus";
import MenuDetails from "../pages/MenuDetails";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Home />} />
      <Route path="/menu" element={<Menus />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/menu/:id" element={<MenuDetails />} />
    </Routes>
  );
};

export default Routers;
