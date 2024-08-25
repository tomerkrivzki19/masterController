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
          {/* testing shoping cart */}
          <Route path="/cart" element={<ShopingCart />} />
          {/* testing success page test */}
          <Route path="/success" element={<SuccessPage />} />
          {/* faq page test */}
          <Route path="/faq" element={<FAQ />} />
          {/* Bbout us */}
          <Route path="/about" element={<AboutUs />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
