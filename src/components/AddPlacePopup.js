import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({isOpen, onClose, onAddPlace}) {

    const [figcaption, setFigcaption] = React.useState("");
    const [photoLink, setPhotoLink] = React.useState("");
    

    function handleChangeFigcaption(evt) {
        setFigcaption(evt.target.value);
    }

    function handleChangePhotoLink(evt) {
        setPhotoLink(evt.target.value);
    }

    React.useEffect(() => {
        setFigcaption("");
        setPhotoLink("");
    }, [isOpen]);

    function handleAddPlaceSubmit(evt) {
        evt.preventDefault();
        onAddPlace({
            link: photoLink,
            name: figcaption
        });
    }

    return (
        <PopupWithForm
        name="add-photo"
        title="Новое место"
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleAddPlaceSubmit}
        buttonText="Добавить"
    >
        <div className="popup__input-with-error">
            <input
                id="form-figcaption"
                type="text"
                className="popup__text popup__text_parameter_figcaption"
                name="name"
                placeholder="Название"
                minLength="2"
                maxLength="30"
                value={figcaption}
                onChange={handleChangeFigcaption}
                required
            />
            <span className="popup__error-text form-figcaption-error"></span>
        </div>
        <div className="popup__input-with-error">
            <input
                id="form-photo-link"
                type="url"
                className="popup__text popup__text_parameter_photo-link"
                name="link"
                placeholder="Ссылка на картинку"
                value={photoLink}
                onChange={handleChangePhotoLink}
                required
            />
            <span className="popup__error-text form-photo-link-error"></span>
        </div>
    </PopupWithForm>
    );
}

export default AddPlacePopup;