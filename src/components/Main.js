import React, { useEffect } from 'react';
import avatar from './../images/avatar.jpg';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import api from './../utils/Api';
import Cards from './Cards';


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

            <PopupWithForm isOpen={props.isOpenAvatarPopup === true ? 'popup_opened' : ''} name='avatar' title='Обновить аватар' onClose={props.onClosePopup} button='Сохранить'>
                <input type="url" className="popup__input" id="avatarLink" name="link" placeholder="Ссылка на картинку" required />
                <span className="avatarLink-error"></span>
            </PopupWithForm>

            <PopupWithForm isOpen={props.isOpenProfilePopup === true ? 'popup_opened' : ''} name='profile-info' title='Редактировать профиль' onClose={props.onClosePopup} button='Сохранить'>
                <input type="text" className="popup__input" id="textName" name="name" placeholder="Имя" minLength="2" maxLength="40" required />
                <span className="textName-error"></span>
                <input type="text" className="popup__input" id="aboutMe" name="about" placeholder="О себе" minLength="2" maxLength="200" required />
                <span className="aboutMe-error"></span>
            </PopupWithForm>

            <PopupWithForm isOpen={props.isOpenCardPopup === true ? 'popup_opened' : ''} name='card' title='Новое место' onClose={props.onClosePopup} button='Создать'>
                <input type="text" className="popup__input" id="cardName" name="name" placeholder="Название" minLength="2"
                    maxLength="30" required />
                <span className="cardName-error"></span>
                <input type="url" className="popup__input" id="cardLink" name="link" placeholder="Ссылка на картинку" required />
                <span className="cardLink-error"></span>
            </PopupWithForm>

            <PopupWithForm isOpen='true' name='confirm-deletion' title='Вы уверены?' onClose={props.onClosePopup} button='Да' buttonStyle='popup__button-confirm-deletion'>
            </PopupWithForm>

            <ImagePopup card={props.selectedCard} isOpenImagePopup={props.isOpenImagePopup === true ? 'popup_opened' : ''} onClose={props.onClosePopup} />

            <Cards cards={cards} onCardClick={props.onOpenPopupImage} />
        </main>
    );
}

export default Main;