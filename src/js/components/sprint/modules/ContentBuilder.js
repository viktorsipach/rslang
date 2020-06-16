const cardMarkup = `
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

class ContentBuilder {
  addContentToPage(parentSelector) {
    this.parentSelector = parentSelector;
    const parent = document.querySelector(this.parentSelector || '.page__sprint');
    parent.innerHTML = '';
    ContentBuilder.addTimerToPage(parent);
    ContentBuilder.addExitButtonToPage(parent);
    ContentBuilder.addSoundControlToPage(parent);
    ContentBuilder.addCounterToPage(parent);
    ContentBuilder.addCardToPage(parent);
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
    card.innerHTML = cardMarkup;
    parent.append(card);
  }

  static addCounterToPage(parent) {
    const counter = document.createElement('div');
    counter.classList.add('sprint__counter');
    parent.append(counter);
  }

  static addSoundControlToPage(parent) {
    const soundControl = document.createElement('div');
    soundControl.classList.add('sprint__sound-control');
    parent.append(soundControl);
  }
}

export default new ContentBuilder();
