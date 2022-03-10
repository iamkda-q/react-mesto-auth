function ImagePopup({ card, onClose }) {
    return (
        <div className={`popup popup_full-photo ${card && "popup_opened"}`}>
            <div className="popup__container popup__container_type_photo">
                <img
                    src={`${card ? card.link : "#"}`}
                    alt={`${card ? card.name : "#"}`}
                    className="popup__photo"
                />
                <p className="popup__figcaption">{`${card && card.name}`}</p>
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

export default ImagePopup;
