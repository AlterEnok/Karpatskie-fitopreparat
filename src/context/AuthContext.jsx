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


    const requireAuth = (callback) => {
        if (!user) {
            setIsAuthOpen(true);
            return;
        }
        callback?.();
    };

    //  ОБНОВЛЕНИЕ ДАННЫХ ПРОФИЛЯ
    const updateUser = (updatedData) => {
        setUser((prev) => {
            if (!prev) return prev;

            const newUser = {
                ...prev,
                ...updatedData,
            };

            localStorage.setItem("user", JSON.stringify(newUser));
            return newUser;
        });
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
                updateUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
