import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { useRef } from "react";
import "./ProductPage.css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import CartContext from "../../context/CartContext";
import ProductCard from "../../components/ProductCard/ProductCard";
import products from "../../data/products";
import Footer from "../../components/Footer/Footer";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";




import productImg1 from "../../assets/product-page.png";
import productImg2 from "../../assets/product-page2.jpg";

const VISIBLE_COUNT = 3;

const ProductPage = () => {
    const { id } = useParams();
    const { addToCart } = useContext(CartContext);

    const prevRef = useRef(null);
    const nextRef = useRef(null);
    const swiperRef = useRef(null);

    const product = {
        id,
        title: "Імуностан",
        subtitle: "Зміцнює захисні сили організму",
        price: 1190,
        images: [productImg1, productImg2],
        description:
            "Шампунь для щоденного догляду. Дбайливо очищає волосся та шкіру голови, зберігаючи природний баланс вологи.",
        usage: "Нанести на вологе волосся, спінити, змити.",
        ingredients: "М’ята, ромашка, алое, натуральні олії."
    };

    const [currentIndex, setCurrentIndex] = useState(0);
    const [fullscreen, setFullscreen] = useState(false);
    const [activeTab, setActiveTab] = useState("description");





    const getCurrentText = () => {
        if (activeTab === "usage") return product.usage;
        if (activeTab === "ingredients") return product.ingredients;
        return product.description;
    };

    /* ---------- СХОЖІ ТОВАРИ ---------- */

    const similarProducts = products.slice(0, 5);


    /** 🔑 ВАЖНО: подключаем стрелки ПОСЛЕ init */
    useEffect(() => {
        if (!swiperRef.current) return;

        swiperRef.current.params.navigation.prevEl = prevRef.current;
        swiperRef.current.params.navigation.nextEl = nextRef.current;
        swiperRef.current.navigation.init();
        swiperRef.current.navigation.update();
    }, []);



    return (
        <>
            {fullscreen && (
                <div className="fullscreen" onClick={() => setFullscreen(false)}>
                    <img src={product.images[currentIndex]} className="fullscreen-img" />
                </div>
            )}

            <div className="product-page">
                <h1 className="product-title">{product.title}</h1>
                <p className="product-sub">{product.subtitle}</p>

                {/* ---------- СЛАЙДЕР ТОВАРА ---------- */}
                <div className="product-slider">
                    {/* кастомные стрелки */}
                    <button className="product-arrow-btn left" ref={prevRef}>
                        <FaArrowLeft />
                    </button>

                    <button className="product-arrow-btn right" ref={nextRef}>
                        <FaArrowRight />
                    </button>

                    <Swiper
                        modules={[Navigation, Pagination]}
                        slidesPerView={1}
                        loop
                        onSwiper={(swiper) => (swiperRef.current = swiper)}
                        onBeforeInit={(swiper) => {
                            swiper.params.navigation.prevEl = prevRef.current;
                            swiper.params.navigation.nextEl = nextRef.current;
                        }}
                        navigation
                        pagination={{ clickable: true }}
                        breakpoints={{
                            0: {
                                pagination: { enabled: true },
                            },
                            768: {
                                pagination: { enabled: false },
                            },
                        }}
                        className="product-swiper"
                    >
                        {product.images.map((img, index) => (
                            <SwiperSlide key={index}>
                                <img
                                    src={img}
                                    className="product-main-img"
                                    onClick={() => {
                                        setCurrentIndex(index);
                                        setFullscreen(true);
                                    }}
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    <button
                        className="add-cart-btn"
                        onClick={() => addToCart({ ...product, image: product.images[0] })}
                    >
                        Додати в кошик
                    </button>

                    <div className="price-box">{product.price} грн</div>
                </div>


                {/* ---------- ВКЛАДКИ ---------- */}
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

                {/* ---------- ОПИС ---------- */}
                <div className="product-description">
                    <p className="product-text">{getCurrentText()}</p>
                </div>




                <section className="similar-section">
                    <h2 className="similar-title">Схожі товари</h2>

                    <div className="similar-slider-wrap">
                        {/* КАСТОМНЫЕ СТРЕЛКИ */}
                        <button className="similar-arrow prev" ref={prevRef}>
                            <FaChevronLeft />
                        </button>

                        <button className="similar-arrow next" ref={nextRef}>
                            <FaChevronRight />
                        </button>

                        <Swiper
                            modules={[Navigation, Pagination]}
                            spaceBetween={24}
                            slidesPerView={3}
                            onBeforeInit={(swiper) => {
                                swiper.params.navigation.prevEl = prevRef.current;
                                swiper.params.navigation.nextEl = nextRef.current;
                            }}
                            navigation
                            pagination={{ clickable: true }}
                            breakpoints={{
                                0: {
                                    slidesPerView: 1,
                                },
                                640: {
                                    slidesPerView: 2,
                                },
                                1024: {
                                    slidesPerView: 3,
                                },
                            }}
                            className="similar-swiper"
                        >
                            {similarProducts.map((item) => (
                                <SwiperSlide key={item.id}>
                                    <ProductCard product={item} />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </section>


            </div>

            <Footer />
        </>
    );
};

export default ProductPage;
