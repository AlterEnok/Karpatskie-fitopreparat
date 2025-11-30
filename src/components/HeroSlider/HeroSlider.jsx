import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-fade";

import "./HeroSlider.css";

import slide1 from "../../assets/slide1.png";
import slide2 from "../../assets/slide2.png";

const HeroSlider = () => {
    return (
        <section className="hero">
            <div className="hero__sliderWrap">
                <Swiper
                    modules={[Autoplay, EffectFade]}
                    loop={true}
                    speed={1800} // плавная смена слайдов
                    autoplay={{
                        delay: 4500,
                        disableOnInteraction: false,
                    }}
                    effect="fade"
                    fadeEffect={{ crossFade: true }}
                    onSlideChange={(swiper) => {
                        document.body.setAttribute("data-slide", swiper.realIndex);
                    }}
                    className="heroSwiper"
                >
                    <SwiperSlide>
                        <div
                            className="hero__bg"
                            style={{ backgroundImage: `url(${slide1})` }}
                        ></div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div
                            className="hero__bg"
                            style={{ backgroundImage: `url(${slide2})` }}
                        ></div>
                    </SwiperSlide>
                </Swiper>
            </div>

            <div className="hero__content">
                <h1 className="hero__title">Карпатські фітопрепарати</h1>
                <p className="hero__subtitle">Офіційний представник компанії Рослини Карпат</p>
            </div>

            <div className="hero__bottomText">
                Натуральна підтримка здоров’я.<br />
                Формули, яким довіряють.<br />
                Результати, які відчуваються.
            </div>

            <div className="hero__cta">
                <button className="hero__cta-btn">До Каталогу</button>
            </div>
        </section>
    );
};

export default HeroSlider;
