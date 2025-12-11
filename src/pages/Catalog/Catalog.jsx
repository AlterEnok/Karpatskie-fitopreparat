import React, { useState } from "react";
import "./Catalog.css";
import ProductCard from "../../components/ProductCard/ProductCard";
import Footer from "../../components/Footer/Footer";

import productImg from "../../assets/product1.png";
import slide1 from "../../assets/catalog-bg.png";

function Catalog() {

    const categories = [
        { id: 1, name: "Фіто препарати", count: 5 },
        { id: 2, name: "Фіто комплекси ", count: 3 },
        { id: 3, name: "Фіто свічки ", count: 1 },
        { id: 4, name: "Фіто сиропи ", count: 4 },
        { id: 5, name: "Бальзами", count: 2 },
        { id: 6, name: "Чаї", count: 7 },
        { id: 7, name: "Настоянки", count: 6 },
        { id: 8, name: "Краплі", count: 2 },
        { id: 9, name: "Для імунітету", count: 3 },
        { id: 10, name: "Для серця", count: 1 },
        { id: 11, name: "Для печінки", count: 1 },
        { id: 12, name: "Для нервів", count: 2 },
    ];

    const [showAllCats, setShowAllCats] = useState(false);
    const [activeCat, setActiveCat] = useState(null);

    const products = Array.from({ length: 27 }).map((_, i) => ({
        id: i + 1,
        title: "Фіто Чай Energy",
        subtitle: "Підвищення тонусу",
        price: 1190,
        image: productImg,
        categoryId: (i % 6) + 1,
    }));

    const filtered = activeCat
        ? products.filter((p) => p.categoryId === activeCat)
        : products;

    const perPage = 6;
    const [page, setPage] = useState(1);
    const totalPages = Math.ceil(filtered.length / perPage);
    const paginated = filtered.slice((page - 1) * perPage, page * perPage);

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
                        <h2>Досліджуйте нашу різноманітну<br /> колекцію товарів для здоров’я</h2>
                        <p>Обирайте найкраще для свого здоров’я — ми подбаємо про решту!</p>
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
                            }}
                        >
                            Усі <span>({products.length})</span>
                        </button>

                        {categories.slice(0, 3).map((c) => (
                            <button
                                key={c.id}
                                className={`filter-item ${activeCat === c.id ? "active" : ""}`}
                                onClick={() => {
                                    setActiveCat(c.id);
                                    setPage(1);
                                }}
                            >
                                {c.name} <span>({c.count})</span>
                            </button>
                        ))}

                        {!showAllCats && (
                            <button className="filter-more" onClick={() => setShowAllCats(true)}>
                                ▶ Показати всі категорії
                            </button>
                        )}

                        {showAllCats && (
                            <div className="filter-all fade">
                                {categories.slice(3).map((c) => (
                                    <button
                                        key={c.id}
                                        className={`filter-item ${activeCat === c.id ? "active" : ""}`}
                                        onClick={() => {
                                            setActiveCat(c.id);
                                            setPage(1);
                                        }}
                                    >
                                        {c.name} <span>({c.count})</span>
                                    </button>
                                ))}

                                <button className="filter-more" onClick={() => setShowAllCats(false)}>
                                    ▲ Згорнути
                                </button>
                            </div>
                        )}
                    </aside>

                    {/* PRODUCTS */}
                    <div className="catalog-products fade">
                        {paginated.map((p) => (
                            <ProductCard key={p.id} product={p} />
                        ))}
                    </div>

                </div>

                {/* PAGINATION */}
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
            </div>

            {/* FOOTER — ВСЕГДА ВНИЗУ */}
            <Footer />
        </>
    );
}

export default Catalog;
