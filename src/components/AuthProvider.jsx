import React, { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
const AuthProvider = ({ children }) => {
    const [isLogin, setIsLogin] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        const userData = localStorage.getItem("user");
        if (token && userData) {
            setIsLogin(true);
            setUser(JSON.parse(userData));
        }
    }, []);

    return (
        <AuthContext.Provider value={{ isLogin, setIsLogin, user, setUser }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider
