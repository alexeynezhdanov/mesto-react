import React, { useEffect } from 'react';
import Header from './Header';
import Main from './Main';
import api from './../utils/Api';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import { CurrentUserContext } from './../contexts/CurrentUserContext';
import { CurrentCardsContext } from './../contexts/CurrentCardsContext';

function App() {

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setProfilePopupOpen] = React.useState(false);
  const [isAllPlacePopupOpen, setAllPlacePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [isImagePopupOpen, setOpenPopup] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [currentCards, setCurrentCards] = React.useState([]);

  //Получение данных профиля
  useEffect(() => {
    api.getProfile()
      .then((user) => {
        setCurrentUser(user)
      })
      .catch((err) => {
        console.log(err);
      })
  }, [])

  //Получение данных массива карточек
  useEffect(() => {
    api.getInitialCards()
      .then((cards) => {
        setCurrentCards(cards);
      })
      .catch((err) => {
        console.log(err);
      })
  }, [])

  function handleAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleProfileClick() {
    setProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setAllPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setProfilePopupOpen(false);
    setAllPlacePopupOpen(false);
    setOpenPopup(false);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setOpenPopup(true);
  }

  //Изменение профиля, отправка данных на сервер
  function handleUpdateUser(item) {
    api.changeProfile(item.name, item.about)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
  }

  //Изменение аватара, отправка данных на сервер
  function handleUpdateAvatar(item) {
    api.changeAvatar(item)
      .then((res) => {
        currentUser.avatar = res.avatar;
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
  }

  //Ставим и получаем лайки на сервере
  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    const changeLikeCardStatus = isLiked ? 'deleteLike' : 'putLike';

    api[changeLikeCardStatus](card._id)
      .then((newCard) => {
        setCurrentCards((state) => state.map((existingCard) => existingCard._id === card._id ? newCard : existingCard));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //Добавляем карточку
  function handleAddCard(card) {
    api.addNewCard(card.name, card.link)
      .then((newCard) => {
        setCurrentCards([newCard, ...currentCards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
  };

  //Удаляем карточку
  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCurrentCards((state) => state.filter((existingCard) => existingCard._id === card._id ? '' : existingCard));
      })
      .catch((err) => {
        console.log(err);
      })
  };

  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
        <CurrentCardsContext.Provider value={currentCards}>
          <Header />
          <Main
            onEditAvatar={handleAvatarClick}
            onEditProfile={handleProfileClick}
            onEditAddPlaceClick={handleAddPlaceClick}
            onOpenPopupImage={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          />
          <Footer />

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar} />

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser} />

          <AddPlacePopup
            isOpen={isAllPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddCard} />

          <PopupWithForm
            isOpen='true'
            name='confirm-deletion'
            title='Вы уверены?'
            onClose={closeAllPopups}
            button='Да'
            buttonStyle='popup__button-confirm-deletion'>
          </PopupWithForm>

          <ImagePopup
            card={selectedCard}
            isOpenImagePopup={isImagePopupOpen === true ? 'popup_opened' : ''}
            onClose={closeAllPopups} />
        </CurrentCardsContext.Provider>
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;