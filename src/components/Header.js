import logo from "../images/logo.svg";

function Header() {
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
        </header>
    );
}

export default Header;
