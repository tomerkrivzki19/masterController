import { useState } from "react";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import MainPage from "./componentes/MainPage";

import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Shop from "./componentes/Shop";
import ProductItem from "./componentes/ProductItem";
import ShopingCart from "./componentes/ShopingCart";
import SuccessPage from "./componentes/SuccessPage";

function App() {
  const [count, setCount] = useState(0);
  console.log(1111);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/shop" element={<Shop />} />
          {/* testing product pages */}
          <Route path="/item" element={<ProductItem />} />
          {/* testing shoping cart */}
          <Route path="/cart" element={<ShopingCart />} />
          {/* testing success page */}
          <Route path="/success" element={<SuccessPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
