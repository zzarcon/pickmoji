const contentClassName = 'js-emoji-content';
const categories = {
  people: ['💭', '👣', '💬', '👥', '👤', '💎', '💍', '💋', '💌', '💘', '💞', '💖', '💕', '💓', '💗', '💔', '❤', '️💚', '💜', '💙', '💛', '💄', '🌂', '🎀', '👓', '👛', '👝', '👜', '💼', '👙', '👘', '👖', '🎽'],
  animals: [],
  food: [],
  sports: [],
  travel: [],
  objects: [],
  symbols: [],
  flags: []
};

module.exports = class Pickmoji {
  constructor(userOptions) {
    const defaultOptions = {
      initialCategory: Object.keys(this.categories)[0]
    };
    const options = Object.assign({}, defaultOptions, userOptions);

    this.isContentVisible = false;
    this.toggleElement = null;
    this.containerElement = null;
    this.initialCategory = options.initialCategory;
  }

  //
  // Public API
  //
  
  attachTo(selector) {
    const containerElement = document.querySelector(selector);
    const toggleElement = document.createElement('button');

    toggleElement.classList.add('js-toggle-emojis', 'pm-toggle-emojis');
    containerElement.classList.add('pickmoji');
    containerElement.appendChild(toggleElement);

    this.containerElement = containerElement;
    this.toggleElement = toggleElement;
    this.addEvents();
  }

  show() {
    if (this.isContentVisible) return;
    
    this.renderContent();  
  }

  hide() {
    if (!this.isContentVisible) return;
    
    this.containerElement.querySelector(`.${contentClassName}`).remove();
  }

  get categories() {
    return categories;
  }

  get activeCategory() {
    return this.initialCategory;
  }

  get activeCategoryEmojis() {
    return this.categories[this.activeCategory];
  }
  //
  //Private
  //
  
  addEvents() {
    this.toggleElement.addEventListener('click', this.onToggleContent.bind(this));
  }

  onToggleContent() {
    if (this.isContentVisible) {
      this.hide();

      return;
    } 

    this.show();
  }

  renderContent() {
    const contentElement = document.createElement('div');
    const categoriesHtml = Object.keys(this.categories)
                            .map(this.createCategoryHeader)
                            .join('');
    const currentCategoryHtml = this.createCategoryContent(this.initialCategory);

    //TODO: Avoid re-generating 'content' if possible
    contentElement.innerHTML = `
      <ul class="js-categories-header">${categoriesHtml}</ul>
      <ul class="js-categories-content">${currentCategoryHtml}</ul>
    `;
    contentElement.classList.add(contentClassName);
    this.containerElement.appendChild(contentElement);
  }

  createCategoryHeader(category) {
    return `
      <li class="js-category"></li>
    `;
  }

  createCategoryContent(categoryName) {
    const emojis = this.categories[categoryName];
    const categoryContent = emojis.map(emoji => {
      return `<li>${emoji}</li>`;
    });

    return `
      <li class="js-active-category" data-category-name="${categoryName}">
        <ul>${categoryContent}</ul>
      </li>
    `;
  }

}