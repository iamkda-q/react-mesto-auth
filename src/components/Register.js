import React from "react";
import { Link, useHistory } from "react-router-dom";
import apiAuth from "../utils/apiAuth";

function Register({
    optionText,
    buttonText,
    buttonTitle,
    link,
    handleLogin,
    handleRegPopup,
}) {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const history = useHistory();

    React.useEffect(() => {
        setEmail("");
        setPassword("");
    }, [link]);

    function handleChangeEmail(evt) {
        setEmail(evt.target.value);
    }

    function handleChangePassword(evt) {
        setPassword(evt.target.value);
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        if (link == "/sign-in") {
            apiAuth
                .signIn(password, email)
                .then((data) => {
                    if (data.token) {
                        localStorage.setItem("usersToken", data.token);
                        handleLogin();
                        history.push("/");
                    } else {
                        return data;
                    }
                })
                .catch((err) => {
                    console.log("Отсюда")
                    handleRegPopup(); //разобраться, как сделать json внутри catch и работать с объектом ошибки, чтобы достать оттуда текст и вставить в попап
                })
        } else if (link == "/sign-up") {
            apiAuth
                .signUp(password, email)
                .then((res) => {
                    handleRegPopup("Вы успешно зарегистрировались!", true);
                    history.push("/sign-in");
                })
                .catch((err) => {
                    console.log(err)
                    handleRegPopup(); //don't work
                })

        }
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
