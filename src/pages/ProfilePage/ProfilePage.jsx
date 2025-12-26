import { useContext, useState } from "react";
import AuthContext from "../../context/AuthContext";
import ReCAPTCHA from "react-google-recaptcha";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Footer from "../../components/Footer/Footer"; // ⬅️ футер
import "./ProfilePage.css";

const RECAPTCHA_SITE_KEY = "6Lfx_TYsAAAAAKKZR16bUgUvM8lm6z2LDdvvRPob";

export default function ProfilePage() {
    const { user, updateUser } = useContext(AuthContext);

    const [editMode, setEditMode] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [captchaToken, setCaptchaToken] = useState(null);

    const [formData, setFormData] = useState({
        name: user?.name || "",
        email: user?.email || "",
        password: ""
    });

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSave = () => {
        if (!captchaToken) {
            alert("Підтвердіть, що ви не робот");
            return;
        }

        updateUser({
            name: formData.name,
            email: formData.email,
            password: formData.password || undefined
        });

        setEditMode(false);
        setShowPassword(false);
        setCaptchaToken(null);
        setFormData(prev => ({ ...prev, password: "" }));
    };

    return (
        <>
            {/* ===== PAGE CONTENT ===== */}
            <div className="profile-page">
                <div className="profile-card">

                    <h1 className="profile-title">
                        {formData.name || "Профіль"}
                    </h1>

                    <div className="profile-badge">Дані</div>

                    <div className="profile-section">

                        <label>Імʼя</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            disabled={!editMode}
                        />

                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            disabled={!editMode}
                        />

                        <label>Пароль</label>
                        <div className="password-field">
                            <input
                                type={
                                    editMode
                                        ? showPassword ? "text" : "password"
                                        : "text"
                                }
                                name="password"
                                value={editMode ? formData.password : "••••••••"}
                                onChange={handleChange}
                                disabled={!editMode}
                                placeholder={editMode ? "Новий пароль" : ""}
                            />

                            {editMode && (
                                <button
                                    type="button"
                                    className="password-toggle"
                                    onClick={() => setShowPassword(p => !p)}
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            )}
                        </div>

                        {editMode && (
                            <div className="recaptcha-wrapper">
                                <ReCAPTCHA
                                    sitekey={RECAPTCHA_SITE_KEY}
                                    onChange={setCaptchaToken}
                                    onExpired={() => setCaptchaToken(null)}
                                />
                            </div>
                        )}
                    </div>

                    {!editMode ? (
                        <button
                            className="profile-edit-btn"
                            onClick={() => setEditMode(true)}
                        >
                            Редагувати дані
                        </button>
                    ) : (
                        <div className="profile-actions">
                            <button
                                className="profile-save-btn"
                                disabled={!captchaToken}
                                onClick={handleSave}
                            >
                                Зберегти
                            </button>

                            <button
                                className="profile-cancel-btn"
                                onClick={() => {
                                    setEditMode(false);
                                    setShowPassword(false);
                                    setCaptchaToken(null);
                                    setFormData({
                                        name: user.name,
                                        email: user.email,
                                        password: ""
                                    });
                                }}
                            >
                                Скасувати
                            </button>
                        </div>
                    )}
                </div>
            </div>


            <Footer />
        </>
    );
}
