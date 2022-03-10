function PopupWithForm({ name, isOpen, title, buttonText, onClose, children, onSubmit}) {

    return (
        <div className={`popup popup_${name} ${isOpen ? "popup_opened" : ""}`}>
            <div className="popup__container popup__container_type_form">
                <form
                    className="popup__form"
                    name={`popup-form-${name}`}
                    noValidate
                    onSubmit={onSubmit}
                >
                    <h2 className="popup__option">{title}</h2>
                    <fieldset className="popup__info page__fieldset">
                        {children}
                        <button
                            type="submit"
                            className="popup__save-button page__hover page__hover_shade_light"
                        >
                            {buttonText}
                        </button>
                    </fieldset>
                </form>
                <button
                    type="button"
                    className="popup__close-button page__hover page__hover_shade_dark"
                    aria-label
                    onClick={onClose}
                ></button>
            </div>
        </div>
    );
}

export default PopupWithForm;
