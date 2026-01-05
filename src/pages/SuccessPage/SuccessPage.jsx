import { useLocation, Link } from "react-router-dom";
import { FaCheck } from "react-icons/fa";
import Footer from "../../components/Footer/Footer";
import "./SuccessPage.css";

export default function SuccessPage() {
    const location = useLocation();
    const state = location.state;

    return (
        <>
            {!state ? (
                <div className="success-page">
                    <div className="success-box">
                        <h2>Замовлення не знайдено</h2>
                        <Link to="/" className="success-btn">
                            На головну
                        </Link>
                    </div>
                </div>
            ) : (
                <div className="success-page">
                    <div className="success-box">
                        <div className="success-icon">
                            <FaCheck />
                        </div>

                        <h1>Дякуємо за замовлення</h1>

                        <p className="success-subtitle">
                            Ми вже прийняли ваше замовлення та почали його обробку
                        </p>

                        <div className="success-details">
                            <div>
                                <span>Доставка</span>
                                <b>
                                    {state.deliveryService === "nova"
                                        ? "Нова Пошта"
                                        : "Укрпошта"}
                                </b>
                            </div>

                            <div>
                                <span>Місто</span>
                                <b>{state.city}</b>
                            </div>

                            <div>
                                <span>Оплата</span>
                                <b>
                                    {state.paymentMethod === "online"
                                        ? "Онлайн-оплата"
                                        : "Накладений платіж"}
                                </b>
                            </div>
                        </div>

                        <p className="success-note">
                            {state.paymentMethod === "online"
                                ? "Оплата пройшла успішно. Очікуйте повідомлення з деталями доставки."
                                : "Оплата здійснюється при отриманні замовлення."}
                        </p>

                        <Link to="/" className="success-btn">
                            Повернутись на головну
                        </Link>
                    </div>
                </div>
            )}

            <Footer />
        </>
    );
}
