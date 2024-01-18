const arkhyz = new URL('https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg');
const chelyabinsk = new URL('https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg');
const ivanovo = new URL('https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg');
const kamchatka = new URL('https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg');
const kholmogorsky = new URL('https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg');
const baikal = new URL('https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg');

const initialCards = [
    {
        name: 'Архыз',
        link: arkhyz
    },
    {
        name: 'Челябинская область',
        link: chelyabinsk
    },
    {
        name: 'Иваново',
        link: ivanovo
    },
    {
        name: 'Камчатка',
        link: kamchatka
    },
    {
        name: 'Холмогорский район',
        link: kholmogorsky
    },
    {
        name: 'Байкал',
        link: baikal
    }
];

const config = {
    formSelector: '.popup__container',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button-color',
    inputErrorClass: 'popup__input_type_error',
};

export {initialCards, config}