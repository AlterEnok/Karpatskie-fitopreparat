import { Link } from "react-router-dom";
import "./Footer.css";
import logo from "../../assets/logo-footer.png";

const Footer = () => {
    return (
        <footer className="footer">


            <div className="footer__inner">

                <div className="footer__header">
                    <img src={logo} alt="logo" className="footer__logo" />
                    <h2 className="footer__title">Карпатські фітопрепарати</h2>
                </div>

                <div className="footer__content">
                    <div className="footer__column">
                        <h3>Графік роботи</h3>
                        <p>Відправка замовлень:<br />
                            Пн — Пт: 10:00–16:00<br />
                            Сб — Нд: вихідний</p>

                        <p>Підбір препаратів:<br />
                            Працюємо щодня, без вихідних<br />
                            з 09:00 до 21:00</p>
                    </div>

                    <div className="footer__column">
                        <h3>Правова інформація</h3>
                        <ul>
                            <li><Link to="/return-policy">Повернення та обмін</Link></li>
                            <li><Link to="/certificates">Сертифікати</Link></li>
                            <li><Link to="/privacy-policy">Політика конфіденційності</Link></li>
                            <li><Link to="/terms">Умови використання</Link></li>
                        </ul>
                    </div>

                    <div className="footer__column">
                        <h3>Навігація</h3>
                        <ul>
                            <li><Link to="/">Головна</Link></li>
                            <li><Link to="/catalog">Каталог</Link></li>
                            <li><Link to="/contacts">Контакти</Link></li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="footer__bottom">
                © Карпатські фітопрепарати. 2025. Усі права захищені.
                Розроблено студією <a href="https://www.novateamweb.com" target="_blank" rel="noreferrer">NovaTeam</a>.
            </div>
        </footer>
    );
};

export default Footer;
