import { FaInstagram, FaTiktok, FaTelegramPlane, FaPhoneAlt } from "react-icons/fa";
import "./ContactsPage.css";
import contactsImg from "../../assets/contacts-nature.jpg";
import Footer from "../../components/Footer/Footer";

export default function ContactsPage() {
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
                            <a className="social-btn" href="#">
                                <span>Інстаграм</span>
                                <span className="icon-circle">
                                    <FaInstagram />
                                </span>
                            </a>

                            <a className="social-btn" href="#">
                                <span>Tik-tok</span>
                                <span className="icon-circle">
                                    <FaTiktok />
                                </span>
                            </a>
                        </div>

                        {/* Telegram */}
                        <div className="contacts-social-wrapper">
                            <a className="social-btn small" href="#">
                                <span>Телеграм канал <br /> про здоровʼя</span>
                                <span className="icon-circle">
                                    <FaTelegramPlane />
                                </span>
                            </a>

                            <a className="social-btn small" href="#">
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
