import "./ProductCard.css";
import { useContext, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import CartContext from "../../context/CartContext";
import AuthContext from "../../context/AuthContext";
import WishlistContext from "../../context/WishlistContext";
import { FaHeart, FaShoppingBag, FaCheck } from "react-icons/fa";

function ProductCard({ product }) {
    const { cartItems, addToCart, removeFromCart } = useContext(CartContext);
    const { user, requireAuth } = useContext(AuthContext);
    const { wishlist, toggleWishlist } = useContext(WishlistContext);

    const navigate = useNavigate();


    const inCart = useMemo(
        () => cartItems.some(item => item.id === product.id),
        [cartItems, product.id]
    );


    const inWishlist = useMemo(
        () => wishlist.some(item => item.id === product.id),
        [wishlist, product.id]
    );

    return (
        <Link to={`/product/${product.id}`} className="product-card">
            <div className="product-card__img">
                <img src={product.image} alt={product.title} />
            </div>

            <h3 className="product-card__title">{product.title}</h3>
            <p className="product-card__subtitle">{product.subtitle}</p>

            <div className="product-card__line">
                <div className="product-card__price">
                    {product.price} грн
                </div>

                <div className="product-card__floating">

                    {/* ❤️ WISHLIST */}
                    <button
                        className={`product-card__icon heart ${inWishlist ? "active" : ""}`}
                        onClick={(e) => {
                            e.preventDefault();

                            if (!user) {
                                requireAuth();
                                return;
                            }

                            toggleWishlist(product);
                        }}
                    >
                        <FaHeart />
                    </button>

                    {/* 🛒 CART */}
                    <button
                        className={`product-card__icon cart ${inCart ? "added" : ""}`}
                        onClick={(e) => {
                            e.preventDefault();

                            if (inCart) {
                                removeFromCart(product.id);
                            } else {
                                addToCart(product);
                            }
                        }}
                    >
                        {inCart ? <FaCheck /> : <FaShoppingBag />}
                    </button>

                </div>
            </div>

            <button
                className="product-card__details"
                onClick={(e) => {
                    e.preventDefault();
                    navigate(`/product/${product.id}`);
                }}
            >
                <span>Детальніше</span>
            </button>
        </Link>
    );
}

export default ProductCard;
