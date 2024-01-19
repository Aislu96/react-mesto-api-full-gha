import React, {useEffect, useState} from "react";
import api from "../utils/api.js";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import EditProfilePopup from "./EditProfilePopup";
import ImagePopup from "./ImagePopup";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import CardPopupDelete from "./CardPopupDelete";
import {Navigate, Route, Routes, useNavigate} from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import InfoTooltip from "./InfoTooltip";
import * as auth from "../utils/auth";
import ProtectedRoute from "./ProtectedRoute";

function App() {
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = useState(false);
    const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
    const [currentUser, setCurrentUser] = useState({});
    const [cards, setCards] = useState([]);
    const [selectedCard, setSelectedCard] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isInfoTooltip, setIsInfoTooltip] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false)
    const navigate = useNavigate();
    const [loggedIn, setLoggedIn] = useState(false);
    const [userData, setUserData] = useState({});
    const [isMenuActive, setIsMenuActive] = useState(false);

    useEffect(() => {
        if (loggedIn) {
            Promise.all([api.getCards(), api.getUser()])
                .then(([cards, user]) => {
                    setCurrentUser(user);
                    setCards(cards);
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    }, [loggedIn])

    useEffect(() => {
        tokenCheck();
        setIsMenuActive(false);
    }, []);

    const tokenCheck = () => {
        const jwt = localStorage.getItem('jwt');
        if (jwt) {
            // проверим токен
            auth.getContent().then((res) => {
                if (res) {
                    const userData = {
                        email: res.email,
                    }
                    setUserData(userData)
                    setLoggedIn(true);
                    navigate('/myprofile', {replace: true});
                }
            })
                .catch((error) => {
                    console.log(error);
                    setLoggedIn(false);
                })
                .finally(() => {
                    setIsLoading(false);
                });
        }
    }

    function handleAddPlaceSubmit(items) {
        setIsLoading(true);
        api.postCard(items)
            .then((newCard) => {
                setCards([newCard, ...cards]);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    function handleUpdateAvatar(item) {
        setIsLoading(true);
        api.patchAvatar(item)
            .then((newAvatar) => {
                setCurrentUser(newAvatar);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    function handleCardClick(card) {
        setIsImagePopupOpen(true);
        setSelectedCard(card);
    }

    function handleUpdateUser(data) {
        setIsLoading(true);
        api.patchUser(data)
            .then((data) => {
                setCurrentUser(data);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    function handelOverlayClose(evt) {
        if (evt.target.classList.contains('popup')) {
            closeAllPopups();
        }
    }

    function handleCardLike(card) {
        const isLiked = card.likes.some((id) => id === currentUser._id);

        if (!isLiked) {
            api
                .likeCard(card._id)
                .then((newCard) => {
                    setCards((state) =>
                        state.map((c) => (c._id === card._id ? newCard : c))
                    );
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            api.deleteLikeCard(card._id)
                .then((newCard) => {
                    setCards((state) =>
                        state.map((c) => (c._id === card._id ? newCard : c))
                    );
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }

    function handleCardDelete(card) {
        setIsLoading(true);
        api.deleteCard(card._id)
            .then(() => {
                setCards((cards) =>
                    cards.filter((c) => (c._id !== card._id))
                );
                closeAllPopups();
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    const isOpenPopup = isEditAvatarPopupOpen || isAddPlacePopupOpen || isEditProfilePopupOpen || setSelectedCard || isImagePopupOpen || isDeleteCardPopupOpen;
    useEffect(() => {
        function handleEscClose(e) {
            if (e.key === "Escape") {
                closeAllPopups();
            }
        }

        if (isOpenPopup) {
            document.addEventListener('keydown', handleEscClose);

            return () => {
                document.removeEventListener('keydown', handleEscClose);
            };
        }
    }, [isOpenPopup]);

    function closeAllPopups() {
        setIsEditAvatarPopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setSelectedCard(null);
        setIsDeleteCardPopupOpen(false);
        setIsImagePopupOpen(false);
        setIsSuccess(false);
    }

    function handelEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }

    function handelAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    }

    function handelEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    }

    function handleCardDeletePopup(card) {
        setIsDeleteCardPopupOpen(true);
        setSelectedCard(card);
    }

    function handelRegistration(values) {
        auth.register(values.email, values.password).then((res) => {
            if(res) {
                setIsSuccess(true);
                setIsInfoTooltip(true);
                navigate('/signin', {replace: true});
            } else {
                setIsSuccess(true);
                setIsInfoTooltip(false);
            }
        })
            .catch((err) => {
                console.log(err)
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    function handelLogin(values) {
        auth.login(values.email, values.password).then((res) => {
            if (res.token) {
                setLoggedIn(true);
                setUserData({email: values.email})
                navigate('/myprofile', {replace: true});
            }
        })
            .catch((err) => {
                setIsInfoTooltip(false);
                console.log(err);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    function signOut() {
        localStorage.removeItem('jwt');
        setLoggedIn(false);
        navigate('/signin', {replace: true});
    }


    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="App">
                <div className="page">
                    <Header
                        onSignOut={signOut}
                        loggedIn={loggedIn}
                        user={userData}
                        onLogOut={setLoggedIn}
                        isMenuActive={isMenuActive}
                        showMenu={setIsMenuActive}/>
                    <Routes>
                        <Route path="/"
                               element={loggedIn ? <Navigate to="/myprofile" replace/> :
                                   <Navigate to="/signin" replace/>}/>
                        <Route path="/signin" element={<Login
                            onSignin={handelLogin}
                        />}/>
                        <Route path="/signup" element={<Register
                            onSignup={handelRegistration}
                        />}/>
                        <Route path="/myprofile" element={
                            <ProtectedRoute
                                loggedIn={loggedIn}
                                onCardLike={handleCardLike}
                                onCardDelete={handleCardDeletePopup}
                                onEditProfile={handelEditProfileClick}
                                onAddPlace={handelAddPlaceClick}
                                onEditAvatar={handelEditAvatarClick}
                                currentUser={currentUser}
                                cards={cards}
                                onCardClick={handleCardClick}
                                element={Main}
                            />
                        }/>
                    </Routes>
                    <Footer/>
                    <EditAvatarPopup onUpdateAvatar={handleUpdateAvatar} isOpen={isEditAvatarPopupOpen}
                                     onClose={closeAllPopups}
                                     onClickOverlay={handelOverlayClose}
                                     isLoading={isLoading}/>
                    <AddPlacePopup onAddPlace={handleAddPlaceSubmit}
                                   isOpen={isAddPlacePopupOpen}
                                   onClose={closeAllPopups}
                                   onClickOverlay={handelOverlayClose}
                                   isLoading={isLoading}/>
                    <EditProfilePopup
                        onUpdateUser={handleUpdateUser}
                        isOpen={isEditProfilePopupOpen}
                        onClose={closeAllPopups}
                        onClickOverlay={handelOverlayClose}
                        isLoading={isLoading}
                    />
                    <ImagePopup card={selectedCard} onClose={closeAllPopups} onClickOverlay={handelOverlayClose}
                                isOpen={isImagePopupOpen}/>
                    <CardPopupDelete
                        card={selectedCard}
                        isOpen={isDeleteCardPopupOpen}
                        onClose={closeAllPopups}
                        onDelete={handleCardDelete}
                        isLoading={isLoading}
                    />
                    <InfoTooltip isOpen={isSuccess}
                                 onClose={closeAllPopups}
                                 onClickOverlay={handelOverlayClose}
                                 isModal={isInfoTooltip}
                    />
                </div>
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;