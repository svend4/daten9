# Универсальные шаблоны виджетов

Модульная система для создания универсальных веб-страниц любого типа с поддержкой динамических данных, тем и плагинов.

## Особенности

- **Модульная архитектура** - легко добавляйте и удаляйте виджеты
- **Система шаблонов** - HTML с заглушками `{{placeholder}}` для статических и динамических данных
- **Готовые темы** - темы для ресторанов, каталогов и других сфер
- **Универсальные виджеты** - header, footer, card, list, navigation, gallery, form
- **Template Engine** - поддержка условий `{{#if}}` и циклов `{{#each}}`
- **Система плагинов** - расширяйте функциональность через хуки
- **Адаптивный дизайн** - работает на всех устройствах
- **CSS переменные** - легкая кастомизация через CSS

## Структура проекта

```
├── index.html                 # Главная демо-страница
├── templates/                 # Базовые шаблоны страниц
│   ├── widget-base.html       # Базовый шаблон виджета
│   ├── page-template.html     # Универсальный шаблон страницы
│   ├── menu-template.html     # Шаблон для меню
│   └── catalog-template.html  # Шаблон для каталога
├── widgets/                   # Универсальные виджеты
│   ├── header/                # Шапка сайта
│   ├── footer/                # Подвал
│   ├── card/                  # Карточка товара/услуги
│   ├── list/                  # Список
│   ├── navigation/            # Навигация
│   ├── gallery/               # Галерея
│   └── form/                  # Форма
├── styles/                    # Стили
│   ├── core.css               # Базовые стили
│   ├── widgets.css            # Стили виджетов
│   └── themes/                # Темы
│       ├── default.css        # Стандартная тема
│       ├── restaurant.css     # Тема для ресторанов
│       └── catalog.css        # Тема для каталогов
├── scripts/                   # JavaScript
│   ├── template-engine.js     # Движок шаблонов
│   ├── module-loader.js       # Загрузчик модулей
│   └── widget-manager.js      # Менеджер виджетов
├── data/examples/             # Примеры данных
│   ├── restaurant-menu.json   # Данные меню ресторана
│   └── catalog-items.json     # Данные каталога
├── examples/                  # Примеры использования
│   ├── restaurant-menu.html   # Меню ресторана
│   └── catalog.html           # Каталог товаров
└── docs/                      # Документация
    ├── USAGE.md               # Руководство пользователя
    └── API.md                 # API документация
```

## Быстрый старт

### 1. Базовая страница

```html
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Моя страница</title>

  <link rel="stylesheet" href="styles/core.css">
  <link rel="stylesheet" href="styles/widgets.css">
  <link rel="stylesheet" href="styles/themes/default.css">
</head>
<body class="theme-default">
  <div class="page-wrapper">
    <main class="main-content">
      <h1>Привет, мир!</h1>
    </main>
  </div>

  <script src="scripts/template-engine.js"></script>
  <script src="scripts/module-loader.js"></script>
  <script src="scripts/widget-manager.js"></script>
  <script>
    WidgetManager.init({ theme: 'default' });
  </script>
</body>
</html>
```

### 2. Использование шаблонизатора

```javascript
// Простой шаблон
const template = '<h1>{{title}}</h1><p>{{description}}</p>';
const data = { title: 'Заголовок', description: 'Описание' };
const html = templateEngine.render(template, data);

// С условиями
const template = `
  {{#if discount}}
  <span class="badge">Скидка!</span>
  {{/if}}
`;

// С циклами
const template = `
  {{#each items}}
  <div>{{name}} - {{price}}</div>
  {{/each}}
`;
```

### 3. Создание виджета

```javascript
WidgetManager.createWidget('card', {
  container: '#container',
  data: {
    title: 'Товар',
    description: 'Описание товара',
    price: '1000 ₽',
    image: 'path/to/image.jpg'
  }
});
```

## Примеры использования

### Меню ресторана

```bash
# Откройте в браузере
examples/restaurant-menu.html
```

Полнофункциональное меню ресторана с:
- Категориями блюд
- Карточками блюд с описанием и ценами
- Адаптивным дизайном
- Тематическим оформлением

### Каталог товаров

```bash
# Откройте в браузере
examples/catalog.html
```

Каталог товаров с:
- Фильтрацией по категориям
- Сеткой товаров
- Переключением режимов отображения
- Пагинацией

## Доступные виджеты

| Виджет | Описание | Пример использования |
|--------|----------|---------------------|
| **Header** | Шапка сайта с навигацией | Меню, логотип, поиск |
| **Footer** | Подвал с информацией | Ссылки, контакты, соцсети |
| **Card** | Универсальная карточка | Товары, услуги, статьи |
| **List** | Список элементов | Меню, новости, функции |
| **Navigation** | Навигационное меню | Основная навигация, хлебные крошки |
| **Gallery** | Галерея изображений | Портфолио, фото товаров |
| **Form** | Форма ввода | Обратная связь, регистрация |

## Темы

### Default
Универсальная стандартная тема для любых проектов.

```javascript
WidgetManager.applyTheme('default');
```

### Restaurant
Тема для ресторанов, кафе, баров с теплыми цветами и элегантным дизайном.

```javascript
WidgetManager.applyTheme('restaurant');
```

### Catalog
Тема для каталогов товаров/услуг с акцентом на удобство просмотра.

```javascript
WidgetManager.applyTheme('catalog');
```

### Создание своей темы

```css
/* styles/themes/my-theme.css */
.theme-my-theme {
  --color-primary: #your-color;
  --color-secondary: #your-color;
  --color-accent: #your-color;
  /* ... */
}
```

```javascript
WidgetManager.registerTheme('my-theme', {
  cssUrl: 'styles/themes/my-theme.css'
});
WidgetManager.applyTheme('my-theme');
```

## API

### Template Engine

```javascript
// Рендер шаблона
templateEngine.render(template, data);

// Компиляция для повторного использования
const compiled = templateEngine.compile(template);
compiled(data1);
compiled(data2);
```

### Module Loader

```javascript
// Регистрация модуля
moduleLoader.register('myModule', config);

// Загрузка модуля
await moduleLoader.load('myModule', '#container', data);

// Выгрузка модуля
await moduleLoader.unload('myModule');
```

### Widget Manager

```javascript
// Инициализация
WidgetManager.init({ theme: 'default' });

// Создание виджета
const id = WidgetManager.createWidget(type, config);

// Группировка виджетов
WidgetManager.createGroup('group1', [id1, id2]);

// Применение темы
WidgetManager.applyTheme('restaurant');

// Экспорт/импорт конфигурации
const config = WidgetManager.exportConfig();
WidgetManager.importConfig(config);
```

Полная документация в [docs/API.md](docs/API.md)

## Применение

Система подходит для создания:

- **Меню ресторанов** - красивые интерактивные меню
- **Каталоги товаров** - интернет-магазины, маркетплейсы
- **Каталоги услуг** - салоны, студии, сервисы
- **Портфолио** - галереи работ
- **Лендинги** - посадочные страницы
- **Корпоративные сайты** - о компании, услуги
- **Блоги** - статьи, новости
- **Документация** - техническая документация

## Технологии

- **HTML5** - семантическая разметка
- **CSS3** - современные стили с переменными
- **Vanilla JavaScript** - без зависимостей
- **JSON** - формат данных
- **Модульная архитектура** - расширяемость

## Преимущества

- ✅ Нет зависимостей - чистый JavaScript
- ✅ Легковесный - минимальный размер файлов
- ✅ Модульный - используйте только нужное
- ✅ Расширяемый - добавляйте свои виджеты
- ✅ Адаптивный - работает на всех устройствах
- ✅ Простой API - легко освоить
- ✅ Хорошо документирован
- ✅ Open Source

## Документация

- [Руководство по использованию](docs/USAGE.md)
- [API документация](docs/API.md)
- [Примеры](examples/)

## Поддержка браузеров

- Chrome/Edge (последние версии) ✅
- Firefox (последние версии) ✅
- Safari (последние версии) ✅
- IE11+ (с полифиллами) ⚠️

## Лицензия

MIT License - используйте свободно в любых проектах.

## Автор

Создано как универсальное решение для быстрой разработки веб-страниц.

---

**Начните работу прямо сейчас!** Откройте `index.html` в браузере или изучите примеры в папке `examples/`
