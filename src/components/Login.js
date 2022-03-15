import React from "react";

function Login({ handleSubmitLog }) {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    const [optionText, buttonText] = ["Вход", "Войти"];

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
        handleSubmitLog(evt, email, password);
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
        </main>
    );
}

export default Login;
