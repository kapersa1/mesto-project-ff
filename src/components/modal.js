// Обработчик закрытия по клавише Esc
function сlosePopupWithEscBtn(evt, element) {
  if (evt.key === "Escape") {
    closePopup(element);
  }
}

// Открытие попапа
export function openPopup(element) {
  element.classList.add("popup_is-animated");
  setTimeout(() => {
    element.classList.add("popup_is-opened");
  }, 50);
  document.addEventListener("keydown", (evt) =>
    сlosePopupWithEscBtn(evt, element)
  );
}

// Закрытие попапа
export function closePopup(element) {
  element.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", (evt) =>
    сlosePopupWithEscBtn(evt, element)
  );
}
