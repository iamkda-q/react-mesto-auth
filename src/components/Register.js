import React from "react";
import { Link } from "react-router-dom";

function Register({ optionText, buttonText, buttonTitle, link}) {
    return (
        <main className="signing">
            <form>
                <h2 className="signing__option">{optionText}</h2>
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
                    {buttonText}
                </button>
            </form>
            <Link className="signing__button-title page__hover page__hover_shade_super-dark" to={link}>
                {buttonTitle}
            </Link>
        </main>
    );
}

export default Register;
