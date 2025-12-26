import { useEffect, useState, useRef, useContext } from "react";
import "./Header.css";
import { FaRegHeart, FaSearch, FaUserCircle } from "react-icons/fa";
import { RiShoppingBagLine, RiMenu3Line } from "react-icons/ri";
import logo from "../../assets/logo.svg";
import WishlistContext from "../../context/WishlistContext";
import CartContext from "../../context/CartContext";
import AuthContext from "../../context/AuthContext";
import { Link } from "react-router-dom";

const Header = () => {
    const [scrollDirection, setScrollDirection] = useState("top");
    const lastScroll = useRef(0);

    const [menuOpen, setMenuOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);

    const { toggleCart, cartItems } = useContext(CartContext);
    const { user, setIsAuthOpen, logout } = useContext(AuthContext);

    const cartCount = cartItems.reduce((sum, i) => sum + i.quantity, 0);

    const openAuth = () => {
        setMenuOpen(false);
        setIsAuthOpen(true);
    };

    useEffect(() => {
        const handleScroll = () => {
            const current = window.scrollY;
            if (current <= 20) setScrollDirection("top");
            else if (current > lastScroll.current) setScrollDirection("down");
            else setScrollDirection("up");
            lastScroll.current = current;
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        document.body.style.overflow =
            menuOpen || userMenuOpen ? "hidden" : "auto";

        return () => {
            document.body.style.overflow = "auto";
        };
    }, [menuOpen, userMenuOpen]);

    const { wishlist } = useContext(WishlistContext);
    const wishlistCount = wishlist.length;


    return (
        <>

            <header
                className={`header 
                    ${scrollDirection === "down" ? "scroll-down" : ""} 
                    ${scrollDirection === "up" ? "scroll-up" : ""}
                `}
            >
                <div className="header__search">
                    <input type="text" placeholder="Пошук..." />
                    <FaSearch className="header__search-icon" />
                </div>

                <div className="header__logo">
                    <Link to="/">
                        <img src={logo} alt="Рослина Карпат" />
                    </Link>
                </div>

                <div className="header__icons">

                    <Link to="/wishlist" className="header__wishlist">
                        <FaRegHeart className="header__icon" />

                        {wishlistCount > 0 && (
                            <span className="header__wishlist-count">
                                {wishlistCount}
                            </span>
                        )}
                    </Link>



                    {/* ===== USER ICON ===== */}
                    {user && (
                        <>
                            <FaUserCircle
                                className="header__icon"
                                onClick={() => setUserMenuOpen(true)}
                            />

                            {userMenuOpen && (
                                <div
                                    className="user-modal-overlay"
                                    onClick={() => setUserMenuOpen(false)}
                                >
                                    <div
                                        className="user-modal"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        {/* ✕ CLOSE */}
                                        <button
                                            className="user-modal__close"
                                            onClick={() => setUserMenuOpen(false)}
                                            aria-label="Закрити"
                                        >
                                            ✕
                                        </button>

                                        <div className="user-modal__title">
                                            Вітаємо, <span>{user.name}</span>
                                        </div>

                                        <Link
                                            to="/profile"
                                            className="user-modal__link"
                                            onClick={() => setUserMenuOpen(false)}
                                        >
                                            Перейти до профілю
                                        </Link>

                                        <button
                                            className="user-modal__logout"
                                            onClick={() => {
                                                logout();
                                                setUserMenuOpen(false);
                                            }}
                                        >
                                            Вийти
                                        </button>
                                    </div>
                                </div>
                            )}
                        </>
                    )}




                    {/* ===== CART ===== */}
                    <div className="header__cart-wrapper" onClick={toggleCart}>
                        <RiShoppingBagLine className="header__icon" />
                        {cartCount > 0 && (
                            <span className="header__cart-count">{cartCount}</span>
                        )}
                    </div>

                    <RiMenu3Line
                        className="header__icon"
                        onClick={() => setMenuOpen(true)}
                    />
                </div>
            </header>

            {/* ===== MOBILE MENU ===== */}
            <div
                className={`menu-overlay ${menuOpen ? "show" : ""}`}
                onClick={() => setMenuOpen(false)}
            />

            <div className={`menu-sidebar ${menuOpen ? "open" : ""}`}>
                <button className="menu-close" onClick={() => setMenuOpen(false)}>
                    <span></span><span></span>
                </button>

                <nav className="menu-links">
                    <Link to="/" className="menu-item" onClick={() => setMenuOpen(false)}>
                        <span className="menu-item-text">Головна</span>
                        <small>01</small>
                    </Link>

                    <Link to="/catalog" className="menu-item" onClick={() => setMenuOpen(false)}>
                        <span className="menu-item-text">Каталог</span>
                        <small>02</small>
                    </Link>

                    <Link to="/contacts" className="menu-item" onClick={() => setMenuOpen(false)}>
                        <span className="menu-item-text">Контакти</span>
                        <small>03</small>
                    </Link>
                </nav>

                <a href="mailto:drabuk_olena@ukr.net" className="menu-email">
                    drabuk_olena@ukr.net
                </a>

                {!user && (
                    <button className="menu-auth-btn" onClick={openAuth}>
                        Вхід / Реєстрація
                    </button>
                )}
            </div>
        </>
    );
};

export default Header;
