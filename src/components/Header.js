import { Link } from "react-router-dom";
import logo from "../images/logo.svg";

function Header({ linkText, link }) {
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
            <Link
                to={link}
                className="header__button page__hover page__hover_shade_super-dark"
            >
                {linkText}
            </Link>
        </header>
    );
}

export default Header;
