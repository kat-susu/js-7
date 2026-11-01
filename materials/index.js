"use strict";

function section(title) {
  console.log(`\n=== ${title} ===`);
}

section("1. document и поиск элементов");

const title = document.querySelector("#main-title");
const demos = document.querySelectorAll(".demo");

console.log(title);
console.log("Количество .demo:", demos.length);

demos.forEach((demo, index) => {
  console.log(`Блок ${index + 1}:`, demo.querySelector("h2").textContent);
});

section("2. textContent");

console.log("Исходный текст:", title.textContent);

const changeTitleButton = document.querySelector("#change-title-button");
changeTitleButton.addEventListener("click", () => {
  title.textContent = "Заголовок изменён через DOM";
});

section("3. classList");

const infoBlock = document.querySelector("#info-block");
const toggleInfoButton = document.querySelector("#toggle-info-button");

toggleInfoButton.addEventListener("click", () => {
  infoBlock.classList.toggle("hidden");
});

section("4. Атрибуты");

const link = document.querySelector("#main-link");
const changeLinkButton = document.querySelector("#change-link-button");

changeLinkButton.addEventListener("click", () => {
  link.textContent = "MDN Web Docs";
  link.setAttribute("href", "https://developer.mozilla.org/");
  link.setAttribute("target", "_blank");
});

section("5. createElement, append и remove");

const list = document.querySelector("#demo-list");
const addItemButton = document.querySelector("#add-item-button");
let itemNumber = 2;

function createRemovableItem(text) {
  const item = document.createElement("li");
  const label = document.createElement("span");
  const removeButton = document.createElement("button");

  label.textContent = text;
  removeButton.textContent = "Удалить";

  removeButton.addEventListener("click", () => {
    item.remove();
  });

  item.append(label, removeButton);
  return item;
}

addItemButton.addEventListener("click", () => {
  const item = createRemovableItem(`Пункт ${itemNumber}`);
  list.append(item);
  itemNumber++;
});

section("6. Объект -> DOM");

function createProductCard(product) {
  const card = document.createElement("article");
  const name = document.createElement("h3");
  const price = document.createElement("p");

  card.classList.add("product-card");
  name.textContent = product.name;
  price.textContent = `Цена: ${product.price} ₸`;

  card.append(name, price);
  return card;
}

section("7. Массив объектов -> DOM");

const products = [
  { name: "Mouse", price: 5000 },
  { name: "Keyboard", price: 12000 },
  { name: "Monitor", price: 85000 },
];

const productsContainer = document.querySelector("#products");

for (const product of products) {
  productsContainer.append(createProductCard(product));
}

section("8. Проверка собственных DOM-свойств и методов");

console.log("Тип title:", typeof title);
console.log("textContent:", title.textContent);
console.log("Метод remove существует:", typeof title.remove === "function");
