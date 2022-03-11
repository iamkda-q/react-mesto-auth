import logo from "../images/logo.svg";

function Header({buttonText}) {
    return (
        <header className="header">
            <a
                href="#"
                className="header__link page__hover page__hover_shade_super-dark"
            >
                <img
                    src={logo}
                    alt="Логотип приложения Место"
                    className="logo header__logo"
                />
            </a>
            <button className="header__button page__hover page__hover_shade_super-dark">{buttonText}</button>
        </header>
    );
}

export default Header;
