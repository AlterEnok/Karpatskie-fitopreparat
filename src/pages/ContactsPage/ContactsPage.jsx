import { FaInstagram, FaTiktok, FaTelegramPlane, FaPhoneAlt } from "react-icons/fa";
import "./ContactsPage.css";
import contactsImg from "../../assets/contacts-nature.jpg";
import Footer from "../../components/Footer/Footer";
import usePageTitle from "../../hooks/usePageTitle";
export default function ContactsPage() {
    usePageTitle("Контакти");

    return (
        <>
            <div className="contacts-page">
                <div className="contacts-container">

                    {/* LEFT */}
                    <div className="contacts-left">
                        <h1 className="contacts-title">Зв'яжіться з нами</h1>

                        <p className="contacts-text">
                            Я завжди відкрита до ваших запитань та допоможу підібрати потрібні
                            фітопрепарати. Зв’яжіться зі мною будь-яким зручним способом —
                            я поруч, щоб підтримати вас на шляху до природного відновлення.
                        </p>

                        {/* Instagram / TikTok */}
                        <div className="contacts-social-wrapper">
                            <a
                                className="social-btn"
                                href="https://www.instagram.com/olena.drabyk?igsh=MWE1bTgwNnJjZ21qbg%3D%3D&utm_source=qr"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <span>Інстаграм</span>
                                <span className="icon-circle">
                                    <FaInstagram />
                                </span>
                            </a>

                            <a
                                className="social-btn"
                                href="https://www.tiktok.com/@olena_drabyk?_r=1&_t=ZM-92f0GctEd4t"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <span>TikTok</span>
                                <span className="icon-circle">
                                    <FaTiktok />
                                </span>
                            </a>
                        </div>

                        {/* Telegram */}
                        <div className="contacts-social-wrapper">
                            <a
                                className="social-btn small"
                                href="https://t.me/+Ajg7wJYDYw01ZjZi"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <span>
                                    Телеграм канал <br /> про здоровʼя
                                </span>
                                <span className="icon-circle">
                                    <FaTelegramPlane />
                                </span>
                            </a>

                            <a
                                className="social-btn small"
                                href="https://t.me/Olena_Drabyk"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <span>@Olena_Drabyk</span>
                                <span className="icon-circle">
                                    <FaTelegramPlane />
                                </span>
                            </a>
                        </div>
                    </div>

                    {/* RIGHT */}
                    <div className="contacts-right">
                        <div>
                            <p className="contacts-label">
                                Контакти:
                                <span>(Viber, WhatsApp, Telegram)</span>
                            </p>

                            <div className="contacts-phone">
                                <FaPhoneAlt />
                                +380680548598
                            </div>
                        </div>

                        <div className="contacts-image">
                            <img src={contactsImg} alt="Nature" />
                        </div>
                    </div>

                </div>
            </div>

            {/* FOOTER */}
            <Footer />
        </>
    );
}
