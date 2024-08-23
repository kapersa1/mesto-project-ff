function сlosePopupWithEscBtn(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
}

// Функция открытия попапа
export function openPopup(element) {
  element.classList.add("popup_is-animated");
  setTimeout(() => {
    element.classList.add("popup_is-opened");
  }, 50);
  document.addEventListener("keydown", сlosePopupWithEscBtn);
}

// Функция закрытия попапа
export function closePopup(element) {
  element.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", сlosePopupWithEscBtn);
}

export function closePopupOnOutsideClick(event) {
  if (event.target.classList.contains("popup_is-opened")) {
    closePopup(event.target);
  }
}
