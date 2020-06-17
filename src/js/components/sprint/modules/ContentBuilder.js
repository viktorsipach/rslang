class ContentBuilder {
  constructor() {
    this.cardMarkup = `
      <div class="sprint__card card">
        <div class="card__header">
          <div class="card__header_info">
          </div>
          <div class="card__header_sound">
          </div>
        </div>
        <div class="card__body">
          <div class="card__body_image">
          </div>
          <div class="card__body_foreign-word"></div>
          <div class="card__body_translated-word"></div>
        </div>
        <div class="card__control">
          <button class="card__button card__button_false"></button>
          <button class="card__button card__button_true"></button>
        </div>
      </div>
    `;
  }

  addContentToPage(parentSelector) {
    this.parentSelector = parentSelector;
    const parent = document.querySelector(this.parentSelector || '.page__sprint');
    parent.innerHTML = '';
    this.addElementToPage(parent, '', 'sprint__timer');
    this.addElementToPage(parent, '', 'sprint__exit');
    this.addElementToPage(parent, '', 'sprint__sound-control');
    this.addElementToPage(parent, '', 'sprint__counter');
    this.addElementToPage(parent, this.cardMarkup, 'sprint__card', 'card');
  }

  addElementToPage(parent, markup, ...classes) {
    const element = document.createElement('div');
    const [class1, class2] = classes;
    if (class1) {
      if (class2) {
        element.classList.add(class1, class2);
      } else {
        element.classList.add(class1);
      }
    }
    if (markup) {
      element.innerHTML = markup;
    }
    parent.append(element);
    return this;
  }
}

export default new ContentBuilder();
