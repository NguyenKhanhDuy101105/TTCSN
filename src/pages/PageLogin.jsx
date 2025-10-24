import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import HeaderSub from "../components/HeaderSub"
import Footer from "../components/Footer"
import RegisterForm from '../components/Register/RegisterForm'
import LoginForm from '../components/Register/LoginForm'
const PageLogin = () => {
    const location = useLocation();
    const [isLogin, setIsLogin] = useState(true);


    useEffect(() => {
        if (location.state && typeof location.state.isLogin === 'boolean') {
            setIsLogin(location.state.isLogin);
        }
    }, [location.state]);

    return (
        <div>
            <HeaderSub />
            {isLogin ? <LoginForm setIsLogin={setIsLogin} /> : <RegisterForm setIsLogin={setIsLogin} />}
            <Footer />
        </div>
    )
}

export default PageLogin
