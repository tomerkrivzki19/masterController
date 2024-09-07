import { useState, useEffect } from "react";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import MainPage from "./componentes/MainPage";

import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Shop from "./componentes/Shop";
import ProductItem from "./componentes/ProductItem";
import ShopingCart from "./componentes/ShopingCart";
import SuccessPage from "./componentes/SuccessPage";
import FAQ from "./componentes/FAQ";
import ErroePage from "./componentes/ErroePage";
import NavBar from "./componentes/NavBar";
import Footer from "./componentes/Footer";
import AboutUs from "./componentes/AboutUs";
import { CartProvider } from "./contexts/cartContext";
import Takanon from "./componentes/Takanon";

function App() {
  return (
    <>
      <Router>
        <NavBar />
        <Routes>
          <Route path="*" element={<ErroePage />} />

          <Route path="/" element={<MainPage />} />
          <Route path="/shop" element={<Shop />} />

          <Route path="/product/:id" element={<ProductItem />} />
          <Route path="/cart" element={<ShopingCart />} />
          <Route path="/success" element={<SuccessPage />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/site-policy" element={<Takanon />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
