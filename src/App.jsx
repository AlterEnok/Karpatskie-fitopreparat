import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import { WishlistProvider } from "./context/WishlistContext";
import AuthModal from "./components/AuthModal/AuthModal";
import CartSidebar from "./components/CartSideBar/CartSideBar";
import Header from "./components/Header/Header";
import ScrollToTop from "./ScrollToTop";

import { Routes, Route, useLocation } from "react-router-dom";

import Home from "./pages/HomePage/Home";
import Catalog from "./pages/Catalog/Catalog";
import ContactsPage from "./pages/ContactsPage/ContactsPage";
import ProductPage from "./pages/ProductPage/ProductPage";
import WishlistPage from "./pages/WishlistPage/WishlistPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";


function App() {
  const location = useLocation(); // ← ВАЖНО

  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <ScrollToTop />

          <Header />
          <AuthModal />
          <CartSidebar />

          {/* 🔥 ТОЛЬКО ЭТО ДОБАВИЛИ */}
          <div className="page-wrapper">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home />} />
              <Route path="/catalog" element={<Catalog />} />
              <Route path="/product/:id" element={<ProductPage />} />
              <Route path="/contacts" element={<ContactsPage />} />
              <Route path="/wishlist" element={<WishlistPage />} />
              <Route path="/profile" element={<ProfilePage />} />

            </Routes>
          </div>
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
