/**
 * Widget Manager - управление виджетами на странице
 * Предоставляет высокоуровневый API для работы с виджетами
 */

class WidgetManager {
  constructor() {
    this.widgets = new Map();
    this.groups = new Map();
    this.themes = new Map();
    this.currentTheme = 'default';
    this.initialized = false;
  }

  /**
   * Инициализация менеджера виджетов
   */
  init(config = {}) {
    if (this.initialized) return;

    this.currentTheme = config.theme || 'default';
    this.initialized = true;

    // Сканировать страницу на предмет виджетов с data-атрибутами
    this.scanPage();

    // Применить тему
    this.applyTheme(this.currentTheme);

    console.log('Widget Manager initialized');
  }

  /**
   * Сканирует страницу и инициализирует виджеты
   */
  scanPage() {
    const widgetElements = document.querySelectorAll('[data-widget-type]');
    widgetElements.forEach(element => {
      const type = element.dataset.widgetType;
      const id = element.dataset.widgetId || this.generateId();

      this.widgets.set(id, {
        id,
        type,
        element,
        config: this.parseDataAttributes(element)
      });
    });
  }

  /**
   * Создает новый виджет
   */
  createWidget(type, config = {}) {
    const id = config.id || this.generateId();
    const container = config.container || document.body;

    // Использовать модуль если он зарегистрирован
    if (moduleLoader.modules.has(type)) {
      moduleLoader.load(type, container, config.data);
    } else {
      // Создать базовый виджет
      const widget = document.createElement('div');
      widget.className = 'widget';
      widget.dataset.widgetType = type;
      widget.dataset.widgetId = id;

      if (config.content) {
        widget.innerHTML = config.content;
      }

      if (typeof container === 'string') {
        document.querySelector(container).appendChild(widget);
      } else {
        container.appendChild(widget);
      }

      this.widgets.set(id, {
        id,
        type,
        element: widget,
        config
      });
    }

    return id;
  }

  /**
   * Удаляет виджет
   */
  removeWidget(widgetId) {
    const widget = this.widgets.get(widgetId);
    if (!widget) return false;

    if (widget.element) {
      widget.element.remove();
    }

    this.widgets.delete(widgetId);
    return true;
  }

  /**
   * Создает группу виджетов
   */
  createGroup(groupName, widgetIds = []) {
    this.groups.set(groupName, widgetIds);
  }

  /**
   * Добавляет виджет в группу
   */
  addToGroup(groupName, widgetId) {
    const group = this.groups.get(groupName) || [];
    if (!group.includes(widgetId)) {
      group.push(widgetId);
      this.groups.set(groupName, group);
    }
  }

  /**
   * Удаляет группу виджетов
   */
  removeGroup(groupName, removeWidgets = false) {
    const group = this.groups.get(groupName);
    if (!group) return false;

    if (removeWidgets) {
      group.forEach(widgetId => this.removeWidget(widgetId));
    }

    this.groups.delete(groupName);
    return true;
  }

  /**
   * Применяет тему к странице
   */
  applyTheme(themeName) {
    // Удалить предыдущую тему
    document.body.classList.remove(`theme-${this.currentTheme}`);

    // Применить новую тему
    document.body.classList.add(`theme-${themeName}`);
    this.currentTheme = themeName;

    // Загрузить CSS темы если есть
    const themeConfig = this.themes.get(themeName);
    if (themeConfig && themeConfig.cssUrl) {
      this.loadThemeStyles(themeConfig.cssUrl);
    }
  }

  /**
   * Регистрирует тему
   */
  registerTheme(themeName, config) {
    this.themes.set(themeName, config);
  }

  /**
   * Загружает стили темы
   */
  loadThemeStyles(cssUrl) {
    // Удалить старые стили темы
    const oldThemeLink = document.querySelector('link[data-theme-css]');
    if (oldThemeLink) {
      oldThemeLink.remove();
    }

    // Добавить новые стили
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = cssUrl;
    link.dataset.themeCss = 'true';
    document.head.appendChild(link);
  }

  /**
   * Парсит data-атрибуты элемента
   */
  parseDataAttributes(element) {
    const config = {};
    Array.from(element.attributes).forEach(attr => {
      if (attr.name.startsWith('data-widget-')) {
        const key = attr.name.replace('data-widget-', '');
        config[key] = attr.value;
      }
    });
    return config;
  }

  /**
   * Генерирует уникальный ID
   */
  generateId() {
    return `widget-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Получает виджет по ID
   */
  getWidget(widgetId) {
    return this.widgets.get(widgetId);
  }

  /**
   * Получает все виджеты в группе
   */
  getGroup(groupName) {
    const widgetIds = this.groups.get(groupName) || [];
    return widgetIds.map(id => this.widgets.get(id)).filter(Boolean);
  }

  /**
   * Экспортирует конфигурацию страницы
   */
  exportConfig() {
    return {
      theme: this.currentTheme,
      widgets: Array.from(this.widgets.values()).map(w => ({
        id: w.id,
        type: w.type,
        config: w.config
      })),
      groups: Array.from(this.groups.entries()).map(([name, ids]) => ({
        name,
        widgets: ids
      }))
    };
  }

  /**
   * Импортирует конфигурацию страницы
   */
  importConfig(config) {
    if (config.theme) {
      this.applyTheme(config.theme);
    }

    if (config.widgets) {
      config.widgets.forEach(widgetConfig => {
        this.createWidget(widgetConfig.type, widgetConfig.config);
      });
    }

    if (config.groups) {
      config.groups.forEach(group => {
        this.createGroup(group.name, group.widgets);
      });
    }
  }
}

// Глобальный экземпляр
const WidgetManager = new WidgetManager();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = WidgetManager;
}
