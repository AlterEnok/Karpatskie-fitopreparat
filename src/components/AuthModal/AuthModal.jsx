import { useContext, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import "./AuthModal.css";
import AuthContext from "../../context/AuthContext";
import googleIcon from "../../assets/google.png";

export default function AuthModal() {
    const { isAuthOpen, setIsAuthOpen, login } = useContext(AuthContext);
    const [mode, setMode] = useState("login");

    // ===== REGISTER STATE =====
    const [regName, setRegName] = useState("");
    const [regPhone, setRegPhone] = useState("");
    const [regEmail, setRegEmail] = useState("");
    const [regPassword, setRegPassword] = useState("");

    // 🔒 блокируем скролл страницы
    useEffect(() => {
        if (isAuthOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }

        return () => {
            document.body.style.overflow = "";
        };
    }, [isAuthOpen]);

    if (!isAuthOpen) return null;

    const handleGoogleLogin = () => {
        login({
            name: "Google User",
            email: "googleuser@gmail.com",
            provider: "google",
        });
    };

    const handleRegister = () => {
        if (!regName.trim()) {
            alert("Введіть імʼя");
            return;
        }

        login({
            name: regName,
            phone: regPhone,
            email: regEmail,
            provider: "local",
        });

        setRegName("");
        setRegPhone("");
        setRegEmail("");
        setRegPassword("");
    };

    return createPortal(
        <div className="auth-overlay" onClick={() => setIsAuthOpen(false)}>
            <div className="auth-modal" onClick={(e) => e.stopPropagation()}>

                {/* ===== TABS ===== */}
                <div className="auth-tabs">
                    <button
                        className={`auth-tab ${mode === "login" ? "active" : ""}`}
                        onClick={() => setMode("login")}
                    >
                        Увійти
                    </button>
                    <button
                        className={`auth-tab ${mode === "register" ? "active" : ""}`}
                        onClick={() => setMode("register")}
                    >
                        Зареєструватися
                    </button>
                </div>

                {/* ===== LOGIN ===== */}
                {mode === "login" && (
                    <>
                        <input placeholder="Електронна пошта" />
                        <input type="password" placeholder="Пароль" />

                        <button
                            className="auth-primary"
                            onClick={() => login({ name: "User" })}
                        >
                            Увійти
                        </button>

                        <span className="auth-link" onClick={() => setMode("reset")}>
                            Забули пароль?
                        </span>

                        <div className="auth-divider"><span>або</span></div>

                        <button className="auth-google" onClick={handleGoogleLogin}>
                            <img src={googleIcon} alt="Google" />
                            Увійти через Google
                        </button>
                    </>
                )}

                {/* ===== RESET ===== */}
                {mode === "reset" && (
                    <>
                        <input placeholder="Електронна пошта" />
                        <button className="auth-primary">Відправити</button>
                        <span className="auth-link" onClick={() => setMode("login")}>
                            ← Назад до входу
                        </span>
                    </>
                )}

                {/* ===== REGISTER ===== */}
                {mode === "register" && (
                    <>
                        <input
                            placeholder="Імʼя *"
                            value={regName}
                            onChange={(e) => setRegName(e.target.value)}
                        />

                        <input
                            placeholder="Телефон (опц.)"
                            value={regPhone}
                            onChange={(e) => setRegPhone(e.target.value)}
                        />

                        <input
                            placeholder="Електронна пошта"
                            value={regEmail}
                            onChange={(e) => setRegEmail(e.target.value)}
                        />

                        <input
                            type="password"
                            placeholder="Пароль"
                            value={regPassword}
                            onChange={(e) => setRegPassword(e.target.value)}
                        />

                        <button className="auth-primary" onClick={handleRegister}>
                            Зареєструватися
                        </button>

                        <div className="auth-divider"><span>або</span></div>

                        <button className="auth-google" onClick={handleGoogleLogin}>
                            <img src={googleIcon} alt="Google" />
                            Реєстрація через Google
                        </button>
                    </>
                )}
            </div>
        </div>,
        document.body
    );
}
