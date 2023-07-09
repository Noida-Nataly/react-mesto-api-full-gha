import React from "react";
import logo from '../images/logo.svg';
import {Link, useLocation} from "react-router-dom";


export default function Header({loggedIn, email, handleLogout}) {
    const location = useLocation();

    return (
        <header className="header container">
            <img className="header__logo"
                 src={logo}
                 alt="Логотип социальной сети Место" />
            {loggedIn ?
                <div className="header__wrapper">
                    <span className="header__text header__email">{email}</span>
                    <button
                        className="header__text header__button button"
                        onClick = {handleLogout}
                    >Выйти</button>
                </div> :
                (location.pathname === '/sign-in' ?
                    (<Link className="header__text header__link button" to='/sign-up'>Регистрация</Link>) :
                    (<Link className="header__text header__link button" to='/sign-in'>Войти</Link>)
                )
            }
        </header>
    );
}