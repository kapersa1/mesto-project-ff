import initialCards from './cards';
import './pages/index.css';

// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы
const cardsContainer = document.querySelector(".places__list");

// @todo: Функция создания карточки
function createCard(card, deleteCard) {
    const cardItem = cardTemplate.querySelector(".card").cloneNode(true);
    const cardDeleteButton = cardItem.querySelector(".card__delete-button");
    const cardImg = cardItem.querySelector(".card__image");
    cardImg.src=card.link;
    cardImg.alt=card.name;
    cardItem.querySelector(".card__image").src = card.link;
    cardItem.querySelector(".card__title").textContent = card.name;
    cardDeleteButton.addEventListener("click", () => {
        deleteCard(cardItem);
    });
    return cardItem;
}

// @todo: Функция удаления карточки
function deleteCard(cardItem) {
    cardItem.remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach((card) => {
    const cardElement = createCard(card, deleteCard);
    cardsContainer.appendChild(cardElement);
});



const editButton = document.querySelector('.profile__edit-button');
const editPopup = document.querySelector('.popup_type_edit');

function openPopup() {
    editPopup.classList.add('popup_opened');
}

editButton.addEventListener('click', openPopup);