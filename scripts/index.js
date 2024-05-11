// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы
const placesList = document.querySelector(".places__list");

// @todo: Функция создания карточки
function createCard(card, deleteCard) {
    const cardItem = cardTemplate.querySelector(".card").cloneNode(true);
    const cardDeleteButton = cardItem.querySelector(".card__delete-button");
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
    placesList.appendChild(cardElement);
});
