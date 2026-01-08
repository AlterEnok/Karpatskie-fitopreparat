import React, { useMemo, useState, useRef } from "react";
import "./Catalog.css";

import ProductCard from "../../components/ProductCard/ProductCard";
import Footer from "../../components/Footer/Footer";

import slide1 from "../../assets/catalog-bg.png";
import { products } from "../../data/products";

function Catalog() {
    const categories = [
        { id: 1, name: "Фіто препарати" },
        { id: 2, name: "Фіто комплекси" },
        { id: 3, name: "Фіто свічки" },
        { id: 4, name: "Фіто сиропи" },
        { id: 5, name: "Бальзами" },
        { id: 6, name: "Чаї" },
        { id: 7, name: "Настоянки" },
        { id: 8, name: "Краплі" },
        { id: 9, name: "Для імунітету" },
        { id: 10, name: "Для серця" },
        { id: 11, name: "Для печінки" },
        { id: 12, name: "Для нервів" },
    ];

    const [activeCat, setActiveCat] = useState(null);
    const [showAllCats, setShowAllCats] = useState(false);
    const [page, setPage] = useState(1);

    const perPage = 6;

    // 👉 ref на блок товаров
    const productsRef = useRef(null);

    const scrollToProducts = () => {
        productsRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    };

    // ===== ФИЛЬТРАЦИЯ =====
    const filteredProducts = useMemo(() => {
        return activeCat
            ? products.filter(p => p.categoryId === activeCat)
            : products;
    }, [activeCat]);

    // ===== ПАГИНАЦИЯ =====
    const totalPages = Math.ceil(filteredProducts.length / perPage);

    const paginatedProducts = filteredProducts.slice(
        (page - 1) * perPage,
        page * perPage
    );

    const goToPage = (num) => {
        setPage(num);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const nextPage = () => page < totalPages && goToPage(page + 1);
    const prevPage = () => page > 1 && goToPage(page - 1);

    return (
        <>
            <div className="catalog-page fade-page">

                {/* HERO */}
                <div className="catalog-hero">
                    <img src={slide1} className="catalog-hero-img" alt="Hero" />

                    <div className="catalog-hero-text">
                        <h2>
                            Досліджуйте нашу різноманітну<br />
                            колекцію товарів для здоровʼя
                        </h2>
                        <p>
                            Обирайте найкраще для свого здоров’я — ми подбаємо про решту!
                        </p>
                    </div>
                </div>

                <div className="catalog-layout">

                    {/* FILTER */}
                    <aside className="catalog-filter">
                        <h3>Категорії</h3>

                        <button
                            className={`filter-item ${activeCat === null ? "active" : ""}`}
                            onClick={() => {
                                setActiveCat(null);
                                setPage(1);
                                scrollToProducts();
                            }}
                        >
                            Усі <span>({products.length})</span>
                        </button>

                        {categories.slice(0, 3).map(cat => {
                            const count = products.filter(p => p.categoryId === cat.id).length;

                            return (
                                <button
                                    key={cat.id}
                                    className={`filter-item ${activeCat === cat.id ? "active" : ""}`}
                                    onClick={() => {
                                        setActiveCat(cat.id);
                                        setPage(1);
                                        scrollToProducts();
                                    }}
                                >
                                    {cat.name} <span>({count})</span>
                                </button>
                            );
                        })}

                        {!showAllCats && (
                            <button
                                className="filter-more"
                                onClick={() => setShowAllCats(true)}
                            >
                                Показати всі категорії
                                <span className="arrow" />
                            </button>
                        )}

                        {showAllCats && (
                            <div className="filter-all fade">
                                {categories.slice(3).map(cat => {
                                    const count = products.filter(
                                        p => p.categoryId === cat.id
                                    ).length;

                                    return (
                                        <button
                                            key={cat.id}
                                            className={`filter-item ${activeCat === cat.id ? "active" : ""}`}
                                            onClick={() => {
                                                setActiveCat(cat.id);
                                                setPage(1);
                                                scrollToProducts();
                                            }}
                                        >
                                            {cat.name} <span>({count})</span>
                                        </button>
                                    );
                                })}

                                <button
                                    className="filter-more"
                                    onClick={() => setShowAllCats(false)}
                                >
                                    ▲ Згорнути
                                </button>
                            </div>
                        )}
                    </aside>

                    {/* PRODUCTS */}
                    <div ref={productsRef} className="catalog-products fade">
                        {paginatedProducts.length ? (
                            paginatedProducts.map(product => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                />
                            ))
                        ) : (
                            <p className="empty">
                                Товарів у цій категорії поки немає
                            </p>
                        )}
                    </div>
                </div>

                {/* PAGINATION */}
                {totalPages > 1 && (
                    <div className="pagination">
                        <button onClick={prevPage} disabled={page === 1}>←</button>

                        {Array.from({ length: totalPages }).map((_, i) => (
                            <button
                                key={i}
                                className={page === i + 1 ? "active" : ""}
                                onClick={() => goToPage(i + 1)}
                            >
                                {i + 1}
                            </button>
                        ))}

                        <button onClick={nextPage} disabled={page === totalPages}>→</button>
                    </div>
                )}
            </div>

            <Footer />
        </>
    );
}

export default Catalog;
