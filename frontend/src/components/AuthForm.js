import React from "react";

export default function AuthForm ({name, apiHandleSubmit}) {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    function handleSubmit(evt) {
        evt.preventDefault();
        const data = {email: email, password: password};
        apiHandleSubmit(data);
    }

    function handleChangeEmail (evt) {
        setEmail(evt.target.value)
    }

    function handleChangePassword (evt) {
        setPassword(evt.target.value)
    }

    return (
        <form className="auth-form" onSubmit={handleSubmit}>
            <input className="auth-form__input auth-form__input_email"
                   id="email"
                   name="email"
                   type="email"
                   placeholder="Email"
                   minLength='5'
                   maxLength='200'
                   required
                   value={email ?? ''}
                   onChange={handleChangeEmail}
                   autoComplete='on'
            />
            <input className="auth-form__input"
                   id="password"
                   name="password"
                   type="password"
                   placeholder="Пароль"
                   minLength='8'
                   maxLength='20'
                   required
                   value={password ?? ''}
                   onChange={handleChangePassword}
                   autoComplete='on'
            />
            <button id="auth-form__button button"
                    type="submit"
                    className="auth-form__button">
                    {name === 'register' ? 'Зарегистрироваться' : name === 'login' ? 'Войти' : ''}
            </button>
        </form>

    )
}