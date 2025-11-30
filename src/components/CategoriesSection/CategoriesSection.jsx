import React, { useEffect, useRef } from "react";
import "./CategoriesSection.css";

import syrups from "../../assets/syrups.png";
import balms from "../../assets/balms.png";
import health from "../../assets/health.png";
import vitamins from "../../assets/vitamins.png";

const categories = [
    { id: 1, title: "Сиропи для дітей", img: syrups },
    { id: 2, title: "Бальзами", img: balms },
    { id: 3, title: "Для здоров’я", img: health },
    { id: 4, title: "Вітаміни", img: vitamins },
];

const CategoriesSection = () => {
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                    }
                });
            },
            { threshold: 0.3 }
        );

        const cards = sectionRef.current.querySelectorAll(".category-card");
        cards.forEach((card) => observer.observe(card));

        return () => observer.disconnect();
    }, []);

    return (
        <section className="categories" ref={sectionRef}>
            <div className="categories__container">
                {categories.map((item) => (
                    <div key={item.id} className="category-card fade-up">
                        <div className="category-card__image">
                            <img src={item.img} alt={item.title} />
                        </div>
                        <p className="category-card__title">{item.title}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default CategoriesSection;
