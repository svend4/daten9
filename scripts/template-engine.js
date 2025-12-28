/**
 * Template Engine - движок для работы с шаблонами и заглушками
 * Поддерживает динамическую замену {{placeholder}} на реальные данные
 */

class TemplateEngine {
  constructor() {
    this.templates = new Map();
    this.cache = new Map();
  }

  /**
   * Загружает шаблон из файла или строки
   */
  async loadTemplate(name, source) {
    if (typeof source === 'string' && source.startsWith('http')) {
      const response = await fetch(source);
      const template = await response.text();
      this.templates.set(name, template);
      return template;
    }
    this.templates.set(name, source);
    return source;
  }

  /**
   * Рендерит шаблон с данными
   * @param {string} template - Шаблон с заглушками {{placeholder}}
   * @param {object} data - Данные для замены
   * @returns {string} - Отрендеренный HTML
   */
  render(template, data = {}) {
    let result = template;

    // Замена простых заглушек {{key}}
    Object.keys(data).forEach(key => {
      const regex = new RegExp(`{{${key}}}`, 'g');
      result = result.replace(regex, data[key] || '');
    });

    // Обработка условий {{#if condition}}...{{/if}}
    result = this.processConditionals(result, data);

    // Обработка циклов {{#each items}}...{{/each}}
    result = this.processLoops(result, data);

    return result;
  }

  /**
   * Обработка условных конструкций
   */
  processConditionals(template, data) {
    const ifRegex = /{{#if\s+(\w+)}}([\s\S]*?){{\/if}}/g;
    return template.replace(ifRegex, (match, condition, content) => {
      return data[condition] ? content : '';
    });
  }

  /**
   * Обработка циклов
   */
  processLoops(template, data) {
    const eachRegex = /{{#each\s+(\w+)}}([\s\S]*?){{\/each}}/g;
    return template.replace(eachRegex, (match, arrayName, itemTemplate) => {
      const array = data[arrayName];
      if (!Array.isArray(array)) return '';

      return array.map(item => {
        let result = itemTemplate;
        Object.keys(item).forEach(key => {
          const regex = new RegExp(`{{${key}}}`, 'g');
          result = result.replace(regex, item[key] || '');
        });
        return result;
      }).join('');
    });
  }

  /**
   * Рендерит именованный шаблон
   */
  renderTemplate(name, data = {}) {
    const template = this.templates.get(name);
    if (!template) {
      console.error(`Template "${name}" not found`);
      return '';
    }
    return this.render(template, data);
  }

  /**
   * Компилирует шаблон в функцию для быстрого рендеринга
   */
  compile(template) {
    const cacheKey = template;
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    const compiled = (data) => this.render(template, data);
    this.cache.set(cacheKey, compiled);
    return compiled;
  }
}

// Глобальный экземпляр
const templateEngine = new TemplateEngine();

// Экспорт для использования в модулях
if (typeof module !== 'undefined' && module.exports) {
  module.exports = TemplateEngine;
}
