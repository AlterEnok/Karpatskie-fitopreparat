// context/AuthContext.jsx
import { createContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthOpen, setIsAuthOpen] = useState(false);

    const login = (userData) => {
        setUser(userData);
        setIsAuthOpen(false);
    };

    const logout = () => setUser(null);

    return (
        <AuthContext.Provider value={{
            user,
            login,
            logout,
            isAuthOpen,
            setIsAuthOpen
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
