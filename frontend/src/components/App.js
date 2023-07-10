import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import Cookies from "js-cookie";
import React, {useEffect, useState} from "react";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import {api} from "../utils/Api";
import {AppContext} from "../contexts/AppContext";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ProtectedRouteElement from "./ProtectedRoute";
import {Navigate, Route, Routes, useNavigate} from "react-router-dom";
import Register from "./Register";
import {auth} from "../utils/Auth";
import Login from "./Login";
import InfoTooltip from "./InfoTooltip";
import ComfirmDeletePopup from "./ConfirmDeletePopup";

function App() {

    const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
    const [isConfirmationPopupOpen, setConfirmationPopupOpen] = useState(false);
    const [isImagePopupOpen, setImagePopupOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState({});
    const [currentUser, setCurrentUser] = useState({});
    const [loggedIn, setLoggedIn] = useState(false);
    const [cards, setCards] = useState([]);
    const [email, setEmail] = useState('');
    const [isTooltipOpen, setIsTooltipOpen] = useState(false);
    const [isOk, setIsOk] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);

    const navigate = useNavigate();
    const isOpen = isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || isImagePopupOpen;

    useEffect(() => {
        function closeByEscape(evt) {
            if(evt.key === 'Escape') {
                closeAllPopups();
            }
        }
        function closeByOverlay(evt) {
            if(evt.target.classList.contains('popup_opened')) {
                closeAllPopups();
            }
        }

        if(isOpen) {
            document.addEventListener('keydown', closeByEscape);
            document.addEventListener('mousedown', closeByOverlay);
            return () => {
                document.removeEventListener('keydown', closeByEscape);
                document.removeEventListener('mousedown', closeByOverlay);
            }
        }
    }, [isOpen])

    useEffect(() => {
        checkToken();
    },[])

    useEffect(() => {
        Promise.all([api.getUserInfo(), api.getInitialCards()])
            .then(([userInfoResult, cardResult]) => {
                setCurrentUser(userInfoResult.data);
                setCards(cardResult);
            })
            .catch(console.error);
    }, [loggedIn])


    function checkToken() {
        const token = localStorage.getItem('token');
        if (token) {
            auth.getContent(token)
                .then((res) => {
                    if (res) {
                        setLoggedIn(true);
                        setEmail(res.data.email);
                        navigate("/", {replace: true})
                    }
                })
                .catch(console.error);
        }
    }

    function handleEditAvatarClick () {
        setEditAvatarPopupOpen(true);
    }
    function handleEditProfileClick () {
        setEditProfilePopupOpen(true);
    }
    function handleAddPlaceClick () {
        setAddPlacePopupOpen(true);
    }

    function handleZoomPlaceClick (card) {
        setSelectedCard(card);
        setImagePopupOpen(true);
    }

    function handleUpdateUser (currentUser) {
        setIsLoading(true);
        api.editProfile(currentUser.name, currentUser.about).then((updatedUser) => {
            setCurrentUser(updatedUser.data);
            closeAllPopups();
        })
        .catch(console.error)
        .finally(() => {
            setIsLoading(false);
        })
    }

    function handleUpdateAvatar (currentUser) {
        setIsLoading(true);
        api.updateAvatar(currentUser.avatar).then((updatedUser) => {
            setCurrentUser(updatedUser.data);
            closeAllPopups();
            })
            .catch(console.error)
            .finally(() => {
                setIsLoading(false);
            })
    }

    function handleAddPlaceSubmit(card) {
        setIsLoading(true);
        api.addCard(card.name, card.link).then((newCard) => {
            setCards([newCard.data, ...cards]);
            closeAllPopups();
        })
            .catch(console.error)
            .finally(() => {
                setIsLoading(false);
            })

    }

    function handleCardLike (card) {
        const isLiked = card.likes.some(like => like === currentUser._id);
        api.toggleLike(card._id, isLiked).then((newCard) => {
                setCards((state) => state.map((item) => item._id === card._id ? newCard : item));
            })
            .catch(console.error);
    }

    function handleCardDelete (card) {
        setIsConfirmDeleteOpen(true);
        api.deleteCard(card._id).then(() => {
            setCards((state) => state.filter((item) => item._id !== card._id))
        })
            .catch(console.error)
            .finally(() => {
                setIsConfirmDeleteOpen(false);
        })
    }

    function closeAllPopups() {
        setEditProfilePopupOpen(false);
        setAddPlacePopupOpen(false);
        setEditAvatarPopupOpen(false);
        setConfirmationPopupOpen(false);
        setImagePopupOpen(false);
        setIsTooltipOpen(false);
        setIsConfirmDeleteOpen(false);
    }

    function handleLogout () {
        auth.unauthorizeUser()
            .then((res) => {
                setLoggedIn(false);
                setEmail('');
            })
            .catch(console.error);
    }

    function registerUser(data) {
        auth.registerUser(data.email, data.password)
            .then((res) => {
                if(res){
                    setIsOk(true);
                } else {
                    setIsOk(false);
                }
                navigate('/sign-in', {replace: true});
            })
            .catch((err) => {
                setIsOk(false);
                console.error(err);
            })
            .finally (() => {
                setIsTooltipOpen(true);
            })
    }

    function loginUser(data) {
        auth.authorizeUser(data.email, data.password)
            .then((res) => {
                localStorage.setItem('token', res.token);
                setEmail(data.email);
                setLoggedIn(true);
                navigate('/', {replace: true});
            })
            .catch(console.error);
    }

    return (
        <AppContext.Provider value={{ isLoading, closeAllPopups }}>
            <CurrentUserContext.Provider value={currentUser}>
                <div className="page">
                    <Header
                    loggedIn = {loggedIn}
                    email = {email}
                    handleLogout={handleLogout}
                    />
                    <Routes>
                        <Route path='/' element={
                            <ProtectedRouteElement element={Main}
                                                   cards={cards}
                                                   handleEditAvatarClick={handleEditAvatarClick}
                                                   handleAddPlaceClick={handleAddPlaceClick}
                                                   handleEditProfileClick={handleEditProfileClick}
                                                   handleZoomPlaceClick={handleZoomPlaceClick}
                                                   handleCardLike={handleCardLike}
                                                   handleCardDelete={handleCardDelete}
                                                   loggedIn = {loggedIn}
                            />
                          }
                        />
                        <Route path='/sign-in' element={
                            loggedIn ? (
                                <Navigate to='/' replace/>
                            ) : (
                                <Login
                                    apiHandleSubmit={loginUser}
                                />
                            )
                        }
                        />
                        <Route path='/sign-up' element={
                            loggedIn ? (
                                <Navigate to='/' replace />
                            ) : (
                                <Register
                                    apiHandleSubmit = {registerUser}
                                />
                            )
                        }
                        />
                    </Routes>

                    <Footer />

                    <EditAvatarPopup
                        isOpen={isEditAvatarPopupOpen}
                        onUpdateAvatar={handleUpdateAvatar}
                        />

                    <PopupWithForm name="confirmation"
                                   title="Вы уверены?"
                                   buttonText="Да"
                                   isOpen={isConfirmationPopupOpen}
                                   onClose={closeAllPopups}>
                    </PopupWithForm>

                    <EditProfilePopup
                        isOpen={isEditProfilePopupOpen}
                        handleUpdateUser={handleUpdateUser}
                    />

                    <AddPlacePopup
                        isOpen={isAddPlacePopupOpen}
                        onAddPlace={handleAddPlaceSubmit}
                    />

                    <ImagePopup
                        card={selectedCard}
                        isOpen={isImagePopupOpen}
                        onClose={closeAllPopups}
                    />

                    <InfoTooltip
                        isOpen={isTooltipOpen}
                        onClose={closeAllPopups}
                        isOk={isOk}
                    />

                    <ComfirmDeletePopup
                        isOpen={isConfirmDeleteOpen}
                        onClose={closeAllPopups}>

                    </ComfirmDeletePopup>

                </div>
            </CurrentUserContext.Provider>
        </AppContext.Provider>
    );
}
export default App;