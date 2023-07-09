import React from "react";
import Popup from "./Popup";

export default function PopupWithForm({ name, title, children, buttonText, isOpen, onClose, handleSubmit}) {
    return (
        <Popup
            isOpen={isOpen}
            onClose={onClose}>
                 <form id={name}
                      method = "post"
                      className="popup__content"
                      onSubmit={handleSubmit}
                      >
                    <h2 className="popup__title">{title}</h2>
                    {children}
                    <button
                        className="popup__confirm-button"
                        type="submit">{buttonText}
                    </button>
                </form>
        </Popup>
    );
}