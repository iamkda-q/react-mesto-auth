import { Link } from "react-router-dom";
import logo from "../images/logo.svg";

function Header({ linkText, link, handleLogOut=null, email }) {
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
            <Link
                to={link}
                className="header__button page__hover page__hover_shade_super-dark"
                onClick={handleLogOut}
            >
                {linkText}
            </Link>
        </header>
    );
}

export default Header;
