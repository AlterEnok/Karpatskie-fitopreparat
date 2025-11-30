import { useEffect, useState, useRef, useContext } from "react";
import "./Header.css";
import { FaRegHeart, FaSearch } from "react-icons/fa";
import { RiShoppingBagLine, RiMenu3Line } from "react-icons/ri";
import logo from "../../assets/logo.svg";
import CartContext from "../../context/CartContext";
import { Link } from "react-router-dom";

const Header = () => {
    const [scrollDirection, setScrollDirection] = useState("top");
    const lastScroll = useRef(0);

    const [menuOpen, setMenuOpen] = useState(false);

    const { toggleCart, cartItems } = useContext(CartContext);

    // Количество товаров
    const cartCount = cartItems.reduce((sum, i) => sum + i.quantity, 0);

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
        document.body.style.overflow = menuOpen ? "hidden" : "auto";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [menuOpen]);

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
                    <img src={logo} alt="Рослина Карпат" />
                </div>

                <div className="header__icons">

                    <FaRegHeart className="header__icon" />

                    {/* КОРЗИНА С СЧЁТЧИКОМ */}
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

            <div
                className={`menu-overlay ${menuOpen ? "show" : ""}`}
                onClick={() => setMenuOpen(false)}
            ></div>

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

                <p className="menu-email">drabuk_olena@ukr.net</p>
                <h1 className="menu-title">М Е Н Ю</h1>
            </div>
        </>
    );
};

export default Header;
