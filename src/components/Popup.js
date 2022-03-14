import successLogo from "../images/success.svg";
import failLogo from "../images/fail.svg";

function Popup({success, isOpen, optionText, closePopup}) {
    return (
        <div className={`popup ${isOpen && "popup_opened"}`}>
            <div className="popup__container popup__container_type_reg">
                <img src={success ? successLogo : failLogo} alt="Подтверждение регистрации" className="popup__picture"/>
                <p className="popup__option popup__option_reg">{optionText ? optionText : "Что-то пошло не так! Попробуйте ещё раз."}</p>
                <button
                    type="button"
                    className="popup__close-button page__hover page__hover_shade_dark"
                    aria-label
                    onClick={closePopup}
                ></button>
            </div>
        </div>
    );
}

export default Popup;
