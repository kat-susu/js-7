"use strict";

// Этот файл связывает готовые функции из student-template.js
// с демонстрационными кнопками practice.html.
// Для выполнения задач изменять этот файл не требуется.

document.addEventListener("DOMContentLoaded", () => {
  const api = window.domLab;

  document.querySelector("#demo-title-btn").addEventListener("click", () => {
    api.changeTitle("DOM действительно работает");
  });

  document.querySelector("#demo-toggle-btn").addEventListener("click", () => {
    api.toggleInfo();
  });

  document.querySelector("#demo-link-btn").addEventListener("click", () => {
    api.updateLink("https://developer.mozilla.org/", "MDN Web Docs");
  });

  let number = 1;
  document.querySelector("#demo-add-btn").addEventListener("click", () => {
    api.addListItem(`Пункт ${number}`);
    number++;
  });

  const products = [
    { name: "Mouse", price: 5000 },
    { name: "Keyboard", price: 12000 },
    { name: "Monitor", price: 85000 },
  ];

  document.querySelector("#demo-products-btn").addEventListener("click", () => {
    api.renderProducts(products);
  });
});
