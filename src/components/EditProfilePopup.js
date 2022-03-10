import React from "react";
import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from "../contexts/CurrentUserContext";


function EditProfilePopup({isOpen, onClose, onUpdateUser, buttonText}) {

    const currentUser = React.useContext(CurrentUserContext);
    const [name, setName] = React.useState(currentUser.name);
    const [description, setDescription] = React.useState(currentUser.about);

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, isOpen])

    function handleChangeName(evt) {
        setName(evt.target.value);
    }

    function handleChangeDescription(evt) {
        setDescription(evt.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateUser({
            name,
            about: description,
          });
    }

    return (
        <PopupWithForm
            name="edit-profile"
            title="Редактировать профиль"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            buttonText={buttonText}
        >
            <div className="popup__input-with-error">
                <input
                    id="form-name"
                    type="text"
                    className="popup__text popup__text_parameter_name"
                    name="name"
                    placeholder="Ваше имя"
                    minLength="2"
                    maxLength="40"
                    required
                    value={name}
                    onChange={handleChangeName}
                />
                <span className="popup__error-text form-name-error"></span>
            </div>
            <div className="popup__input-with-error">
                <input
                    id="form-vocation"
                    type="text"
                    className="popup__text popup__text_parameter_vocation"
                    name="vocation"
                    placeholder="Род деятельности"
                    minLength="2"
                    maxLength="200"
                    required
                    value={description}
                    onChange={handleChangeDescription}
                />
                <span className="popup__error-text form-vocation-error"></span>
            </div>
        </PopupWithForm>
    );
}

export default EditProfilePopup;
