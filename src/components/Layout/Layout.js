import React from "react";

import Header from "../Header/Header.jsx";
import Footer from "../Footer/Footer.jsx";
// import Routes from "../../routes/Routers";
import { Routes, Route, Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Home from "../../pages/Home";
import Menus from "../../pages/Menus";
import MenuDetails from "../../pages/MenuDetails";
import Cart from "../../pages/Cart";
import Checkout from "../../pages/Checkout";
import Carts from "../UI/cart/Carts.jsx";

import { useSelector } from "react-redux";
import Login from "../../pages/Login.jsx";
import Personal from "../../pages/Personal.jsx";

const Layout = () => {
  return (
    <div className="d-flex flex-column vh-100 justify-content-between">
      <Routes>
        <Route element={<HomeLayout />}>
          <Route index element={<Home />} />
          <Route path="/home" element={<Navigate to="/" />} />
          <Route path="/menu" element={<Menus />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/personal" element={<Personal />} />
        </Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
    </div>
  );
};

const HomeLayout = () => {
  const showCart = useSelector((state) => state.cartUi.cartIsVisible);
  return (
    <>
      <Header />
      {showCart && <Carts />}
      <div>
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

export default Layout;
