import "./ProductCard.css";
import { useContext } from "react";
import { Link } from "react-router-dom";
import CartContext from "../../context/CartContext";
import { FaHeart, FaShoppingBag } from "react-icons/fa";

function ProductCard({ product }) {
    const { addToCart } = useContext(CartContext);

    return (
        <Link to={`/product/${product.id}`} className="product-card">
            <div className="product-card__img">
                <img src={product.image} alt={product.title} />
            </div>

            <h3 className="product-card__title">{product.title}</h3>
            <p className="product-card__subtitle">{product.subtitle}</p>

            {/* Линия цена + овал */}
            <div className="product-card__line">
                <div className="product-card__price">{product.price} грн</div>

                <div className="product-card__floating">
                    <button className="product-card__icon">
                        <FaHeart />
                    </button>

                    <button
                        className="product-card__icon"
                        onClick={(e) => {
                            e.preventDefault();
                            addToCart(product);
                        }}
                    >
                        <FaShoppingBag />
                    </button>
                </div>
            </div>

            <button
                className="product-card__details"
                onClick={(e) => e.preventDefault()}
            >
                Детальніше
            </button>
        </Link>
    );
}

export default ProductCard;
