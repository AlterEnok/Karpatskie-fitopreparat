import "./CartSidebar.css";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CartContext from "../../context/CartContext";
import AuthContext from "../../context/AuthContext";


const CartSidebar = () => {
    const {
        cartItems,
        removeFromCart,
        incrementItem,
        decrementItem,
        isCartOpen,
        closeCart,
    } = useContext(CartContext);

    const { user, setIsAuthOpen } = useContext(AuthContext);


    const total = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    const navigate = useNavigate();


    useEffect(() => {
        document.body.style.overflow = isCartOpen ? "hidden" : "";
        return () => (document.body.style.overflow = "");
    }, [isCartOpen]);

    return (
        <>
            <div
                className={`overlay ${isCartOpen ? "show" : ""}`}
                onClick={closeCart}
            ></div>

            <aside className={`cart-sidebar ${isCartOpen ? "open" : ""}`}>

                <div className="cart-header">
                    <h2>Мій кошик</h2>

                    <button className="close-btn" onClick={closeCart}>
                        <span></span>
                        <span></span>
                    </button>
                </div>

                <div className="cart-top-line"></div>

                {cartItems.length === 0 ? (
                    <p className="empty">Ваш кошик порожній</p>
                ) : (
                    <>
                        <div className="cart-items">
                            {cartItems.map((item) => (
                                <div className="cart-item" key={item.id}>
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="cart-image"
                                    />

                                    <div className="cart-details">
                                        <h4>{item.title}</h4>
                                        <p className="desc">{item.subtitle}</p>
                                        <p className="price">{item.price} ₴</p>

                                        <div className="qty-capsule">
                                            <button
                                                className="qty-btn"
                                                onClick={() => incrementItem(item.id)}
                                            >
                                                +
                                            </button>

                                            <span>{item.quantity}</span>

                                            <button
                                                className="qty-btn"
                                                onClick={() => decrementItem(item.id)}
                                            >
                                                -
                                            </button>
                                        </div>
                                    </div>

                                    <button
                                        className="remove"
                                        onClick={() => removeFromCart(item.id)}
                                    >
                                        ×
                                    </button>
                                </div>
                            ))}
                        </div>

                        <div className={`order-panel ${isCartOpen ? "show" : ""}`}>
                            <div className="total">
                                <p className="total-label">Всього:</p>
                                <p className="total-value">{total} ₴</p>
                            </div>


                            <button
                                className="order-btn"
                                onClick={() => {
                                    if (!user) {
                                        closeCart();
                                        setIsAuthOpen(true);
                                        return;
                                    }

                                    closeCart();
                                    navigate("/checkout");
                                }}
                            >
                                Оформити замовлення
                            </button>

                        </div>
                    </>
                )}
            </aside>
        </>
    );
};

export default CartSidebar;
