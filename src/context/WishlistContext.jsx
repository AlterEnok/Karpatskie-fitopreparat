// context/WishlistContext.js
import React, { createContext, useState, useEffect, useContext } from "react";
import CartContext from "./CartContext";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
    const { addToCart } = useContext(CartContext);

    const [wishlist, setWishlist] = useState(() => {
        const stored = localStorage.getItem("wishlist");
        return stored ? JSON.parse(stored) : [];
    });

    useEffect(() => {
        localStorage.setItem("wishlist", JSON.stringify(wishlist));
    }, [wishlist]);

    const addToWishlist = (product) => {
        if (!wishlist.some(item => item.id === product.id)) {
            setWishlist(prev => [...prev, product]);
        }
    };

    const removeFromWishlist = (id) => {
        setWishlist(prev => prev.filter(item => item.id !== id));
    };

    const toggleWishlist = (product) => {
        wishlist.some(item => item.id === product.id)
            ? removeFromWishlist(product.id)
            : addToWishlist(product);
    };


    const moveToCart = (product) => {
        addToCart(product);
        removeFromWishlist(product.id);
    };

    return (
        <WishlistContext.Provider
            value={{
                wishlist,
                addToWishlist,
                removeFromWishlist,
                toggleWishlist,
                moveToCart
            }}
        >
            {children}
        </WishlistContext.Provider>
    );
};

export default WishlistContext;
