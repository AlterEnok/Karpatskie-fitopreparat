import { CartProvider } from "./context/CartContext";
import CartSidebar from "./components/CartSideBar/CartSideBar";
import Header from "./components/Header/Header";
import ScrollToTop from "./ScrollToTop";

import { Routes, Route } from "react-router-dom";

import Home from "./pages/HomePage/Home";
import Catalog from "./pages/Catalog/Catalog";
import ProductPage from "./pages/ProductPage/ProductPage";

function App() {
  return (
    <CartProvider>
      <ScrollToTop />

      <Header />
      <CartSidebar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/product/:id" element={<ProductPage />} />
      </Routes>
    </CartProvider>
  );
}

export default App;
