import React from 'react';
import Card from "./Card";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

export default function Main({
        cards,
        handleEditAvatarClick,
        handleEditProfileClick,
        handleAddPlaceClick,
        handleZoomPlaceClick,
        handleCardLike,
        handleCardDelete
        }) {

    const currentUser = React.useContext(CurrentUserContext);

    return(
        <main>
            <section className="profile container">
                <button className="profile__avatar"
                aria-label="Изменить фотографию профиля"
                onClick={handleEditAvatarClick}>
                    <img
                        src= {currentUser.avatar}
                        alt="Аватар профиля" className="profile__avatar-image"/>
                </button>
                <div className="profile__info">
                    <h1 className="profile__name">{currentUser.name}</h1>
                    <button className="profile__edit-button button"
                            type="button"
                            aria-label="Редактировать профиль"
                            onClick={handleEditProfileClick}>
                    </button>
                    <p className="profile__description">{currentUser.about}</p>
                </div>
                <button className="profile__add-button button"
                        type="button"
                        aria-label="Добавить профиль"
                        onClick={handleAddPlaceClick}>
                </button>
            </section>
            <section className="location container">
                <ul className="location__list">
                    {cards.map((card) => (
                        <Card
                            card={card}
                            key={card._id}
                            handleZoomPlaceClick={handleZoomPlaceClick}
                            handleCardLike={handleCardLike}
                            handleCardDelete={handleCardDelete} />
                            ))}
                </ul>
            </section>
        </main>
    );
}