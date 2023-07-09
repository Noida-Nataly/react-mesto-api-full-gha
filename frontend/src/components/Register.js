import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import AuthForm from "./AuthForm";

const Register = ({apiHandleSubmit}) => {

    return (
        <div className="auth">
            <p className="auth__title">Регистрация</p>
            <AuthForm
                name = 'register'
                apiHandleSubmit = {apiHandleSubmit}
            />
            <span className="auth__span">Уже зарегистрированы?
                <Link className="auth__link button" to={'/sign-in'}>Войти</Link>
            </span>
        </div>
    )

}

export default Register;