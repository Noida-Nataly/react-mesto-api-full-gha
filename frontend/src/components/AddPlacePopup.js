import PopupWithForm from "./PopupWithForm";
import React, {useEffect} from "react";
import {useForm} from "../hooks/useForm";
import {AppContext} from "../contexts/AppContext";

export default function AddPlacePopup ({isOpen, onAddPlace}) {
    const {values, handleChange, setValues} = useForm({});
    const { isLoading, closeAllPopups } = React.useContext(AppContext);
    useEffect(() => {
        setValues({});
    },[isOpen])


    function handleSubmit (evt) {
        evt.preventDefault();
        onAddPlace(values);
        setValues({});
    }


    return (
        <PopupWithForm name="place"
                       title="Новое место"
                       buttonText={isLoading ? "Создание..." : "Создать"}
                       isOpen={isOpen}
                       onClose={closeAllPopups}
                       handleSubmit={handleSubmit}
        >
            <input
                id="place-name"
                name="name"
                className="popup__input"
                type="text"
                placeholder="Название"
                value = {values.name ?? ''}
                onChange={handleChange}
                minLength="2"
                maxLength="30"
                required />
            <span id="place-name-error" className="popup__error-message"></span>
            <input
                id="place-link"
                name="link"
                className="popup__input"
                type="url"
                placeholder="Ссылка на картинку"
                value = {values.link ?? ''}
                onChange={handleChange}
                required />
            <span id="place-link-error" className="popup__error-message"></span>
        </PopupWithForm>
    )
}