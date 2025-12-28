# Руководство по использованию

Универсальные шаблоны виджетов - это модульная система для быстрого создания веб-страниц любого типа.

## Быстрый старт

### 1. Подключение базовых файлов

```html
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Моя страница</title>

  <!-- Стили -->
  <link rel="stylesheet" href="styles/core.css">
  <link rel="stylesheet" href="styles/widgets.css">
  <link rel="stylesheet" href="styles/themes/default.css">
</head>
<body class="theme-default">
  <div class="page-wrapper">
    <!-- Ваш контент -->
  </div>

  <!-- Скрипты -->
  <script src="scripts/template-engine.js"></script>
  <script src="scripts/module-loader.js"></script>
  <script src="scripts/widget-manager.js"></script>
</body>
</html>
```

### 2. Использование шаблонизатора

```javascript
// Простой пример
const template = '<h1>{{title}}</h1><p>{{description}}</p>';
const data = {
  title: 'Привет, мир!',
  description: 'Это мой первый виджет'
};

const html = templateEngine.render(template, data);
document.getElementById('container').innerHTML = html;
```

### 3. Работа с условиями

```javascript
const template = `
  <div class="card">
    <h3>{{name}}</h3>
    {{#if hasDiscount}}
    <span class="badge">Скидка!</span>
    {{/if}}
    <p>Цена: {{price}}</p>
  </div>
`;

const data = {
  name: 'Товар',
  hasDiscount: true,
  price: '1000 ₽'
};
```

### 4. Работа с циклами

```javascript
const template = `
  <ul>
    {{#each items}}
    <li>{{name}} - {{price}}</li>
    {{/each}}
  </ul>
`;

const data = {
  items: [
    { name: 'Товар 1', price: '100 ₽' },
    { name: 'Товар 2', price: '200 ₽' },
    { name: 'Товар 3', price: '300 ₽' }
  ]
};
```

## Работа с виджетами

### Создание виджета

```javascript
// Инициализация менеджера
WidgetManager.init({ theme: 'default' });

// Создание виджета программно
const widgetId = WidgetManager.createWidget('card', {
  container: '#container',
  data: {
    title: 'Заголовок',
    description: 'Описание',
    price: '1000 ₽',
    image: 'path/to/image.jpg'
  }
});
```

### Удаление виджета

```javascript
WidgetManager.removeWidget(widgetId);
```

### Группировка виджетов

```javascript
// Создать группу
WidgetManager.createGroup('myGroup', [widget1, widget2, widget3]);

// Добавить виджет в группу
WidgetManager.addToGroup('myGroup', widget4);

// Получить виджеты группы
const widgets = WidgetManager.getGroup('myGroup');

// Удалить группу (и опционально виджеты)
WidgetManager.removeGroup('myGroup', true);
```

## Работа с модулями

### Регистрация модуля

```javascript
moduleLoader.register('myWidget', {
  template: '<div class="my-widget">{{content}}</div>',
  styles: ['path/to/styles.css'],
  scripts: ['path/to/script.js'],
  data: { content: 'Контент по умолчанию' },

  init: function(element, data) {
    console.log('Модуль инициализирован', element, data);
  },

  destroy: function(element) {
    console.log('Модуль удален', element);
  }
});
```

### Загрузка модуля

```javascript
await moduleLoader.load('myWidget', '#container', {
  content: 'Новый контент'
});
```

### Выгрузка модуля

```javascript
await moduleLoader.unload('myWidget');
```

### Хуки модулей

```javascript
// Добавить хук перед загрузкой
moduleLoader.addHook('beforeLoad', async (data) => {
  console.log('Загружается модуль:', data.moduleName);
});

// Добавить хук после загрузки
moduleLoader.addHook('afterLoad', async (data) => {
  console.log('Модуль загружен:', data.element);
});
```

## Работа с темами

### Переключение темы

```javascript
WidgetManager.applyTheme('restaurant');
```

### Регистрация новой темы

```javascript
WidgetManager.registerTheme('myTheme', {
  cssUrl: 'styles/themes/my-theme.css'
});
```

### Создание своей темы

Создайте CSS файл с переменными:

```css
.theme-myTheme {
  --color-primary: #your-color;
  --color-secondary: #your-color;
  --color-accent: #your-color;
  /* и т.д. */
}
```

## Загрузка данных из JSON

```javascript
async function loadData() {
  const response = await fetch('data/my-data.json');
  const data = await response.json();

  // Рендерим данные
  data.items.forEach(item => {
    const html = templateEngine.render(itemTemplate, item);
    container.innerHTML += html;
  });
}
```

## Экспорт и импорт конфигурации

### Экспорт

```javascript
const config = WidgetManager.exportConfig();
localStorage.setItem('pageConfig', JSON.stringify(config));
```

### Импорт

```javascript
const config = JSON.parse(localStorage.getItem('pageConfig'));
WidgetManager.importConfig(config);
```

## Адаптивность

Все виджеты автоматически адаптивны. Для дополнительной настройки используйте CSS медиа-запросы:

```css
@media (max-width: 768px) {
  .my-widget {
    /* Стили для мобильных устройств */
  }
}
```

## Советы и рекомендации

1. **Используйте группы** для управления связанными виджетами
2. **Кэшируйте шаблоны** используя метод `compile()` для часто используемых шаблонов
3. **Загружайте данные асинхронно** для улучшения производительности
4. **Используйте хуки** для добавления кастомной логики
5. **CSS переменные** позволяют легко кастомизировать темы

## Примеры использования

Смотрите готовые примеры в папке `examples/`:
- `restaurant-menu.html` - Меню ресторана
- `catalog.html` - Каталог товаров

## Поддержка браузеров

- Chrome/Edge (последние версии)
- Firefox (последние версии)
- Safari (последние версии)
- IE11+ (с полифиллами)
