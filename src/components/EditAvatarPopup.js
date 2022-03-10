import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar}) {

    const currentAvatar = React.useRef();

    React.useEffect(() => {
        currentAvatar.current.value = "";
    }, [isOpen]);

    function handleSubmit(e) {
        e.preventDefault();
      
        onUpdateAvatar({
          avatar: currentAvatar.current.value,
        });
      } 

    return (
        <PopupWithForm
            name="avatar"
            title="Обновить аватар"
            isOpen={isOpen}
            onClose={onClose}
            buttonText="Обновить"
            onSubmit={handleSubmit}
        >
            <div className="popup__input-with-error">
                <input
                    id="form-avatar"
                    type="url"
                    className="popup__text popup__text_parameter_avatar"
                    name="avatar"
                    placeholder="Ссылка на аватар"
                    required
                    ref={currentAvatar}
                />
                <span className="popup__error-text form-avatar-error"></span>
            </div>
        </PopupWithForm>
    );
}

export default EditAvatarPopup;
