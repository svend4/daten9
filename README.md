# daten9 — Универсальные шаблоны виджетов и динамических веб-страниц

Репозиторий посвящён модульной системе универсальных HTML/CSS/JS-шаблонов и виджетов для сборки веб-страниц с поддержкой статических и динамических данных, тем оформления и плагинов.

> **Состояние ветки `main`:** в основной ветке `main` на данный момент размещены только `README.md` и `LICENSE`. Полная реализация системы шаблонов, виджетов, примеров и документации находится в неслитой ветке [`claude/universal-widget-templates-5DOXm`](../../tree/claude/universal-widget-templates-5DOXm).

## Возможности (по ветке `claude/universal-widget-templates-5DOXm`)

- **Движок шаблонов (`TemplateEngine`, `scripts/template-engine.js`)**: подстановка заглушек `{{placeholder}}`, условные блоки `{{#if condition}}...{{/if}}`, циклы `{{#each items}}...{{/each}}`, загрузка шаблонов (`loadTemplate`), рендеринг именованных шаблонов (`renderTemplate`) и кешируемая компиляция (`compile`).
- **Загрузчик модулей (`ModuleLoader`, `scripts/module-loader.js`)**: регистрация, динамическая загрузка и выгрузка модулей с поддержкой хуков (`beforeLoad`, `afterLoad`).
- **Менеджер виджетов (`WidgetManager`, `scripts/widget-manager.js`)**: автосканирование элементов с `data-widget-type`, программное создание и удаление виджетов (`createWidget`, `removeWidget`), группировка (`createGroup`, `addToGroup`, `removeGroup`, `getGroup`), управление темами (`applyTheme`, `registerTheme`) и экспорт/импорт конфигурации (`exportConfig`, `importConfig`).
- **7 универсальных виджетов**: `header`, `footer`, `card`, `list`, `navigation`, `gallery`, `form`.
- **Система тем на CSS-переменных**: `default`, `restaurant`, `catalog`.

## Структура проекта

### Ветка `main`

- `LICENSE` — текст лицензии GNU Affero General Public License v3.
- `README.md` — описание проекта.

### Ветка `claude/universal-widget-templates-5DOXm`

```text
├── index.html                 # Главная демо-страница
├── README.md                  # Документация в ветке реализации
├── templates/                 # Базовые HTML-шаблоны
│   ├── widget-base.html
│   ├── page-template.html
│   ├── menu-template.html
│   └── catalog-template.html
├── widgets/                   # Модули виджетов
│   ├── header/
│   ├── footer/
│   ├── card/
│   ├── list/
│   ├── navigation/
│   ├── gallery/
│   └── form/
├── styles/
│   ├── core.css               # Базовые стили
│   ├── widgets.css            # Стили виджетов
│   └── themes/
│       ├── default.css
│       ├── restaurant.css
│       └── catalog.css
├── scripts/
│   ├── template-engine.js     # Движок шаблонов
│   ├── module-loader.js       # Загрузчик модулей
│   └── widget-manager.js      # Менеджер виджетов
├── data/examples/
│   ├── restaurant-menu.json   # Пример данных меню ресторана
│   └── catalog-items.json     # Пример данных каталога товаров
├── examples/
│   ├── restaurant-menu.html   # Демо меню ресторана
│   └── catalog.html           # Демо каталога товаров
└── docs/
    ├── USAGE.md               # Руководство по использованию
    └── API.md                 # Справочник API
```

## Стек и использование

- **Стек:** HTML5, CSS3 (CSS-переменные), Vanilla JavaScript (без сторонних зависимостей).
- **Использование (из ветки `claude/universal-widget-templates-5DOXm`):**

```bash
git checkout claude/universal-widget-templates-5DOXm
```

После переключения ветки откройте в браузере `index.html`, `examples/restaurant-menu.html` или `examples/catalog.html` (или поднимите любой статический веб-сервер в корне проекта для загрузки JSON/шаблонов через `fetch`). Подробные примеры подключения API приведены в `docs/USAGE.md` и `docs/API.md`.

## Ветки репозитория

- `main` — защищённая основная ветка (`LICENSE`, `README.md`).
- `claude/universal-widget-templates-5DOXm` — неслитая ветка с полной реализацией системы шаблонов, виджетов, тем, примеров и документации (`USAGE.md`, `API.md`).
- `codex/readme-overview-20261118` — неслитая ветка с открытым draft PR [#3](../../pull/3) («Add concise project README»), содержащая краткое описание по метаданным репозитория.
- `copilot/create-universal-widget-templates` — ветка закрытых PR [#1](../../pull/1) и [#2](../../pull/2); содержит только исходный файл `README.md` и начальный план в описании PR #1.

## Лицензия

В ветке `main` проект распространяется под лицензией **GNU Affero General Public License v3** (см. файл `LICENSE`). В `README.md` ветки `claude/universal-widget-templates-5DOXm` дополнительно упоминалась лицензия MIT.
