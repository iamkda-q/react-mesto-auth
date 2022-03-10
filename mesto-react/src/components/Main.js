import React from "react";
import change_profile from "../images/change_profile.svg";
import api from "../utils/api";
import Card from "./Card";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Main({ onEditAvatar, onEditProfile, onAddPlace, onCardClick, cards, onCardLike, onCardDelete}) {
    const currentUser = React.useContext(CurrentUserContext);

    return (
        <main className="main">
            <section className="profile">
                <img
                    src={currentUser.avatar}
                    alt="аватар пользователя"
                    className="profile__avatar"
                    onClick={onEditAvatar}
                />
                <img
                    src={change_profile}
                    alt="!"
                    className="profile__change-avatar"
                />
                <div className="profile__info">
                    <h1 className="profile__name">{currentUser.name}</h1>
                    <button
                        type="button"
                        className="profile__edit-profile-button page__hover page__hover_shade_dark"
                        aria-label
                        onClick={onEditProfile}
                    ></button>
                    <p className="profile__vocation">{currentUser.about}</p>
                </div>
                <button
                    type="button"
                    className="profile__edit-gallery-button page__hover page__hover_shade_dark"
                    onClick={onAddPlace}
                ></button>
            </section>

            <section className="gallery">
                <ul className="gallery__list">
                    {cards
                        ? cards.map((item) => (
                              <Card
                                  key={item._id}
                                  card={item}
                                  onCardClick={onCardClick}
                                  onCardLike={onCardLike}
                                  onCardDelete={onCardDelete}
                              />
                          ))
                        : null}
                </ul>
            </section>
        </main>
    );
}

export default Main;
