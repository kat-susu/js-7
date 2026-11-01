"use strict";

// Практическая работа №7
// Тема: DOM и управление элементами страницы.
// Заполните только участки TODO.
// Имена функций и объект window.domLab не изменяйте.

// 1. Изменение текста заголовка.
// Найдите #main-title, запишите text в textContent и верните новый текст.
function changeTitle(text) {
  const title = document.querySelector("#main-title");
  title.textContent = text;
  
  return text;
}

// 2. Показать / скрыть информационный блок.
// Найдите #info-block и переключите класс hidden.
// Верните true, если после переключения блок видим, иначе false.
function toggleInfo() {
  const block = document.querySelector("#info-block");
  block.classList.toggle("hidden");
  
  return !block.classList.contains("hidden");
}

// 3. Изменение ссылки.
// Найдите #main-link.
// Запишите label в textContent, а url в атрибут href.
// Верните найденный элемент ссылки.
function updateLink(url, label) {
  const link = document.querySelector("#main-link");
  
  link.textContent = label;
  link.href = url;
  
  return link;
}

// 4. Динамический пункт списка.
// Создайте li со span и кнопкой "Удалить".
// span должен содержать text.
// Кнопка должна удалять созданный li по click.
// Добавьте li в #task-list и верните созданный li.
function addListItem(text) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const button = document.createElement("button");

  span.textContent = text;
  button.textContent = "Удалить";
  
  button.addEventListener("click", () => {
    li.remove();
  });

  li.append(span);
  li.append(button);

  const taskList = document.querySelector("#task-list");
  taskList.append(li);

  return li;
}

// 5. Карточка товара.
// Верните article.product-card, внутри которого находятся:
// h3 с product.name и p с текстом "Цена: PRICE ₸".
function createProductCard(product) {
  const article = document.createElement("article");
  article.classList.add("product-card");

  const h3 = document.createElement("h3");
  h3.textContent = product.name;

  const p = document.createElement("p");
  p.textContent = `Цена: ${product.price} ₸`;
  
  article.append(h3);
  article.append(p);
  
  return article;
}

// 6. Вывод массива товаров.
// Найдите #products, очистите его содержимое и для каждого объекта
// добавьте карточку через createProductCard().
// Верните количество отображённых карточек.
function renderProducts(products) {
  const productsContainer = document.querySelector("#products");
  
  productsContainer.innerHTML = "";
  
  products.forEach(product => {
    productsContainer.append(createProductCard(product));
  });
  
  return products.length;
}

window.domLab = {
  changeTitle,
  toggleInfo,
  updateLink,
  addListItem,
  createProductCard,
  renderProducts,
};
