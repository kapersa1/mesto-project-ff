import { openCardImage, likeToggle } from "..";
const cardTemplate = document.querySelector("#card-template").content;

export function createCard({ link, name }, deleteCard) {
  const cardItem = cardTemplate.querySelector(".card").cloneNode(true);
  const cardDeleteButton = cardItem.querySelector(".card__delete-button");
  const cardImg = cardItem.querySelector(".card__image");
  const cardLikeButton = cardItem.querySelector(".card__like-button");

  cardImg.src = link;
  cardImg.alt = name;
  cardItem.querySelector(".card__title").textContent = name;

  cardDeleteButton.addEventListener("click", () => {
    deleteCard(cardItem);
  });
  cardLikeButton.addEventListener("click", () => {
    likeToggle(cardLikeButton);
  });
  cardImg.addEventListener("click", () => openCardImage(link, name));

  return cardItem;
}

export function deleteCard(cardItem) {
  cardItem.remove();
}
