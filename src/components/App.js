import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';

function App() {

  const [isEditAvatarPopupOpen, setisEditAvatarPopupOpen] = React.useState(false);
  const [isProfilePopupOpen, setProfilePopupOpen] = React.useState(false);
  const [isCardPopupOpen, setCardPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState('');
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
        isOpenAvatarPopup={isEditAvatarPopupOpen}
        
        onEditProfile={handleProfileClick}
        isOpenProfilePopup={isProfilePopupOpen}
        
        onEditAddPlaceClick={handleAddPlaceClick}
        isOpenCardPopup={isCardPopupOpen}
        
        onClosePopup={closeAllPopups}

        onOpenPopupImage={handleCardClick}
        selectedCard={selectedCard} 
        isOpenImagePopup={isImagePopupOpen} />
      <Footer />
    </>
  );
}

export default App;