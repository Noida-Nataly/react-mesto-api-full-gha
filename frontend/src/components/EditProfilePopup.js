import PopupWithForm from "./PopupWithForm";
import {AppContext} from "../contexts/AppContext";
import React from "react";

import {CurrentUserContext} from "../contexts/CurrentUserContext";

export default function EditProfilePopup({ isOpen, handleUpdateUser}) {
    const [name, setName] = React.useState('');
    const { isLoading, closeAllPopups } = React.useContext(AppContext);
    const [description, setDescription] = React.useState('');
    const currentUser = React.useContext(CurrentUserContext);

    function handleNameChange(evt) {
        setName(evt.target.value)
    }

    function handleDescriptionChange(evt) {
        setDescription(evt.target.value)
    }
    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, isOpen]);

    function handleSubmit (evt) {
        evt.preventDefault();
        const user = {name: name, about: description}
        handleUpdateUser(user);

    }

    return (
        <PopupWithForm name="profile"
                       title="Редактировать профиль"
                       isOpen={isOpen}
                       onClose={closeAllPopups}
                       buttonText={isLoading ? "Сохранение..." : "Сохранить"}
                       handleSubmit={handleSubmit}>
            <input
                id="name-profile"
                name="name-profile"
                className="popup__input"
                type="text"
                placeholder="Имя"
                value = {name ?? ''}
                onChange={handleNameChange}
                minLength="2"
                maxLength="40"
                required />
            <span id="name-profile-error" className="popup__error-message"></span>
            <input
                id="description-profile"
                name="description-profile"
                className="popup__input"
                type="text"
                placeholder="Информация о себе"
                value = {description ?? ''}
                onChange={handleDescriptionChange}
                minLength="2"
                maxLength="200"
                required />
            <span id="description-profile-error" className="popup__error-message"></span>
        </PopupWithForm>
    )
}