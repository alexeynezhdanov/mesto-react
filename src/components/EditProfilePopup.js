import React, { useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from './../contexts/CurrentUserContext';

function EditProfilePopup(props) {
    const currentUser = React.useContext(CurrentUserContext);
    const [name, setName] = React.useState({});
    const [description, setDescription] = React.useState({});

    //Отправка данных в стейт name
    function handleName(e) {
        setName(e.target.value);
    }

    //Отправка данных в стейт description
    function handleDescription(e) {
        setDescription(e.target.value);
    }

    //Обработка формы
    function handleSubmit(e) {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();

        // Передаём значения управляемых компонентов во внешний обработчик
        props.onUpdateUser({
            name: name,
            about: description
        });
    }

    //Подстановка данных полученых с сервера в форму
    useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser]);

    return (
        <PopupWithForm
            isOpen={props.isOpen === true ? 'popup_opened' : ''}
            onSubmit={handleSubmit}
            name='profile-info'
            title='Редактировать профиль'
            onClose={props.onClose}
            button='Сохранить'>

            <input
                type="text"
                className="popup__input"
                id="textName" 
                onChange={handleName}
                placeholder="Имя"
                minLength="2"
                maxLength="40"
                required />

            <span
                className="textName-error">
            </span>

            <input
                type="text"
                className="popup__input"
                id="aboutMe"
                onChange={handleDescription}
                placeholder="О себе"
                minLength="2"
                maxLength="200"
                required />

            <span
                className="aboutMe-error">
            </span>
        </PopupWithForm>
    )
};

export default EditProfilePopup;