import AuthForm from "./AuthForm";

const Login = ({apiHandleSubmit}) => {
    return (
        <div className="auth">
            <p className="auth__title">Вход</p>
            <AuthForm
                name='login'
                apiHandleSubmit={apiHandleSubmit}
                />

        </div>
    )
}

export default Login;
