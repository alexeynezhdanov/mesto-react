import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

function App() {

  const [isEditAvatarPopupOpen, setisEditAvatarPopupOpen] = React.useState(false);
  const [isProfilePopupOpen, setProfilePopupOpen] = React.useState(false);
  const [isCardPopupOpen, setCardPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [isImagePopupOpen, setOpenPopup] = React.useState(false);

  function handleAvatarClick() {
    setisEditAvatarPopupOpen(true);
  }

  function handleProfileClick() {
    setProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setCardPopupOpen(true);
  }

  function closeAllPopups() {
    setisEditAvatarPopupOpen(false);
    setProfilePopupOpen(false);
    setCardPopupOpen(false);
    setOpenPopup(false);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setOpenPopup(true);
  }

  return (
    <>
      <Header />
      <Main
        onEditAvatar={handleAvatarClick}
        onEditProfile={handleProfileClick}
        onEditAddPlaceClick={handleAddPlaceClick}
        onOpenPopupImage={handleCardClick} />
      <Footer />

      <PopupWithForm isOpen={isEditAvatarPopupOpen === true ? 'popup_opened' : ''} name='avatar' title='Обновить аватар' onClose={closeAllPopups} button='Сохранить'>
        <input type="url" className="popup__input" id="avatarLink" name="link" placeholder="Ссылка на картинку" required />
        <span className="avatarLink-error"></span>
      </PopupWithForm>

      <PopupWithForm isOpen={isProfilePopupOpen === true ? 'popup_opened' : ''} name='profile-info' title='Редактировать профиль' onClose={closeAllPopups} button='Сохранить'>
        <input type="text" className="popup__input" id="textName" name="name" placeholder="Имя" minLength="2" maxLength="40" required />
        <span className="textName-error"></span>
        <input type="text" className="popup__input" id="aboutMe" name="about" placeholder="О себе" minLength="2" maxLength="200" required />
        <span className="aboutMe-error"></span>
      </PopupWithForm>

      <PopupWithForm isOpen={isCardPopupOpen === true ? 'popup_opened' : ''} name='card' title='Новое место' onClose={closeAllPopups} button='Создать'>
        <input type="text" className="popup__input" id="cardName" name="name" placeholder="Название" minLength="2"
          maxLength="30" required />
        <span className="cardName-error"></span>
        <input type="url" className="popup__input" id="cardLink" name="link" placeholder="Ссылка на картинку" required />
        <span className="cardLink-error"></span>
      </PopupWithForm>

      <PopupWithForm isOpen='true' name='confirm-deletion' title='Вы уверены?' onClose={closeAllPopups} button='Да' buttonStyle='popup__button-confirm-deletion'>
      </PopupWithForm>

      <ImagePopup card={selectedCard} isOpenImagePopup={isImagePopupOpen === true ? 'popup_opened' : ''} onClose={closeAllPopups} />
    </>
  );
}

export default App;