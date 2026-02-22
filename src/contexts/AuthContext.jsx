import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        token: localStorage.getItem('token'),
        user: JSON.parse(localStorage.getItem('user') || 'null')
    });

    const login = (token, user) => {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        setAuth({ token, user });
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setAuth({ token: null, user: null });
    };

    const value = {
        auth,
        login,
        logout,
        isAuthenticated: !!auth.token
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
