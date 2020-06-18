import SoundImg from '../../../../assets/img/sprint/sound_on.svg';
import RepeatImg from '../../../../assets/img/sprint/repeat.svg';

class ContentBuilder {
  constructor() {
    this.cardMarkup = `
      <div class="card__header">
        <div class="card__header_answers-stack stack">
          <span class="stack__element stack__element_1 stack__element_active"></span>
          <span class="stack__element stack__element_2 stack__element_active"></span>
          <span class="stack__element stack__element_3"></span>
        </div>
        <div class="card__header_repeat">
        <object type="image/svg+xml" data="${RepeatImg}">
          Repeat
        </object>
        </div>
      </div>
      <div class="card__body">
        <div class="card__body_image">
        </div>
        <div class="card__body_foreign-word">Bland</div>
        <div class="card__body_translated-word">пресный</div>
      </div>
      <div class="card__control">
        <button class="button card__button card__button_false">Неверно</button>
        <button class="button card__button card__button_true">Верно</button>
      </div>
    `;

    this.sprintMarkup = `
      <section class="sprint__panel_left"></section>
      <section class="sprint__panel_main"></section>
      <section class="sprint__panel_right"></section>
    `;

    this.soundControlMarkup = `
      <object type="image/svg+xml" data="${SoundImg}">
        Sound
      </object>
    `;

    this.timerMarkup = `
      <span class="timer__value">57</span>
    `;

    this.counterMarkup = `
      <span class="counter__value">0</span>
    `;

    this.gameDescription = `
      Выбирай правильный ли указан перевод для загаданного слова с помощью кнопок Верно и Неверно или клавиш Вправо и Влево на клавиатуре.
      Чем больше угаданных ответов подряд, тем больше начисляется очков.
    `;

    this.curtainMarkup = `
      <div class="exit curtain__exit"></div>
      <div class="curtain__game-name"></div>
      <div class="curtain__game-description">${this.gameDescription}</div>
      <button class="button curtain__button">Начать</button>
    `;
  }

  addMainPageContent(parentSelector) {
    this.parentSelector = parentSelector;
    const parent = document.querySelector(this.parentSelector || '.page__sprint');
    parent.innerHTML = '';

    const fragment = document.createDocumentFragment();

    this.addElementToFragment(fragment, this.sprintMarkup, 'sprint__panel');
    const panelLeft = fragment.querySelector('.sprint__panel_left');
    const panelMain = fragment.querySelector('.sprint__panel_main');
    const panelRight = fragment.querySelector('.sprint__panel_right');

    this.addElementToFragment(panelLeft, this.timerMarkup, 'sprint__timer', 'timer');
    this.addElementToFragment(panelMain, this.counterMarkup, 'sprint__counter', 'counter');
    this.addElementToFragment(panelMain, this.cardMarkup, 'sprint__card', 'card');
    this.addElementToFragment(panelRight, '', 'sprint__exit', 'exit');
    this.addElementToFragment(panelRight, this.soundControlMarkup, 'sprint__sound-control', 'sound-control');

    parent.append(fragment);
  }

  addElementToFragment(parent, markup, ...classes) {
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

  addStartPageContent(parentSelector, gameName) {
    this.gameName = gameName || 'Спринт';
    const parent = document.querySelector(parentSelector || '.page__sprint');
    const curtain = document.createElement('div');
    curtain.classList.add('sprint__curtain', 'curtain');
    curtain.innerHTML = this.curtainMarkup;
    const gameNameEl = curtain.querySelector('.curtain__game-name');
    gameNameEl.textContent = gameName;
    parent.innerHTML = '';
    parent.append(curtain);
    return this;
  }
}

export default new ContentBuilder();
