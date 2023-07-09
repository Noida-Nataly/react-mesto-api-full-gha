import Popup from "./Popup";
import imageIsOk from '../images/isOk.svg'
import imageIsOops from '../images/isOops.svg'
export default function InfoTooltip ({isOpen, onClose, isOk}) {
    const linkImage = isOk ? imageIsOk : imageIsOops;
    const textMessage = isOk ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте еще раз.';
    return (
        <Popup
            isOpen={isOpen}
            onClose={onClose}
        >
            <div className="tooltip">
                <div className="tooltip__image"><img src={linkImage} alt={textMessage}/></div>
                <div className="tooltip__text">{textMessage}</div>
            </div>
        </Popup>
    )
}