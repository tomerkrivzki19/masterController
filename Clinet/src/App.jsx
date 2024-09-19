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
import { CartProvider } from "./contexts/CartContext";
import Favorites from "./componentes/Favorites";
import FavoritesContext from "./contexts/FavoritesContext";

function App() {
  return (
    <>
      <Router>
        <CartProvider>
          <FavoritesContext>
            <NavBar />
            <Routes>
              <Route path="*" element={<ErroePage />} />
              <Route path="/" element={<MainPage />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/product/:id" element={<ProductItem />} />
              <Route path="/cart" element={<ShopingCart />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/site-policy" element={<Takanon />} />
              <Route path="/success" element={<SuccessPage />} />
            </Routes>
            <Footer />
          </FavoritesContext>
        </CartProvider>
      </Router>
    </>
  );
}

export default App;
