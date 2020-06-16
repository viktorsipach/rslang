class ContentBuilder {
  constructor() {
    this.cardMarkup = `

    `;
  }

  addContentToPage(parentSelector) {
    this.parentSelector = parentSelector;
    const parent = document.querySelector(this.parentSelector || '.page__sprint');
    ContentBuilder.addTimerToPage(parent);
    ContentBuilder.addExitButtonToPage(parent);
  }

  static addTimerToPage(parent) {
    const timer = document.createElement('div');
    timer.classList.add('sprint__timer');
    parent.append(timer);
  }

  static addExitButtonToPage(parent) {
    const exitButton = document.createElement('div');
    exitButton.classList.add('sprint__exit');
    parent.append(exitButton);
  }

  static addCardToPage(parent) {
    const card = document.createElement('div');
    card.classList.add('sprint__card', 'card');
    card.innerHTML = this.cardMarkup;
    parent.append(card);
  }
}

export default new ContentBuilder();
