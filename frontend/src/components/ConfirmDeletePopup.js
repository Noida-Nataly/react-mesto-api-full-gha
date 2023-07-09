import Popup from "./Popup";
import React from "react";
export default function ConfirmDeletePopup ({isOpen, onClose,handleCardDelete}) {

    function handleSubmit (evt) {
        evt.preventDefault();
        handleCardDelete();

    return (
        <Popup
            isOpen={isOpen}
            onClose={onClose}

        >
            <form id="form-confirmation"
                  className="popup__content"
                  name="confirmation"
                  noValidate>
                <h2 className="popup__title">Вы уверены?</h2>
                <button id="delete-confirmation"
                        className="popup__confirm-button"
                        type="submit">Да
                </button>
            </form>
        </Popup>
    )}

}

