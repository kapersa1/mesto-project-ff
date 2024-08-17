import { removeCard, toggleLikeCard } from "./api.js"; // Импорт функций для удаления и лайков карточек с сервера

export function createCard({ link, name, _id, owner, likes }, deleteCard, openCardImage, likeToggle, userId) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardItem = cardTemplate.querySelector(".card").cloneNode(true);
  const cardDeleteButton = cardItem.querySelector(".card__delete-button");
  const cardImg = cardItem.querySelector(".card__image");
  const cardLikeButton = cardItem.querySelector(".card__like-button");
  const likeCountElement = cardItem.querySelector(".card_like-count"); // Элемент для отображения количества лайков

  cardImg.src = link;
  cardImg.alt = name;
  cardItem.querySelector(".card__title").textContent = name;
  likeCountElement.textContent = likes.length; // Устанавливаем количество лайков

  // Отображаем кнопку удаления только на карточках пользователя
  if (owner._id !== userId) {
    cardDeleteButton.remove();
  } else {
    cardDeleteButton.addEventListener("click", () => {
      deleteCard(cardItem, _id);
    });
  }

  cardLikeButton.addEventListener("click", () => {
    const isLiked = cardLikeButton.classList.contains("card__like-button_is-active");
    likeToggle(cardLikeButton, _id, isLiked, likeCountElement);
  });

  cardImg.addEventListener("click", () => openCardImage(link, name));

  return cardItem;
}

export function deleteCard(cardItem, cardId) {
  removeCard(cardId)
    .then(() => {
      cardItem.remove(); // Удаляем карточку из DOM
    })
    .catch((err) => console.error("Ошибка при удалении карточки:", err));
}

export function likeToggle(cardLikeButton, cardId, isLiked, likeCountElement) {
  toggleLikeCard(cardId, isLiked)
    .then((updatedCard) => {
      cardLikeButton.classList.toggle("card__like-button_is-active");
      likeCountElement.textContent = updatedCard.likes.length; // Обновляем количество лайков
    })
    .catch((err) => console.error("Ошибка при смене лайка:", err));
}