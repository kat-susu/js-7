# DOM в JavaScript: управление HTML-страницей

До этого JavaScript в основном работал с числами, строками, массивами, объектами и классами. Теперь переходим к браузерной части языка: JavaScript начинает работать не только с данными, но и с **элементами HTML-страницы**.

Главная цель занятия — понять цепочку:

**HTML → DOM → поиск элемента → изменение элемента → создание элемента → простое событие**.

## 1. Что такое DOM

HTML-файл — это текст. После загрузки страницы браузер разбирает HTML и строит из него объектную модель документа — **DOM (Document Object Model)**.

Например, HTML:

```html
<body>
  <h1>Каталог</h1>
  <ul>
    <li>Мышь</li>
    <li>Клавиатура</li>
  </ul>
</body>
```

можно представить как дерево:

```text
document
└── html
    └── body
        ├── h1
        └── ul
            ├── li
            └── li
```

Каждый HTML-элемент становится объектом, с которым JavaScript может работать.

## 2. Объект `document`

Главная точка входа в DOM — глобальный объект `document`:

```js
console.log(document);
console.log(document.body);
console.log(document.title);
```

Через `document` можно искать элементы, создавать новые элементы и получать информацию о странице.

## 3. Поиск элементов

### 3.1. `querySelector()`

Возвращает **первый** элемент, подходящий под CSS-селектор:

```js
const title = document.querySelector("h1");
const card = document.querySelector(".card");
const button = document.querySelector("#save-button");
```

Если подходящего элемента нет, результатом будет `null`.

```js
const missing = document.querySelector(".unknown");
console.log(missing); // null
```

### 3.2. `querySelectorAll()`

Возвращает все элементы, подходящие под селектор:

```js
const items = document.querySelectorAll(".item");

console.log(items.length);
```

Результат — `NodeList`. Его можно перебрать через `for...of` или `forEach()`:

```js
for (const item of items) {
  console.log(item.textContent);
}

items.forEach((item) => {
  console.log(item.textContent);
});
```

`NodeList` похож на массив, но не является обычным `Array`.

## 4. Чтение и изменение текста

### `textContent`

```html
<h1 id="main-title">Старый заголовок</h1>
```

```js
const title = document.querySelector("#main-title");

title.textContent = "Новый заголовок";
```

`textContent` работает именно с текстом.

### `innerHTML`

```js
const block = document.querySelector(".content");
block.innerHTML = "<strong>Важный текст</strong>";
```

`innerHTML` интерпретирует строку как HTML. Это удобно, но нельзя бездумно вставлять через него данные, полученные от пользователя или из недоверенного источника.

На текущем этапе для обычного текста предпочитаем `textContent`.

## 5. Свойства и атрибуты

DOM-элемент — объект. У него есть свойства:

```js
const image = document.querySelector("img");

image.src = "images/photo.jpg";
image.alt = "Фотография";
```

Атрибутами можно управлять и явно:

```js
const link = document.querySelector("a");

link.setAttribute("href", "https://example.com");
console.log(link.getAttribute("href"));
```

Удаление атрибута:

```js
link.removeAttribute("target");
```

## 6. Работа с CSS-классами

Для управления классами используется `classList`:

```js
const block = document.querySelector(".info");

block.classList.add("active");
block.classList.remove("active");
block.classList.toggle("active");
```

Проверка класса:

```js
if (block.classList.contains("active")) {
  console.log("Блок активен");
}
```

Часто JavaScript не задаёт стили напрямую, а только переключает CSS-классы.

```css
.hidden {
  display: none;
}
```

```js
block.classList.toggle("hidden");
```

Так JavaScript отвечает за поведение, а CSS — за внешний вид.

## 7. Создание элементов

Новый DOM-элемент создаётся через `document.createElement()`:

```js
const item = document.createElement("li");
item.textContent = "Новый пункт";
```

Пока элемент существует только в памяти. Чтобы он появился на странице, его нужно добавить в DOM:

```js
const list = document.querySelector("ul");
list.append(item);
```

Другие варианты:

```js
list.prepend(item);
```

Можно добавить несколько узлов:

```js
const title = document.createElement("h3");
const text = document.createElement("p");

card.append(title, text);
```

## 8. Удаление элементов

```js
const item = document.querySelector(".item");
item.remove();
```

После `remove()` элемент удаляется из DOM.

## 9. Объект данных → HTML-элемент

Мы уже умеем работать с объектами:

```js
const product = {
  name: "Keyboard",
  price: 12000
};
```

Теперь можно превратить объект в DOM-элемент:

```js
function createProductCard(product) {
  const card = document.createElement("article");
  const title = document.createElement("h3");
  const price = document.createElement("p");

  card.classList.add("product-card");
  title.textContent = product.name;
  price.textContent = `Цена: ${product.price} ₸`;

  card.append(title, price);

  return card;
}
```

Использование:

```js
const container = document.querySelector("#products");
container.append(createProductCard(product));
```

## 10. Массив объектов → список элементов

Здесь соединяются уже изученные массивы и объекты с DOM:

```js
const products = [
  { name: "Mouse", price: 5000 },
  { name: "Keyboard", price: 12000 },
  { name: "Monitor", price: 85000 }
];

const container = document.querySelector("#products");

for (const product of products) {
  const card = createProductCard(product);
  container.append(card);
}
```

Или:

```js
products.forEach((product) => {
  container.append(createProductCard(product));
});
```

Это одна из типичных задач клиентского JavaScript: получить данные и отобразить их на странице.

## 11. Первое событие: `click`

Страница становится интерактивной, когда JavaScript реагирует на действия пользователя.

```html
<button id="toggle-button">Показать / скрыть</button>
```

```js
const button = document.querySelector("#toggle-button");
const block = document.querySelector("#info-block");

button.addEventListener("click", function () {
  block.classList.toggle("hidden");
});
```

`addEventListener()` получает:

1. название события;
2. функцию, которая будет выполнена при событии.

```js
button.addEventListener("click", () => {
  console.log("Кнопка нажата");
});
```

Пока достаточно понимать только сам принцип. Объект события, `event.target`, всплытие, делегирование и `preventDefault()` разберём в следующем блоке.

## 12. Удаление созданного элемента по кнопке

Можно создать кнопку вместе с элементом и сразу привязать обработчик:

```js
function createItem(text) {
  const item = document.createElement("li");
  const label = document.createElement("span");
  const button = document.createElement("button");

  label.textContent = text;
  button.textContent = "Удалить";

  button.addEventListener("click", () => {
    item.remove();
  });

  item.append(label, button);
  return item;
}
```

Здесь пока не требуется `event.target`: обработчик уже «знает», какой `item` нужно удалить.

## 13. Когда выполнять DOM-код

JavaScript не сможет найти элемент, если HTML ещё не был разобран браузером.

Простой вариант — подключать скрипт перед закрывающим `</body>`:

```html
<body>
  ...
  <script src="index.js"></script>
</body>
```

Другой вариант — `defer`:

```html
<script src="index.js" defer></script>
```

С `defer` файл загружается параллельно, но выполняется после разбора HTML.

Также встречается событие:

```js
document.addEventListener("DOMContentLoaded", () => {
  // DOM уже построен
});
```

В наших примерах будем использовать `defer`.

## 14. Частые ошибки

### Ошибка 1. Элемент не найден

```js
const button = document.querySelector("#save");
button.textContent = "OK";
```

Если `#save` отсутствует, `button` будет `null`.

### Ошибка 2. Забыли добавить созданный элемент

```js
const p = document.createElement("p");
p.textContent = "Hello";
```

Этот элемент ещё не виден. Нужно:

```js
container.append(p);
```

### Ошибка 3. Путают `querySelector()` и `querySelectorAll()`

```js
const item = document.querySelector(".item");      // один элемент
const items = document.querySelectorAll(".item"); // NodeList
```

### Ошибка 4. Используют `innerHTML` там, где нужен обычный текст

```js
block.textContent = userText;
```

для пользовательского текста безопаснее и понятнее, чем непосредственная вставка строки через `innerHTML`.

## 15. Что важно уметь после занятия

После темы нужно уверенно уметь:

- объяснить, что такое DOM;
- найти элемент через `querySelector()`;
- получить несколько элементов через `querySelectorAll()`;
- изменить `textContent`;
- изменить атрибут или CSS-класс;
- создать элемент через `createElement()`;
- добавить его через `append()` / `prepend()`;
- удалить через `remove()`;
- построить HTML по объекту или массиву объектов;
- подключить простой обработчик `click` через `addEventListener()`.

На следующем этапе события будут разобраны подробнее, после чего перейдём к формам и валидации.
