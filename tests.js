"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const results = document.querySelector("#test-results");
  const fixture = document.querySelector("#fixture");
  const api = window.domLab;
  let failed = 0;

  function assert(condition, message) {
    if (!condition) {
      throw new Error(message);
    }
  }

  function resetFixture() {
    fixture.innerHTML = `
      <h1 id="main-title">Исходный заголовок</h1>
      <p id="info-block">Информация</p>
      <a id="main-link" href="#">Ссылка</a>
      <ul id="task-list"></ul>
      <div id="products"></div>
    `;
  }

  function test(name, fn) {
    resetFixture();
    try {
      fn();
      const p = document.createElement("p");
      p.className = "ok";
      p.textContent = `✓ ${name}`;
      results.append(p);
    } catch (error) {
      failed++;
      const p = document.createElement("p");
      p.className = "fail";
      p.textContent = `✗ ${name}: ${error.message}`;
      results.append(p);
    }
  }

  test("1. Изменение заголовка", () => {
    const result = api.changeTitle("Новый заголовок");
    assert(result === "Новый заголовок", "функция должна вернуть новый текст");
    assert(document.querySelector("#main-title").textContent === "Новый заголовок", "textContent не изменён");
  });

  test("2. Переключение видимости", () => {
    const first = api.toggleInfo();
    assert(first === false, "после первого переключения блок должен быть скрыт");
    assert(document.querySelector("#info-block").classList.contains("hidden"), "класс hidden не добавлен");

    const second = api.toggleInfo();
    assert(second === true, "после второго переключения блок должен быть видим");
    assert(!document.querySelector("#info-block").classList.contains("hidden"), "класс hidden не удалён");
  });

  test("3. Изменение ссылки", () => {
    const link = api.updateLink("/about", "О сайте");
    assert(link === document.querySelector("#main-link"), "нужно вернуть элемент ссылки");
    assert(link.textContent === "О сайте", "текст ссылки не изменён");
    assert(link.getAttribute("href") === "/about", "href не изменён");
  });

  test("4. Создание и удаление пункта", () => {
    const item = api.addListItem("Новый пункт");
    const list = document.querySelector("#task-list");
    assert(list.children.length === 1, "пункт не добавлен в список");
    assert(item.querySelector("span").textContent === "Новый пункт", "неверный текст пункта");
    const button = item.querySelector("button");
    assert(button && button.textContent === "Удалить", "кнопка удаления не создана");
    button.click();
    assert(list.children.length === 0, "кнопка должна удалять li");
  });

  test("5. Карточка товара", () => {
    const card = api.createProductCard({ name: "Keyboard", price: 12000 });
    assert(card.tagName === "ARTICLE", "карточка должна быть article");
    assert(card.classList.contains("product-card"), "нет класса product-card");
    assert(card.querySelector("h3").textContent === "Keyboard", "неверное название");
    assert(card.querySelector("p").textContent === "Цена: 12000 ₸", "неверная цена");
  });

  test("6. Вывод массива товаров", () => {
    const products = [
      { name: "Mouse", price: 5000 },
      { name: "Keyboard", price: 12000 },
      { name: "Monitor", price: 85000 },
    ];

    const count = api.renderProducts(products);
    const container = document.querySelector("#products");
    assert(count === 3, "функция должна вернуть 3");
    assert(container.children.length === 3, "должно быть 3 карточки");
    assert(container.children[2].querySelector("h3").textContent === "Monitor", "неверная третья карточка");

    api.renderProducts([{ name: "Phone", price: 100000 }]);
    assert(container.children.length === 1, "перед повторным выводом контейнер нужно очистить");
  });

  const summary = document.createElement("p");
  summary.id = "test-summary";
  summary.textContent = failed === 0 ? "Все тесты пройдены." : `Ошибок: ${failed}.`;
  summary.className = failed === 0 ? "ok" : "fail";
  results.append(summary);
});
