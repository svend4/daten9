# API Документация

## Template Engine

### `TemplateEngine`

Класс для работы с шаблонами и заглушками.

#### Методы

##### `loadTemplate(name, source)`

Загружает шаблон.

```javascript
await templateEngine.loadTemplate('myTemplate', templateString);
// или загрузка с URL
await templateEngine.loadTemplate('myTemplate', 'http://example.com/template.html');
```

**Параметры:**
- `name` (string) - имя шаблона
- `source` (string) - шаблон или URL

**Возвращает:** Promise<string>

##### `render(template, data)`

Рендерит шаблон с данными.

```javascript
const html = templateEngine.render('<h1>{{title}}</h1>', { title: 'Hello' });
```

**Параметры:**
- `template` (string) - шаблон с заглушками
- `data` (object) - данные для замены

**Возвращает:** string

##### `renderTemplate(name, data)`

Рендерит именованный шаблон.

```javascript
const html = templateEngine.renderTemplate('myTemplate', { key: 'value' });
```

##### `compile(template)`

Компилирует шаблон в функцию для быстрого рендеринга.

```javascript
const compiled = templateEngine.compile('<p>{{text}}</p>');
const html1 = compiled({ text: 'Text 1' });
const html2 = compiled({ text: 'Text 2' });
```

### Синтаксис шаблонов

#### Заглушки

```html
{{variableName}}
```

#### Условия

```html
{{#if condition}}
  Content when true
{{/if}}
```

#### Циклы

```html
{{#each items}}
  <div>{{name}}</div>
{{/each}}
```

---

## Module Loader

### `ModuleLoader`

Класс для динамической загрузки модулей.

#### Методы

##### `register(moduleName, config)`

Регистрирует модуль.

```javascript
moduleLoader.register('myModule', {
  template: '<div>{{content}}</div>',
  styles: ['path/to/style.css'],
  scripts: ['path/to/script.js'],
  data: {},
  init: function(element, data) {},
  destroy: function(element) {}
});
```

**Параметры:**
- `moduleName` (string) - имя модуля
- `config` (object) - конфигурация модуля
  - `template` (string) - HTML шаблон
  - `styles` (array) - массив путей к CSS файлам
  - `scripts` (array) - массив путей к JS файлам
  - `data` (object) - данные по умолчанию
  - `init` (function) - функция инициализации
  - `destroy` (function) - функция очистки

##### `load(moduleName, targetSelector, data)`

Загружает модуль на страницу.

```javascript
await moduleLoader.load('myModule', '#container', { content: 'Hello' });
```

**Параметры:**
- `moduleName` (string) - имя модуля
- `targetSelector` (string) - CSS селектор контейнера
- `data` (object) - данные для модуля

**Возвращает:** Promise<boolean>

##### `unload(moduleName)`

Выгружает модуль.

```javascript
await moduleLoader.unload('myModule');
```

##### `addHook(hookName, callback)`

Добавляет хук.

```javascript
moduleLoader.addHook('afterLoad', async (data) => {
  console.log('Module loaded:', data.moduleName);
});
```

**Хуки:**
- `beforeLoad` - перед загрузкой модуля
- `afterLoad` - после загрузки модуля
- `beforeUnload` - перед выгрузкой модуля
- `afterUnload` - после выгрузки модуля

##### `isLoaded(moduleName)`

Проверяет, загружен ли модуль.

```javascript
if (moduleLoader.isLoaded('myModule')) {
  console.log('Module is loaded');
}
```

##### `getLoadedModules()`

Возвращает список загруженных модулей.

```javascript
const modules = moduleLoader.getLoadedModules();
```

---

## Widget Manager

### `WidgetManager`

Класс для управления виджетами.

#### Методы

##### `init(config)`

Инициализирует менеджер виджетов.

```javascript
WidgetManager.init({ theme: 'default' });
```

**Параметры:**
- `config` (object)
  - `theme` (string) - тема по умолчанию

##### `createWidget(type, config)`

Создает новый виджет.

```javascript
const id = WidgetManager.createWidget('card', {
  container: '#container',
  data: { title: 'Title', description: 'Description' }
});
```

**Параметры:**
- `type` (string) - тип виджета
- `config` (object)
  - `container` (string|Element) - контейнер
  - `data` (object) - данные виджета
  - `id` (string) - опциональный ID

**Возвращает:** string (ID виджета)

##### `removeWidget(widgetId)`

Удаляет виджет.

```javascript
WidgetManager.removeWidget('widget-123');
```

##### `getWidget(widgetId)`

Получает виджет по ID.

```javascript
const widget = WidgetManager.getWidget('widget-123');
```

##### `createGroup(groupName, widgetIds)`

Создает группу виджетов.

```javascript
WidgetManager.createGroup('myGroup', ['widget-1', 'widget-2']);
```

##### `addToGroup(groupName, widgetId)`

Добавляет виджет в группу.

```javascript
WidgetManager.addToGroup('myGroup', 'widget-3');
```

##### `removeGroup(groupName, removeWidgets)`

Удаляет группу.

```javascript
WidgetManager.removeGroup('myGroup', true); // true - удалить виджеты
```

##### `getGroup(groupName)`

Получает виджеты группы.

```javascript
const widgets = WidgetManager.getGroup('myGroup');
```

##### `applyTheme(themeName)`

Применяет тему.

```javascript
WidgetManager.applyTheme('restaurant');
```

##### `registerTheme(themeName, config)`

Регистрирует новую тему.

```javascript
WidgetManager.registerTheme('myTheme', {
  cssUrl: 'styles/themes/my-theme.css'
});
```

##### `exportConfig()`

Экспортирует конфигурацию страницы.

```javascript
const config = WidgetManager.exportConfig();
```

**Возвращает:** object
```javascript
{
  theme: 'default',
  widgets: [...],
  groups: [...]
}
```

##### `importConfig(config)`

Импортирует конфигурацию страницы.

```javascript
WidgetManager.importConfig(savedConfig);
```

---

## Доступные виджеты

### Header

Шапка сайта с навигацией, логотипом и поиском.

```javascript
{
  title: string,
  logo: string (URL),
  showNav: boolean,
  showSearch: boolean,
  navItems: [{url: string, label: string}],
  searchPlaceholder: string
}
```

### Footer

Подвал с ссылками и контактами.

```javascript
{
  title: string,
  showLinks: boolean,
  showSocial: boolean,
  links: [{url: string, label: string}],
  socialLinks: [{url: string, name: string}],
  contactInfo: string,
  copyright: string
}
```

### Card

Универсальная карточка.

```javascript
{
  title: string,
  description: string,
  image: string,
  price: string,
  oldPrice: string,
  badge: string,
  category: string,
  buttonText: string
}
```

### List

Список элементов.

```javascript
{
  title: string,
  listStyle: string,
  items: [{
    title: string,
    description: string,
    icon: string,
    link: string
  }]
}
```

### Navigation

Навигационное меню.

```javascript
{
  menuStyle: string,
  menuItems: [{
    url: string,
    label: string,
    icon: string,
    badge: string,
    children: [...]
  }]
}
```

### Gallery

Галерея изображений.

```javascript
{
  title: string,
  gridStyle: string,
  showLightbox: boolean,
  images: [{
    url: string,
    alt: string,
    caption: string
  }]
}
```

### Form

Форма ввода данных.

```javascript
{
  title: string,
  description: string,
  formId: string,
  submitText: string,
  fields: [{
    name: string,
    label: string,
    type: string,
    placeholder: string,
    required: boolean
  }]
}
```

---

## События

Все компоненты поддерживают стандартные DOM события:

```javascript
document.addEventListener('DOMContentLoaded', () => {
  WidgetManager.init();
});
```

---

## CSS Переменные

### Цвета

- `--color-primary` - основной цвет
- `--color-secondary` - вторичный цвет
- `--color-accent` - акцентный цвет
- `--color-text` - цвет текста
- `--color-background` - цвет фона

### Типографика

- `--font-family` - шрифт
- `--font-size-base` - базовый размер шрифта
- `--font-size-h1..h4` - размеры заголовков

### Отступы

- `--spacing-xs..xxl` - отступы разных размеров

### Прочее

- `--radius-sm..lg` - радиусы скругления
- `--shadow-sm..lg` - тени
- `--transition-fast..slow` - скорости переходов
