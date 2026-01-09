import { useState } from "react";
import "./AboutSection.css";
import { FaArrowRight } from "react-icons/fa";

import woman1 from "../../assets/woman1.jpg";
import woman2 from "../../assets/woman2.jpg";

import company1 from "../../assets/company1.jpg";
import company2 from "../../assets/company2.jpg";

const AboutSection = () => {
    const [step, setStep] = useState(0);


    const [fade, setFade] = useState(true);

    const data = [
        {
            images: [woman1, woman2],
            title: "Мене звати Олена Драбик.",
            text: [
                "Я офіційний представник компанії «Рослина Карпат» і консультант із природного відновлення здоров'я.",
                "У своїй роботі я використовую цілісний підхід — дивлюся не лише на тіло, а й на емоційний стан людини.Часто саме емоції та стрес впливають на наше самопочуття.",
                "Допомагаю підібрати натуральні фітопродукти, які підтримують організм природним шляхом — зсередини та зовні.",
            ],
        },
        {
            images: [company1, company2],
            title: "Про компанію «Рослина Карпат».",
            text: [
                "Наш бренд створений у Карпатах та заснований на принципах натуральності.",
                "Ми виготовляємо продукцію на основі дикорослих трав та екологічно чистих інгредієнтів.",
                "Місія — допомогти людям піклуватися про себе природним шляхом.",
            ],
        },
    ];


    const handleNext = () => {
        setFade(false);

        setTimeout(() => {
            setStep((prev) => (prev === 0 ? 1 : 0));
            setFade(true);
        }, 600);
    };

    return (
        <section className="about-section">
            <div className="left-column">
                <img
                    className={`big-img fade ${fade ? "fade-in" : "fade-out"}`}
                    src={data[step].images[0]}
                    alt=""
                />

                <div className={`content-block fade ${fade ? "fade-in" : "fade-out"}`}>
                    <h3>{data[step].title}</h3>

                    {data[step].text.map((p, i) => (
                        <p key={i}>{p}</p>
                    ))}

                    <button className="arrow-btn about" onClick={handleNext}>
                        <FaArrowRight />
                    </button>
                </div>

                <a href="https://t.me/+Ajg7wJYDYw01ZjZi" className="main-btn-link">
                    Консультація
                </a>
            </div>

            <div className="right-column">
                <img
                    className={`side-img fade ${fade ? "fade-in" : "fade-out"}`}
                    src={data[step].images[1]}
                    alt=""
                />
            </div>
        </section>
    );
};

export default AboutSection;
