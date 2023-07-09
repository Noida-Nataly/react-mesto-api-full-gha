import React from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

export default function Card({
                                 card,
                                 handleZoomPlaceClick,
                                 handleCardLike,
                                 handleCardDelete}) {
    const currentUser = React.useContext(CurrentUserContext);
    const isOwn = card.owner._id === currentUser._id;
    const isLiked = card.likes.some(like => like._id === currentUser._id);
    const cardLikeButtonClassName = ( `location__like-button button ${isLiked && 'location__like-button_active'}`)

    return (

            <li className="location__card" >
                <div className="location__wrapper">
                    {isOwn &&
                        <button className="location__delete-button button"
                                type="button"
                                onClick = {() => {handleCardDelete(card)}}
                                aria-label="Удалить место">
                        </button>
                    }
                    <img className="location__image"
                         src={card.link}
                         alt={card.name}
                         onClick={() => {
                             handleZoomPlaceClick(card)
                         }}/>

                </div>
                <div className="location__description">
                    <h2 className="location__title">{card.name}</h2>
                    <div className="location__like">
                        <button className={cardLikeButtonClassName}
                                type="button"
                                onClick = {() => {
                                    handleCardLike(card)
                                } }
                                aria-label="Отметить избранное">
                        </button>
                        <span className="location__like-count">{card.likes.length}</span>
                    </div>
                </div>
            </li>

    );
}