import { useParams } from "react-router-dom";
import { useState, useContext } from "react";
import "./ProductPage.css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import CartContext from "../../context/CartContext";

import productImg1 from "../../assets/product-page.png";
import productImg2 from "../../assets/product-page2.jpg";

const ProductPage = () => {
    const { id } = useParams();
    const { addToCart } = useContext(CartContext);

    const product = {
        id,
        title: "Імуностан",
        subtitle: "Зміцнює захисні сили організму",
        price: 1190,
        images: [productImg1, productImg2],

        description: `Шампунь для щоденного догляду. Дбайливо очищає волосся та шкіру голови, зберігаючи природний баланс вологи. Надає волоссю легкість, свіжість і природний блиск. Підходить для щоденного використання та різних типів волосся.`,

        usage: `Нанести невелику кількість на вологе волосся, спінити...`,

        ingredients: `М’ята, ромашка, алое, олії, протеїни...`
    };

    const [currentIndex, setCurrentIndex] = useState(0);
    const [fullscreen, setFullscreen] = useState(false);

    const [activeTab, setActiveTab] = useState("description");

    const prevSlide = () => {
        setCurrentIndex((prev) =>
            prev === 0 ? product.images.length - 1 : prev - 1
        );
    };

    const nextSlide = () => {
        setCurrentIndex((prev) =>
            prev === product.images.length - 1 ? 0 : prev + 1
        );
    };

    // Текст, который меняется в product-description
    const getCurrentText = () => {
        if (activeTab === "usage") return product.usage;
        if (activeTab === "ingredients") return product.ingredients;
        return product.description;
    };

    return (
        <>
            {fullscreen && (
                <div className="fullscreen" onClick={() => setFullscreen(false)}>
                    <img
                        src={product.images[currentIndex]}
                        className="fullscreen-img"
                    />
                </div>
            )}

            <div className="product-page">
                <h1 className="product-title">{product.title}</h1>
                <p className="product-sub">{product.subtitle}</p>

                <div className="product-slider">
                    <button className="arrow-btn left" onClick={prevSlide}>
                        <FaArrowLeft />
                    </button>

                    <img
                        src={product.images[currentIndex]}
                        className="product-main-img"
                        onClick={() => setFullscreen(true)}
                    />

                    <button className="arrow-btn right" onClick={nextSlide}>
                        <FaArrowRight />
                    </button>

                    <button
                        className="add-cart-btn"
                        onClick={() =>
                            addToCart({
                                ...product,
                                image: product.images[0]
                            })
                        }
                    >
                        Додати в корзину
                    </button>

                    <div className="price-box">{product.price} грн</div>
                </div>

                {/* БЛОК ОПИСАНИЯ с динамическим текстом */}
                <div className="product-description">
                    <h2>{product.title}</h2>
                    <p className="product-sub">{product.subtitle}</p>
                    <p className="product-text">{getCurrentText()}</p>
                </div>

                {/* Вкладки */}
                <div className="tabs-container">
                    <button
                        className={`tab-btn ${activeTab === "description" ? "active" : ""}`}
                        onClick={() => setActiveTab("description")}
                    >
                        Опис
                    </button>

                    <button
                        className={`tab-btn ${activeTab === "usage" ? "active" : ""}`}
                        onClick={() => setActiveTab("usage")}
                    >
                        Застосування
                    </button>

                    <button
                        className={`tab-btn ${activeTab === "ingredients" ? "active" : ""}`}
                        onClick={() => setActiveTab("ingredients")}
                    >
                        Склад
                    </button>
                </div>
            </div>
        </>
    );
};

export default ProductPage;
