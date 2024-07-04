import initialCards from "./components/cards.js";
import "./pages/index.css";
import { deleteCard, createCard } from "./components/card.js";
import {
  openPopup,
  closePopup,
  closePopupOnOutsideClick,
} from "./components/modal.js";

const cardsContainer = document.querySelector(".places__list");
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const editPopup = document.querySelector(".popup_type_edit");
const addPopup = document.querySelector(".popup_type_new-card");
const closeButtons = document.querySelectorAll(".popup__close");
const openModalImage = document.querySelector(".popup_type_image");
const cardImagePopup = document.querySelector(".popup__image");
const cardNamePopup = document.querySelector(".popup__caption");
const editProfileForm = document.querySelector(
  '.popup__form[name="edit-profile"]'
);
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const editNewPlaceForm = document.querySelector(
  '.popup__form[name="new-place"]'
);
const placesList = document.querySelector(".places__list");

// Вывод карточек на страницу
initialCards.forEach((card) => {
  const cardElement = createCard(card, deleteCard, openCardImage, likeToggle);
  cardsContainer.appendChild(cardElement);
});

// закрытие карточек
closeButtons.forEach((closeButton) => {
  closeButton.addEventListener("click", () => {
    const popup = closeButton.closest(".popup");
    closePopup(popup);
  });
});

// лакйк карточки

function likeToggle(cardLikeButton) {
  cardLikeButton.classList.toggle("card__like-button_is-active");
}

// функция открытия модального окна картинки карточки
function openCardImage(link, name) {
  openPopup(openModalImage);
  cardImagePopup.src = link;
  cardImagePopup.alt = name;
  cardNamePopup.textContent = name;
}

//редактирование имени пользователя
function profileFormSubmit(evt) {
  evt.preventDefault();

  const newName = nameInput.value;
  const newJob = jobInput.value;

  profileName.textContent = newName;
  profileDescription.textContent = newJob;

  closePopup(editPopup);
}

//редактирование формы нового места
function newPlaceFormSubmit(evt) {
  evt.preventDefault();
  const newNameCard = editNewPlaceForm.querySelector(
    ".popup__input_type_card-name"
  ).value;
  const newUrlCard = editNewPlaceForm.querySelector(
    ".popup__input_type_url"
  ).value;

  const newCard = {
    name: newNameCard,
    link: newUrlCard,
  };

  const cardElement = createCard(newCard, deleteCard);

  placesList.prepend(cardElement);

  editNewPlaceForm.reset();
  closePopup(addPopup);
}

// Обработчики
editButton.addEventListener("click", () => {
  openPopup(editPopup);
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
});

addButton.addEventListener("click", () => {
  openPopup(addPopup);
});

document.querySelectorAll(".popup").forEach((popup) => {
  popup.addEventListener("click", closePopupOnOutsideClick);
});

editProfileForm.addEventListener("submit", profileFormSubmit);
editNewPlaceForm.addEventListener("submit", newPlaceFormSubmit);
