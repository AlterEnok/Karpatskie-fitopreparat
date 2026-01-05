import { useEffect, useState, useRef, useContext } from "react";
import "./Header.css";
import { FaRegHeart, FaSearch, FaUserCircle } from "react-icons/fa";
import { RiShoppingBagLine, RiMenu3Line } from "react-icons/ri";
import logo from "../../assets/logo.svg";
import WishlistContext from "../../context/WishlistContext";
import CartContext from "../../context/CartContext";
import AuthContext from "../../context/AuthContext";
import { products } from "../../data/products";
import { Link } from "react-router-dom";

const Header = () => {
    const [scrollDirection, setScrollDirection] = useState("top");
    const lastScroll = useRef(0);

    const [menuOpen, setMenuOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);

    const { toggleCart, cartItems } = useContext(CartContext);
    const { user, setIsAuthOpen, logout } = useContext(AuthContext);

    // ПОИСКОВИК
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchValue, setSearchValue] = useState("");



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
        if (menuOpen || userMenuOpen || searchOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        return () => {
            document.body.style.overflow = "auto";
        };
    }, [menuOpen, userMenuOpen, searchOpen]);




    const { wishlist } = useContext(WishlistContext);
    const wishlistCount = wishlist.length;
    const scrollY = useRef(0);

    useEffect(() => {
        if (menuOpen || userMenuOpen) {
            scrollY.current = window.scrollY;

            document.body.style.position = "fixed";
            document.body.style.top = `-${scrollY.current}px`;
            document.body.style.left = "0";
            document.body.style.right = "0";
            document.body.style.width = "100%";
        } else {
            document.body.style.position = "";
            document.body.style.top = "";
            document.body.style.left = "";
            document.body.style.right = "";
            document.body.style.width = "";

            window.scrollTo(0, scrollY.current);
        }

        return () => {
            document.body.style.position = "";
            document.body.style.top = "";
            window.scrollTo(0, scrollY.current);
        };
    }, [menuOpen, userMenuOpen]);

    // ПОИСКОВИК


    const filteredProducts = products.filter(p =>
        p.title.toLowerCase().includes(searchValue.toLowerCase())
    );

    const closeSearch = () => {
        setSearchOpen(false);
        setSearchValue("");
    };

    return (
        <>

            <header
                className={`header 
                    ${scrollDirection === "down" ? "scroll-down" : ""} 
                    ${scrollDirection === "up" ? "scroll-up" : ""}
                `}
            >
                <div className="header__search">
                    <input
                        type="text"
                        placeholder="Пошук..."
                        onFocus={() => setSearchOpen(true)}
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                    />
                    <FaSearch className="header__search-icon" />

                    {searchOpen && (
                        <div
                            className="search-overlay"
                            onClick={closeSearch}
                        >
                            <div
                                className="search-modal"
                                onClick={(e) => e.stopPropagation()}
                            >
                                {/* КРЕСТИК */}
                                <button
                                    className="search-close"
                                    onClick={closeSearch}
                                    aria-label="Close search"
                                >
                                    ×
                                </button>

                                <input
                                    className="search-modal__input"
                                    type="text"
                                    autoFocus
                                    placeholder="Введіть назву товару"
                                    value={searchValue}
                                    onChange={(e) => setSearchValue(e.target.value)}
                                />

                                {searchValue.length < 2 && (
                                    <div className="search-hint">
                                        Почніть вводити назву товару
                                    </div>
                                )}

                                {searchValue.length >= 2 && filteredProducts.length === 0 && (
                                    <div className="search-empty">
                                        Нічого не знайдено
                                    </div>
                                )}

                                {searchValue.length >= 2 && (
                                    <div className="search-results">
                                        {filteredProducts.slice(0, 5).map(product => (
                                            <Link
                                                key={product.id}
                                                to={`/product/${product.id}`}
                                                className="search-item"
                                                onClick={closeSearch}
                                            >
                                                <img src={product.image} alt={product.title} />
                                                <div className="search-item__info">
                                                    <div className="search-item__title">
                                                        {product.title}
                                                    </div>
                                                    <div className="search-item__price">
                                                        {product.price} грн
                                                    </div>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
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
