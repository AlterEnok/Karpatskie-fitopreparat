// context/AuthContext.jsx
import { createContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem("user");
        return savedUser ? JSON.parse(savedUser) : null;
    });

    const [isAuthOpen, setIsAuthOpen] = useState(false);

    const login = (userData) => {
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
        setIsAuthOpen(false);
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
    };

    // 🔐 универсальный гард
    const requireAuth = (callback) => {
        if (!user) {
            setIsAuthOpen(true);
            return;
        }
        callback?.();
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                login,
                logout,
                isAuthOpen,
                setIsAuthOpen,
                requireAuth,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
