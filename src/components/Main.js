import React from 'react';
import Card from './Card';
import { CurrentUserContext } from './../contexts/CurrentUserContext';
import { CurrentCardsContext } from './../contexts/CurrentCardsContext';


function Main(props) {

    const currentUser = React.useContext(CurrentUserContext);
    const currentCards = React.useContext(CurrentCardsContext);

    return (
        <main className="content">
            <section className="profile">
                <div onClick={props.onEditAvatar} className="profile__edit-avatar">
                    <img className="profile__avatar" src={currentUser.avatar} alt="Аватар" />
                </div>
                <div className="profile__info">
                    <div className="profile__edit-name">
                        <h1 className="profile__name">{currentUser.name}</h1>
                        <button onClick={props.onEditProfile} type="button" className="profile__edit-button">
                        </button>
                    </div>
                    <p className="profile__about-me">{currentUser.about}</p>
                </div>
                <button onClick={props.onEditAddPlaceClick} type="button" className="profile__add-button">
                </button>
            </section>

            <ul className="elements">
                {currentCards.map((card, id) => (
                    <li className="elements__element" key={id}>
                        <Card
                            card={card}
                            onCardClick={props.onOpenPopupImage}
                            onCardLike={props.onCardLike}
                            onCardDelete={props.onCardDelete} />
                    </li>
                ))}
            </ul>
        </main>
    )
};

export default Main;