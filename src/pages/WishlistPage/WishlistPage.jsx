import { useContext } from "react";
import WishlistContext from "../../context/WishlistContext";
import { Link } from "react-router-dom";
import { FaHeartBroken } from "react-icons/fa";
import ProductCard from "../../components/ProductCard/ProductCard";
import Footer from "../../components/Footer/Footer";
import "./WishlistPage.css";
import usePageTitle from "../../hooks/usePageTitle";

export default function WishlistPage() {
    usePageTitle("Список бажань ");

    const { wishlist } = useContext(WishlistContext);


    if (wishlist.length === 0) {
        return (
            <>
                <div className="wishlist-page empty">
                    <FaHeartBroken className="wishlist-empty-icon" />

                    <h2>Список бажань порожній</h2>
                    <p>
                        Ви ще не додали жодного товару до списку бажань
                    </p>

                    <Link to="/catalog" className="wishlist-back-btn">
                        Перейти до каталогу
                    </Link>
                </div>

                <Footer />
            </>
        );
    }

    // 🟢 если есть товары
    return (
        <>
            <div className="wishlist-page">
                <h1 className="wishlist-title">Список бажань</h1>

                <div className="wishlist-grid">
                    {wishlist.map(product => (
                        <ProductCard
                            key={product.id}
                            product={product}
                        />
                    ))}
                </div>
            </div>

            <Footer />
        </>
    );
}
