import { CartProvider } from "./context/CartContext";
import CartSidebar from "./components/CartSideBar/CartSideBar";
import Header from "./components/Header/Header";
import Home from "./pages/HomePage/Home";

function App() {
  return (
    <CartProvider>
      <Header />
      <CartSidebar />
      <Home />
    </CartProvider>
  );
}

export default App;
