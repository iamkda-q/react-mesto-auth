import React from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete}) {
    const currentUser = React.useContext(CurrentUserContext);
    const isOwn = card.owner._id === currentUser._id;
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    function renderTrashButton() {
        return (
            <button
            type="button"
            className="gallery__trash page__hover page__hover_shade_super-dark"
            aria-label
            onClick={handleDeleteClick}
        ></button>
        )
    }

    const cardLikeClassName  = (
        `gallery__like page__hover page__hover_shade_super-dark ${isLiked ? 'gallery__like_active' : ''}`
      ); 

    function handleClick() {
        onCardClick(card);
    }

    function handleLikeClick() {
        onCardLike(card);
    }

    function handleDeleteClick() {
        onCardDelete(card);
    }

    return (
        <li className="gallery__element">
            <div className="gallery__photo-wrapper">
                <img
                    src={card.link}
                    alt={card.name}
                    className="gallery__photo"
                    onClick={handleClick}
                />
            </div>
            <h2 className="gallery__figcaption">{card.name}</h2>
            <div className="gallery__like-container">
                <button
                    type="button"
                    className={cardLikeClassName}
                    aria-label
                    onClick={handleLikeClick}
                ></button>
                <p className="gallery__like-count">{card.likes.length}</p>
            </div>
            {isOwn ? renderTrashButton() : null}
        </li>
    );
}

export default Card;
