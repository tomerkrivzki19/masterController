import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import MainPage from "./componentes/MainPage";
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
import Takanon from "./componentes/Takanon";
// import { CartProvider } from "./contexts/cartContext";

function App() {
  return (
    <>
      <Router>
        {/* <CartProvider> */}
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
        {/* </CartProvider> */}
      </Router>
    </>
  );
}

export default App;
