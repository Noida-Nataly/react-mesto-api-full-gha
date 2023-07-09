import Popup from "./Popup";

export default function ImagePopup ({card, isOpen, onClose}) {
    const className = `popup ${isOpen ? 'popup_opened': ''}`;

    return (
        <Popup
            name={'zoom-image'}
            isOpen={isOpen}
            onClose={onClose}
        >
            <img className="popup__zoom-image" src={card.link} alt={card.name}/>
            <h2 className="popup__comment">{card.name}</h2>
        </Popup>
    );
}