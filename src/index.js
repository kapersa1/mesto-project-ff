import "./pages/index.css";
import { createCard, deleteCard, likeToggle } from "./components/card.js"; 
import { openPopup, closePopup, closePopupOnOutsideClick } from "./components/modal.js";
import { enableValidation, clearValidation } from "./components/validation.js";
import { getUserData, getInitialCards, patchUserData, postNewCard, updateAvatar } from "./components/api.js";

const cardsContainer = document.querySelector(".places__list");
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const editPopup = document.querySelector(".popup_type_edit");
const addPopup = document.querySelector(".popup_type_new-card");
const closeButtons = document.querySelectorAll(".popup__close");
const openModalImage = document.querySelector(".popup_type_image");
const cardImagePopup = document.querySelector(".popup__image");
const cardNamePopup = document.querySelector(".popup__caption");
const editProfileForm = document.querySelector('.popup__form[name="edit-profile"]');
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const editNewPlaceForm = document.querySelector('.popup__form[name="new-place"]');
const placesList = document.querySelector(".places__list");
const avatarButton = document.querySelector(".profile__avatar-button");
const avatarPopup = document.querySelector(".popup_type_avatar_edit");
const avatarForm = document.querySelector('.popup__form[name="edit-avatar"]');
const profileAvatar = document.querySelector(".profile__image img");

let userId; 

// Функция для создания карточек
function renderCards(cards) {
  cards.forEach((card) => {
    const cardElement = createCard(card, deleteCard, openCardImage, likeToggle, userId);
    cardsContainer.appendChild(cardElement);
  });
}

// Загрузка данных пользователя и карточек
Promise.all([getUserData(), getInitialCards()])
  .then(([userData, cards]) => {
    userId = userData._id; 
    profileName.textContent = userData.name;
    profileDescription.textContent = userData.about;
    profileAvatar.src = userData.avatar;
    renderCards(cards);
  })
  .catch((err) => console.error(err));

// Закрытие карточек
closeButtons.forEach((closeButton) => {
  closeButton.addEventListener("click", () => {
    const popup = closeButton.closest(".popup");
    closePopup(popup);
  });
});

// Функция открытия модального окна картинки карточки
function openCardImage(link, name) {
  openPopup(openModalImage);
  cardImagePopup.src = link;
  cardImagePopup.alt = name;
  cardNamePopup.textContent = name;
}

// Редактирование имени пользователя
function profileFormSubmit(evt) {
  evt.preventDefault();

  const saveButton = editProfileForm.querySelector('.popup__button');
  const originalText = saveButton.textContent;
  saveButton.textContent = 'Сохранение...';

  const newName = nameInput.value;
  const newJob = jobInput.value;

  patchUserData({ name: newName, about: newJob })
    .then(() => {
      profileName.textContent = newName;
      profileDescription.textContent = newJob;
      closePopup(editPopup);
    })
    .catch((err) => console.error(err))
    .finally(() => {
      saveButton.textContent = originalText;
    });
}

// Редактирование формы нового места
function newPlaceFormSubmit(evt) {
  evt.preventDefault();

  const saveButton = editNewPlaceForm.querySelector('.popup__button');
  const originalText = saveButton.textContent;
  saveButton.textContent = 'Сохранение...';

  const newNameCard = editNewPlaceForm.querySelector(".popup__input_type_card-name").value;
  const newUrlCard = editNewPlaceForm.querySelector(".popup__input_type_url").value;

  postNewCard(newNameCard, newUrlCard)
    .then((newCard) => {
      const cardElement = createCard(newCard, deleteCard, openCardImage, likeToggle, userId);
      placesList.prepend(cardElement);
      editNewPlaceForm.reset();
      closePopup(addPopup);
    })
    .catch((err) => console.error(err))
    .finally(() => {
      saveButton.textContent = originalText;
    });
}

// Обновление аватара
avatarForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const saveButton = avatarForm.querySelector('.popup__button');
  const originalText = saveButton.textContent;
  saveButton.textContent = 'Сохранение...';

  const avatarUrl = avatarForm.querySelector(".popup__input_type_avatar").value;

  updateAvatar({ avatar: avatarUrl })
    .then((userData) => {
      profileAvatar.src = userData.avatar;
      closePopup(avatarPopup);
    })
    .catch((err) => console.error(err))
    .finally(() => {
      saveButton.textContent = originalText;
    });
});

// Валидация форм
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_invalid",
  errorClass: "popup__error_visible",
};
enableValidation(validationConfig);

// Обработчики
editButton.addEventListener("click", () => {
  openPopup(editPopup);
  clearValidation(editProfileForm, validationConfig);
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
});

addButton.addEventListener("click", () => {
  openPopup(addPopup);
  editNewPlaceForm.reset();
  clearValidation(editNewPlaceForm, validationConfig);
});

avatarButton.addEventListener("click", () => {
  openPopup(avatarPopup);
  avatarForm.reset();
  clearValidation(avatarForm, validationConfig);
});

document.querySelectorAll(".popup").forEach((popup) => {
  popup.addEventListener("click", closePopupOnOutsideClick);
});

editProfileForm.addEventListener("submit", profileFormSubmit);
editNewPlaceForm.addEventListener("submit", newPlaceFormSubmit);
