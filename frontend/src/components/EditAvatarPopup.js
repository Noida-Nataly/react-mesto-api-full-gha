import PopupWithForm from "./PopupWithForm";
import React from "react";
import {AppContext} from "../contexts/AppContext";
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function EditAvatarPopup({isOpen, onUpdateAvatar}) {
    const currentUser = React.useContext(CurrentUserContext);
    const { isLoading, closeAllPopups } = React.useContext(AppContext);
    const avatarRef = React.useRef();

    React.useEffect(() => {
        isOpen && (avatarRef.current.value = currentUser.avatar);
    }, [currentUser, isOpen]);

    function handleSubmit (evt) {
        evt.preventDefault();

        onUpdateAvatar ({
            avatar: avatarRef.current.value
        });
    }

    return (
        <PopupWithForm name="popup_avatar"
                       title="Обновить аватар"
                       isOpen={isOpen}
                       onClose={closeAllPopups}
                       buttonText={isLoading ? "Сохранение..." : "Сохранить"}
                       handleSubmit={handleSubmit}>
            <input
                id="avatar-link"
                name="avatar-link"
                className="popup__input"
                type="url"
                placeholder="Ссылка на фотографию"
                ref={avatarRef}
                required />
            <span id="avatar-link-error" className="popup__error-message"></span>
        </PopupWithForm>
    )
}