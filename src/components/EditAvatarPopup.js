import { useEffect, useState, useRef } from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {

  const [avatar, setAvatar] = useState('');
  // записываем объект, возвращаемый хуком, в переменную
  const avatarRef = useRef();

  //Чистим инпуты
  useEffect(() => {
    setAvatar('');
  }, [props.isOpen]);

  //Отправка данных в стейт avatar
  function handleAvatar(e) {
    setAvatar(e.target.value);
  };

  //Обработка формы
  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar({
      link: avatarRef.current.name /* Значение инпута, полученное с помощью рефа */
    });
  };

  return (
    <PopupWithForm
      isOpen={props.isOpen && 'popup_opened'}
      onSubmit={handleSubmit}
      name='avatar'
      title='Обновить аватар'
      onClose={props.onClose}
      button='Сохранить'>

      <input
        type="url"
        className="popup__input"
        id="avatarLink"
        onChange={handleAvatar}
        ref={avatarRef}
        name={avatar}
        value={avatar}
        placeholder="Ссылка на картинку"
        required />

      <span className="avatarLink-error">
      </span>
    </PopupWithForm>
  )
};

export default EditAvatarPopup;