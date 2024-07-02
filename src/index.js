import initialCards from "./components/cards.js";
import "./pages/index.css";
import { deleteCard, createCard } from "./components/card.js";
import { openPopup, closePopup } from "./components/modal.js";

const cardsContainer = document.querySelector(".places__list");
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const editPopup = document.querySelector(".popup_type_edit");
const addPopup = document.querySelector(".popup_type_new-card");
const closeButtons = document.querySelectorAll(".popup__close");
export const openModalImage = document.querySelector(".popup_type_image"); // Исправлено
export const cardImagePopup = document.querySelector(".popup__image");
export const cardNamePopup = document.querySelector(".popup__caption");

// Вывод карточек на страницу
initialCards.forEach((card) => {
  const cardElement = createCard(card, deleteCard);
  cardsContainer.appendChild(cardElement);
});

editButton.addEventListener("click", () => {
  openPopup(editPopup);
});
addButton.addEventListener("click", () => {
  openPopup(addPopup);
});

closeButtons.forEach((closeButton) => {
  closeButton.addEventListener("click", () => {
    const popup = closeButton.closest(".popup");
    closePopup(popup);
  });
});

function closePopupOnOutsideClick(event) {
  if (event.target.classList.contains("popup_is-opened")) {
    closePopup(event.target);
  }
}
//функция лайка

export function likeToggle(cardLikeButton) {
  cardLikeButton.classList.toggle("card__like-button_is-active");
}
// функция открытия модального окна картинки карточки
export function openCardImage(link, name) {
  openPopup(openModalImage);
  cardImagePopup.src = link;
  cardImagePopup.alt = name;
  cardNamePopup.textContent = name;
}

document.querySelectorAll(".popup").forEach((popup) => {
  popup.addEventListener("click", closePopupOnOutsideClick);
});
//редактирование имени пользователя
const formElement = document.querySelector('.popup__form[name="edit-profile"]');
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");

function handleFormSubmit(evt) {
  evt.preventDefault();

  const newName = nameInput.value;
  const newJob = jobInput.value;

  const profileName = document.querySelector(".profile__title");
  const profileDescription = document.querySelector(".profile__description");

  profileName.textContent = newName;
  profileDescription.textContent = newJob;

  closePopup(editPopup);
}

//редактирование формы
formElement.addEventListener("submit", handleFormSubmit);

const formCardElement = document.querySelector(
  '.popup__form[name="new-place"]'
);

function handleCardSubmit(evt) {
  evt.preventDefault();
  const newNameCard = formCardElement.querySelector(
    ".popup__input_type_card-name"
  ).value;
  const newUrlCard = formCardElement.querySelector(
    ".popup__input_type_url"
  ).value;

  const newCard = {
    name: newNameCard,
    link: newUrlCard,
  };

  const cardElement = createCard(newCard, deleteCard);
  const placesList = document.querySelector(".places__list");
  placesList.prepend(cardElement);

  formCardElement.reset();
  closePopup(addPopup);
}

formCardElement.addEventListener("submit", handleCardSubmit);
