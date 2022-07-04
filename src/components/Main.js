import React, { useEffect } from 'react';
import avatar from './../images/avatar.jpg';
import api from './../utils/Api';
import Card from './Card';

function Main(props) {

    const [userAvatar, setUserAvatar] = React.useState(avatar);
    const [userDescription, setUserDescription] = React.useState();
    const [userName, setUserName] = React.useState();
    const [cards, setCards] = React.useState([]);

    useEffect(() => {
        Promise.all([api.getProfile(), api.getInitialCards()])
            .then(([user, cards]) => {
                setUserAvatar(user.avatar);
                setUserDescription(user.about);
                setUserName(user.name);
                setCards(cards);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

    return (
        <main className="content">
            <section className="profile">
                <div onClick={props.onEditAvatar} className="profile__edit-avatar">
                    <img className="profile__avatar" src={userAvatar} alt="Аватар" />
                </div>
                <div className="profile__info">
                    <div className="profile__edit-name">
                        <h1 className="profile__name">{userName}</h1>
                        <button onClick={props.onEditProfile} type="button" className="profile__edit-button">
                        </button>
                    </div>
                    <p className="profile__about-me">{userDescription}</p>
                </div>
                <button onClick={props.onEditAddPlaceClick} type="button" className="profile__add-button">
                </button>
            </section>

            <ul className="elements">
                {cards.map((card, id) => (
                    <li className="elements__element" key={id}>
                        <Card card={card} onCardClick={props.onOpenPopupImage} />
                    </li>
                ))}
            </ul>
        </main>
    );
}

export default Main;