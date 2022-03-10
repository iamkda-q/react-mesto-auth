import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import api from "../utils/api";
import CurrentUserContext from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";

function App() {
    const [isEditProfilePopupOpen, setProfileOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setPlaceOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setAvatarOpen] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState(null);
    const [cards, setCards] = React.useState([]);

    const [currentUser, setCurrentUser] = React.useState({
        name: "Loading...",
        about: "Loading...",
    });

    React.useEffect(() => {
        api.getInitialUserInfo()
            .then((res) => {
                setCurrentUser(res);
            })
            .catch((res) => {
                console.log(
                    `${api.errorHandler(res.status)} Номер ошибки - ${
                        res.status ? res.status : "неизвестен"
                    }. Всего хорошего!`
                );
            });
    }, []);

    function handleUpdateUser(userInfo) {
        api.setUserInfo(userInfo)
            .then(() => {
                setCurrentUser({ ...currentUser, ...userInfo });
                closeAllPopups();
            })
            .catch((res) => {
                console.log(
                    `${api.errorHandler(res.status)} Номер ошибки - ${
                        res.status ? res.status : "неизвестен"
                    }. Всего хорошего!`
                );
            });
    }

    function handleUpdateAvatar(avatar) {
        api.updateAvatar(avatar)
            .then(() => {
                setCurrentUser({ ...currentUser, ...avatar });
                closeAllPopups();
            })
            .catch((res) => {
                console.log(
                    `${api.errorHandler(res.status)} Номер ошибки - ${
                        res.status ? res.status : "неизвестен"
                    }. Всего хорошего!`
                );
            });
    }

    function handleAddPlace(card) {
        api.setNewCard(card)
            .then((newCard) => {
                setCards([newCard, ...cards]);
                closeAllPopups();
            })
            .catch((res) => {
                console.log(
                    `${api.errorHandler(res.status)} Номер ошибки - ${
                        res.status ? res.status : "неизвестен"
                    }. Всего хорошего!`
                );
            });
    }

    React.useEffect(() => {
        api.getInitialCards()
            .then((res) => {
                setCards(res);
            })
            .catch((res) => {
                console.log(
                    `${api.errorHandler(res.status)} Номер ошибки - ${
                        res.status ? res.status : "неизвестен"
                    }. Всего хорошего!`
                );
            });
    }, []);

    function handleCardLike(card) {
        const isLiked = card.likes.some((like) => like._id === currentUser._id);
        api.changeLike(card._id, isLiked)
            .then((newCard) => {
                setCards(
                    cards.map((item) => {
                        if (newCard._id === item._id) {
                            return newCard;
                        }
                        return item;
                    })
                );
            })
            .catch((res) => {
                console.log(
                    `${api.errorHandler(res.status)} Номер ошибки - ${
                        res.status ? res.status : "неизвестен"
                    }. Всего хорошего!`
                );
            });
    }

    function handleCardDelete(card) {
        api.deleteCard(card._id)
            .then(() => {
                setCards(cards.filter((item) => item._id !== card._id));
            })
            .catch((res) => {
                console.log(
                    `${api.errorHandler(res.status)} Номер ошибки - ${
                        res.status ? res.status : "неизвестен"
                    }. Всего хорошего!`
                );
            });
    }

    function handleEditProfileClick() {
        setProfileOpen(!isEditProfilePopupOpen);
    }

    function handleAddPlaceClick() {
        setPlaceOpen(!isAddPlacePopupOpen);
    }

    function handleEditAvatarClick() {
        setAvatarOpen(!isEditAvatarPopupOpen);
    }

    function handleCardClick(card) {
        setSelectedCard(card);
    }

    /* Не понял зачем по заданию реализовывать новый обработчик, если можно в props onClose каждого попапа записать соответствующую функцию handle____
и попап также будет закрываться */
    function closeAllPopups() {
        setProfileOpen(false);
        setPlaceOpen(false);
        setAvatarOpen(false);
        setSelectedCard(null);
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="page">
                <Header />
                <Main
                    onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddPlaceClick}
                    onEditAvatar={handleEditAvatarClick}
                    onCardClick={handleCardClick}
                    cards={cards}
                    onCardLike={handleCardLike}
                    onCardDelete={handleCardDelete}
                />
                <Footer />

                <EditProfilePopup
                    isOpen={isEditProfilePopupOpen}
                    onClose={closeAllPopups}
                    onUpdateUser={handleUpdateUser}
                />

                <EditAvatarPopup
                    isOpen={isEditAvatarPopupOpen}
                    onClose={closeAllPopups}
                    onUpdateAvatar={handleUpdateAvatar}
                />

                <AddPlacePopup
                    isOpen={isAddPlacePopupOpen}
                    onClose={closeAllPopups}
                    onAddPlace={handleAddPlace}
                />

                <PopupWithForm
                    name="are-you-sure"
                    title="Вы уверены?"
                    isOpen={false}
                    buttonText="Абсолютли!"
                />

                <ImagePopup card={selectedCard} onClose={closeAllPopups} />
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;
