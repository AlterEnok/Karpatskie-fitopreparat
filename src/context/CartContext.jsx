import React, { createContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);

    const addToCart = (item) => {
        setCartItems((prev) => {
            const exists = prev.find((i) => i.id === item.id);
            if (exists) {
                return prev.map((i) =>
                    i.id === item.id
                        ? { ...i, quantity: i.quantity + 1 }
                        : i
                );
            }
            return [...prev, { ...item, quantity: 1 }];
        });
    };

    const removeFromCart = (id) =>
        setCartItems((prev) => prev.filter((i) => i.id !== id));

    const incrementItem = (id) =>
        setCartItems((prev) =>
            prev.map((i) =>
                i.id === id ? { ...i, quantity: i.quantity + 1 } : i
            )
        );

    const decrementItem = (id) =>
        setCartItems((prev) =>
            prev
                .map((i) =>
                    i.id === id ? { ...i, quantity: i.quantity - 1 } : i
                )
                .filter((i) => i.quantity > 0)
        );

    const toggleCart = () => setIsCartOpen((prev) => !prev);
    const closeCart = () => setIsCartOpen(false);
    const clearCart = () => setCartItems([]);


    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                removeFromCart,
                incrementItem,
                decrementItem,
                clearCart,
                isCartOpen,
                toggleCart,
                closeCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export default CartContext;
