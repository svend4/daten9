/**
 * Module Loader - система для динамической загрузки и управления модулями/виджетами
 * Позволяет добавлять, удалять и управлять модульными блоками на странице
 */

class ModuleLoader {
  constructor() {
    this.modules = new Map();
    this.loadedModules = new Set();
    this.hooks = {
      beforeLoad: [],
      afterLoad: [],
      beforeUnload: [],
      afterUnload: []
    };
  }

  /**
   * Регистрирует новый модуль
   */
  register(moduleName, config) {
    this.modules.set(moduleName, {
      name: moduleName,
      template: config.template || '',
      styles: config.styles || [],
      scripts: config.scripts || [],
      data: config.data || {},
      init: config.init || function() {},
      destroy: config.destroy || function() {}
    });
  }

  /**
   * Загружает модуль на страницу
   */
  async load(moduleName, targetSelector, data = {}) {
    const module = this.modules.get(moduleName);
    if (!module) {
      console.error(`Module "${moduleName}" not found`);
      return false;
    }

    // Выполнить хуки перед загрузкой
    await this.executeHooks('beforeLoad', { moduleName, data });

    try {
      const target = document.querySelector(targetSelector);
      if (!target) {
        console.error(`Target element "${targetSelector}" not found`);
        return false;
      }

      // Загрузить стили модуля
      await this.loadStyles(module.styles);

      // Загрузить скрипты модуля
      await this.loadScripts(module.scripts);

      // Отрендерить шаблон
      const mergedData = { ...module.data, ...data };
      const rendered = templateEngine.render(module.template, mergedData);

      // Вставить в DOM
      const container = document.createElement('div');
      container.classList.add('module-container');
      container.dataset.module = moduleName;
      container.innerHTML = rendered;
      target.appendChild(container);

      // Инициализировать модуль
      if (typeof module.init === 'function') {
        module.init(container, mergedData);
      }

      this.loadedModules.add(moduleName);

      // Выполнить хуки после загрузки
      await this.executeHooks('afterLoad', { moduleName, element: container });

      return true;
    } catch (error) {
      console.error(`Error loading module "${moduleName}":`, error);
      return false;
    }
  }

  /**
   * Удаляет модуль со страницы
   */
  async unload(moduleName) {
    const module = this.modules.get(moduleName);
    if (!module) return false;

    await this.executeHooks('beforeUnload', { moduleName });

    const elements = document.querySelectorAll(`[data-module="${moduleName}"]`);
    elements.forEach(element => {
      if (typeof module.destroy === 'function') {
        module.destroy(element);
      }
      element.remove();
    });

    this.loadedModules.delete(moduleName);

    await this.executeHooks('afterUnload', { moduleName });

    return true;
  }

  /**
   * Загружает CSS стили
   */
  async loadStyles(styleUrls) {
    const promises = styleUrls.map(url => {
      return new Promise((resolve, reject) => {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = url;
        link.onload = resolve;
        link.onerror = reject;
        document.head.appendChild(link);
      });
    });
    return Promise.all(promises);
  }

  /**
   * Загружает JavaScript скрипты
   */
  async loadScripts(scriptUrls) {
    const promises = scriptUrls.map(url => {
      return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = url;
        script.onload = resolve;
        script.onerror = reject;
        document.body.appendChild(script);
      });
    });
    return Promise.all(promises);
  }

  /**
   * Добавляет хук
   */
  addHook(hookName, callback) {
    if (this.hooks[hookName]) {
      this.hooks[hookName].push(callback);
    }
  }

  /**
   * Выполняет хуки
   */
  async executeHooks(hookName, data) {
    const hooks = this.hooks[hookName] || [];
    for (const hook of hooks) {
      await hook(data);
    }
  }

  /**
   * Проверяет, загружен ли модуль
   */
  isLoaded(moduleName) {
    return this.loadedModules.has(moduleName);
  }

  /**
   * Возвращает список загруженных модулей
   */
  getLoadedModules() {
    return Array.from(this.loadedModules);
  }
}

// Глобальный экземпляр
const moduleLoader = new ModuleLoader();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = ModuleLoader;
}
