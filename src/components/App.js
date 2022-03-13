import React from "react";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import api from "../utils/api";
import apiAuth from "../utils/apiAuth";
import CurrentUserContext from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import Register from "./Register";

function App() {
    const [isEditProfilePopupOpen, setProfileOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setPlaceOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setAvatarOpen] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState(null);
    const [cards, setCards] = React.useState([]);
    const [loggedIn, setLoggedIn] = React.useState(false);

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
    /* вынести в константы */
    const signData = {
        register: {
            headerText: "Войти",
            headerLink: "/sign-in",
            optionText: "Регистрация",
            buttonText: "Зарегистрироваться",
            buttonTitle: "Уже зарегистрированы? Войти",
            link: "/sign-up",
        },
        logIn: {
            headerText: "Регистрация",
            headerLink: "/sign-up",
            optionText: "Вход",
            buttonText: "Войти",
            buttonTitle: null,
            link: "/sign-in",
        },
        online: {
            headerText: "Выйти",
            headerLink: "/sign-in",
        },
    };

    const histiory = useHistory();
    const [email, setEmail] = React.useState(undefined);

    React.useEffect(() => {
        const token = localStorage.getItem("usersToken");
        if (token) {
            apiAuth
                .tokenCheck(token)
                .then((data) => {
                    console.log(data);
                    handleLogin();
                    setEmail(data.data.email);
                    histiory.push("/");
                })
                .catch(() => {
                    console.log("Не удалось войти в систему");
                });
        }
    }, [loggedIn]);

    function closeAllPopups() {
        setProfileOpen(false);
        setPlaceOpen(false);
        setAvatarOpen(false);
        setSelectedCard(null);
    }

    function handleLogin() {
        setLoggedIn(true);
    }

    function handleLogOut() {
        localStorage.removeItem("usersToken");
        setLoggedIn(false);
        histiory.push("/sign-in");
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="page">
                <Switch>
                    <Route path="/sign-up">
                        <Header
                            linkText={signData.register.headerText}
                            link={signData.register.headerLink}
                        />
                        <Register {...signData.register} />
                    </Route>
                    <Route path="/sign-in">
                        <Header
                            linkText={signData.logIn.headerText}
                            link={signData.logIn.headerLink}
                        />
                        <Register
                            {...signData.logIn}
                            handleLogin={handleLogin}
                        />
                    </Route>
                    <Route exact path="/">
                        {loggedIn ? (
                            <Redirect to="/" />
                        ) : (
                            <Redirect to="/sign-up" />
                        )}
                        <Header
                            linkText={signData.online.headerText}
                            link={signData.online.headerLink}
                            handleLogOut={handleLogOut}
                            email = {email}
                        />
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

                        <ImagePopup
                            card={selectedCard}
                            onClose={closeAllPopups}
                        />
                    </Route>
                </Switch>
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;
