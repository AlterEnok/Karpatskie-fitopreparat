import { useState } from "react";

import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import { WishlistProvider } from "./context/WishlistContext";
import AuthModal from "./components/AuthModal/AuthModal";
import CartSidebar from "./components/CartSideBar/CartSideBar";
import Header from "./components/Header/Header";
import ScrollToTop from "./ScrollToTop";
import Preloader from "./components/Preloader/Preloader";

import { Routes, Route, useLocation } from "react-router-dom";

import Home from "./pages/HomePage/Home";
import Catalog from "./pages/Catalog/Catalog";
import ContactsPage from "./pages/ContactsPage/ContactsPage";
import ProductPage from "./pages/ProductPage/ProductPage";
import WishlistPage from "./pages/WishlistPage/WishlistPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import CheckoutPage from "./pages/CheckoutPage/CheckoutPage";

import SuccessPage from "./pages/SuccessPage/SuccessPage";
import FailurePage from "./pages/FailurePage/FailurePage";

import PublicOffer from "./pages/PublicOffer/PublicOffer";
import ReturnPage from "./pages/ReturnPage/ReturnPage";
import CertificatesPage from "./pages/CertificatesPage/CertificatesPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage/PrivacyPolicyPage";





function App() {
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && <Preloader onFinish={() => setLoading(false)} />}

      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <ScrollToTop />

            <Header />
            <AuthModal />
            <CartSidebar />

            <div className="page-wrapper">
              <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Home />} />
                <Route path="/catalog" element={<Catalog />} />
                <Route path="/product/:id" element={<ProductPage />} />
                <Route path="/contacts" element={<ContactsPage />} />
                <Route path="/wishlist" element={<WishlistPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/success" element={<SuccessPage />} />
                <Route path="/failure" element={<FailurePage />} />
                <Route path="/offer" element={<PublicOffer />} />
                <Route path="/return" element={<ReturnPage />} />
                <Route path="/certificates" element={<CertificatesPage />} />
                <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
              </Routes>
            </div>
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </>
  );
}

export default App;
