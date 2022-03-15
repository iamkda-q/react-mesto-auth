import { Link, Route, Switch } from "react-router-dom";
import logo from "../images/logo.svg";

function Header({ handleLogOut = null, email }) {
    return (
        <header className="header">
            <Link
                to="/"
                className="header__link page__hover page__hover_shade_super-dark"
            >
                <img
                    src={logo}
                    alt="Логотип приложения Место"
                    className="logo header__logo"
                />
            </Link>

            {email && <p>{email}</p>}
            
            <Route path="/sign-in">
                <Link
                    to="/sign-up"
                    className="header__button page__hover page__hover_shade_super-dark"
                    onClick={handleLogOut}
                >
                    Регистрация
                </Link>
            </Route>

            <Route path="/sign-up">
                <Link
                    to="/sign-in"
                    className="header__button page__hover page__hover_shade_super-dark"
                    onClick={handleLogOut}
                >
                    Войти
                </Link>
            </Route>

            <Route exact path="/">
                <Link
                    to="/sign-in"
                    className="header__button page__hover page__hover_shade_super-dark"
                    onClick={handleLogOut}
                >
                    Выйти
                </Link>
            </Route>
        </header>
    );
}

export default Header;
