import React from "react";

export default function Popup({name,  children, isOpen, onClose}) {
    const classPopupIsOpen = `popup ${isOpen ? 'popup_opened': ''}`;
    const classIsZoomImage =`popup__container ${name==='zoom-image' 
        ? 'popup__container_type_zoom-image'
        : ''}`
    return (
        <div className={classPopupIsOpen}>
            <div className={classIsZoomImage}>

                <button className="popup__close-button button close-popup"
                        type="button"
                        aria-label="Закрыть"
                        onClick={onClose}>
                </button>
                {children}
             </div>
        </div>
    );
}