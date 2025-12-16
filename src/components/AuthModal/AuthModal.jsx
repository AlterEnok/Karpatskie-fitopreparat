import { useContext, useState } from "react";
import "./AuthModal.css";
import AuthContext from "../../context/AuthContext";

export default function AuthModal() {
    const { isAuthOpen, setIsAuthOpen, login } = useContext(AuthContext);
    const [mode, setMode] = useState("login"); // login | register | reset

    if (!isAuthOpen) return null;

    return (
        <div className="auth-overlay" onClick={() => setIsAuthOpen(false)}>
            <div className="auth-modal" onClick={e => e.stopPropagation()}>

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


                {mode === "login" && (
                    <>
                        <input placeholder="Електронна пошта" />
                        <input type="password" placeholder="Пароль" />
                        <button onClick={() => login({ name: "User" })}>Увійти</button>
                        <span onClick={() => setMode("reset")}>Забули пароль?</span>
                    </>
                )}

                {mode === "reset" && (
                    <>
                        <input placeholder="Електронна пошта" />
                        <button>Відправити</button>
                        <span onClick={() => setMode("login")}>← Назад до входу</span>
                    </>
                )}

                {mode === "register" && (
                    <>
                        <input placeholder="Імʼя *" />
                        <input placeholder="Телефон (опц.)" />
                        <input placeholder="Електронна пошта" />
                        <input type="password" placeholder="Пароль" />
                        <button>Зареєструватися</button>
                    </>
                )}

            </div>
        </div>
    );
}
