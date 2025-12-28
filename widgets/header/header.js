// Конфигурация виджета Header
const headerWidget = {
  name: 'header',
  template: `<!-- Загружается из header.html -->`,

  defaultData: {
    title: 'Мой сайт',
    logo: '',
    showNav: true,
    showSearch: false,
    showActions: false,
    searchPlaceholder: 'Поиск...',
    navItems: [
      { url: '#', label: 'Главная' },
      { url: '#', label: 'О нас' },
      { url: '#', label: 'Контакты' }
    ],
    actions: ''
  },

  init: function(element, data) {
    console.log('Header widget initialized', data);

    // Обработка поиска
    const searchInput = element.querySelector('.search-input');
    const searchButton = element.querySelector('.search-button');

    if (searchButton) {
      searchButton.addEventListener('click', () => {
        const query = searchInput.value;
        console.log('Search query:', query);
        // Здесь можно добавить логику поиска
      });
    }
  },

  destroy: function(element) {
    console.log('Header widget destroyed');
  }
};

// Регистрация виджета
if (typeof moduleLoader !== 'undefined') {
  moduleLoader.register('header', headerWidget);
}
