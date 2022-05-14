import React from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import InfoToolTip from "./InfoToolTip";
import api from "../utils/api";
import apiAuth from "../utils/apiAuth";
import CurrentUserContext from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import Register from "./Register";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";

function App() {
    const [isEditProfilePopupOpen, setProfileOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setPlaceOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setAvatarOpen] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState(null);
    const [cards, setCards] = React.useState([]);
    const [loggedIn, setLoggedIn] = React.useState(false);
    const history = useHistory();
    const [email, setEmail] = React.useState(undefined);

    const [currentUser, setCurrentUser] = React.useState({
        name: "Loading...",
        about: "Loading...",
    });

    React.useEffect(() => {
        const token = localStorage.getItem("usersToken");
        if (token) {
            apiAuth
                .tokenCheck(token)
                .then((data) => {
                    setLoggedIn(true);
                    setEmail(data.email);
                    history.push("/");
                })
                .catch(() => {
                    console.log("Не удалось войти в систему");
                });
        }
    }, [loggedIn]);

    React.useEffect(() => {
        loggedIn &&
            api
                .getInitialUserInfo()
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
    }, [loggedIn]);

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
                setCards((prevCards) => [newCard, ...prevCards]);
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
        loggedIn &&
            api
                .getInitialCards()
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
    }, [loggedIn]);

    function handleCardLike(card) {
        const isLiked = card.likes.some(like => like === currentUser._id);
        api.changeLike(card._id, isLiked)
            .then((newCard) => {
                setCards((prevCards) => {
                    return prevCards.map((item) => {
                        if (newCard._id === item._id) {
                            return newCard;
                        }
                        return item;
                    });
                });
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
                setCards((prevCards) =>
                    prevCards.filter((item) => item._id !== card._id)
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



    function closeAllPopups() {
        setProfileOpen(false);
        setPlaceOpen(false);
        setAvatarOpen(false);
        setSelectedCard(null);
    }

    function handleLogOut() {
        localStorage.removeItem("usersToken");
        setEmail(undefined);
        setLoggedIn(false);
        history.push("/sign-in");
    }

    const [isInfoToolTipOpen, setInfoToolTipOpen] = React.useState(false);

    function closeInfoToolTip() {
        setInfoToolTipOpen(!isInfoToolTipOpen);
    }

    const [infoToolTipParams, setInfoToolTipParams] = React.useState({
        success: false,
        optionText: "",
    });

    function handleInfoToolTip(optionText = "", success = false) {
        setInfoToolTipParams({
            success: success,
            optionText: optionText,
        });
        closeInfoToolTip();
    }

    function handleSubmitReg(email, password) {
        apiAuth
            .signUp(password, email)
            .then((res) => {
                handleInfoToolTip("Вы успешно зарегистрировались!", true);
                history.push("/sign-in");
            })
            .catch((err) => {
                handleInfoToolTip(); //don't work
            });
    }

    function handleSubmitLog(email, password) {
        apiAuth
            .signIn(password, email)
            .then((data) => {
                if (data.token) {
                    localStorage.setItem("usersToken", data.token);
                    setLoggedIn(true);
                    history.push("/");
                } else {
                    return data;
                }
            })
            .catch((err) => {
                handleInfoToolTip(); //разобраться, как сделать json внутри catch и работать с объектом ошибки, чтобы достать оттуда текст и вставить в попап
            });
    }

    function MainPage() {
        return (
            <>
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
            </>
        );
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="page">
                <Header handleLogOut={handleLogOut} email={email} />
                <Switch>
                    <Route path="/sign-up">
                        <Register handleSubmitReg={handleSubmitReg} />
                    </Route>

                    <Route path="/sign-in">
                        <Login handleSubmitLog={handleSubmitLog} />
                    </Route>

                    <ProtectedRoute
                        component={MainPage}
                        path="/"
                        loggedIn={loggedIn}
                    />
                </Switch>

                <InfoToolTip
                    {...infoToolTipParams}
                    isOpen={isInfoToolTipOpen}
                    closePopup={closeInfoToolTip}
                />
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;
