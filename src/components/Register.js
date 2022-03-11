import React from "react";

function Register() {
    return (
        <main className="signing">
            <form>
                <h2 className="signing__option">Регистрация</h2>
                    <div className="signing__input-with-error">
                        <input
                            id="form-email"
                            type="url"
                            className="signing__text signing__text_parameter_email"
                            name="email"
                            placeholder="E-mail"
                            required
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
                        />
                        <span className="signing__error-text form-password-error"></span>
                    </div>

                    <button
                        type="submit"
                        className="signing__button page__hover page__hover_shade_light"
                    >
                        Зарегистрироваться
                    </button>
            </form>
            <p className="signing__button-title page__hover page__hover_shade_super-dark">Уже зарегистрированы? Войти</p>
        </main>
    );
}

export default Register;
