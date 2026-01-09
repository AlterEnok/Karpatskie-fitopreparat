import { useLocation, Link } from "react-router-dom";
import { FaTimesCircle } from "react-icons/fa";
import Footer from "../../components/Footer/Footer";
import "./FailurePage.css";
import usePageTitle from "../../hooks/usePageTitle";

export default function FailurePage() {
    const location = useLocation();
    const state = location.state;
    usePageTitle("Помилка оформлення замовлення");

    return (
        <>
            {!state ? (
                <div className="failure-page">
                    <div className="failure-box">
                        <h2>Сторінку не знайдено</h2>
                        <Link to="/" className="failure-btn primary">
                            На головну
                        </Link>
                    </div>
                </div>
            ) : (
                <div className="failure-page">
                    <div className="failure-box">
                        <div className="failure-icon">
                            <FaTimesCircle />
                        </div>

                        <h1>
                            {state.paymentMethod === "online"
                                ? "Оплата не пройшла"
                                : "Не вдалося оформити замовлення"}
                        </h1>

                        <p className="failure-subtitle">
                            {state.paymentMethod === "online"
                                ? "Сталася помилка під час обробки платежу"
                                : "Під час створення замовлення виникла помилка"}
                        </p>

                        <p className="failure-note">
                            {state.paymentMethod === "online"
                                ? "Гроші з вашої картки не були списані. Ви можете спробувати ще раз або обрати інший спосіб оплати."
                                : "Ваше замовлення не було створене. Будь ласка, перевірте дані та спробуйте ще раз."}
                        </p>

                        <div className="failure-actions">
                            <Link to="/checkout" className="failure-btn primary">
                                Спробувати ще раз
                            </Link>

                            <Link to="/" className="failure-btn secondary">
                                На головну
                            </Link>
                        </div>
                    </div>
                </div>
            )}

            <Footer />
        </>
    );
}
