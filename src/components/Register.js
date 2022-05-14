import React from "react";
import { Link } from "react-router-dom";

function Register({ handleSubmitReg }) {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    const [optionText, buttonText, buttonTitle] = [
        "Регистрация",
        "Зарегистрироваться",
        "Уже зарегистрированы? Войти",
    ];

    React.useEffect(() => {
        setEmail("");
        setPassword("");
    }, []);

    function handleChangeEmail(evt) {
        setEmail(evt.target.value);
    }

    function handleChangePassword(evt) {
        setPassword(evt.target.value);
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        handleSubmitReg(email, password);
    }

    return (
        <main className="signing">
            <form onSubmit={handleSubmit}>
                <h2 className="signing__option">{optionText}</h2>
                <div className="signing__input-with-error">
                    <input
                        id="form-email"
                        type="email"
                        className="signing__text signing__text_parameter_email"
                        name="email"
                        placeholder="E-mail"
                        required
                        value={email}
                        onChange={handleChangeEmail}
                    />
                    <span className="signing__error-text form-email-error"></span>
                </div>
                <div className="signing__input-with-error">
                    <input
                        id="form-password"
                        type="password"
                        className="signing__text signing__text_parameter_password"
                        name="password"
                        placeholder="Пароль"
                        required
                        value={password}
                        onChange={handleChangePassword}
                    />
                    <span className="signing__error-text form-password-error"></span>
                </div>

                <button
                    type="submit"
                    className="signing__button page__hover page__hover_shade_light"
                >
                    {buttonText}
                </button>
            </form>
            <Link
                className="signing__button-title page__hover page__hover_shade_super-dark"
                to="/sign-in"
            >
                {buttonTitle}
            </Link>
        </main>
    );
}

export default Register;

