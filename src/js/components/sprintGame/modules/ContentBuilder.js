import SoundOnImg from '../../../../assets/img/sprint/sound_on.svg';
import SoundOffImg from '../../../../assets/img/sprint/sound_off.svg';
import RepeatImg from '../../../../assets/img/sprint/repeat.svg';
import Background from './BackgroundHandler';
import Accordion from '../components/Accordion';

class ContentBuilder {
  constructor() {
    this.boardMarkup = `
      <div class="board__header">
        <div class="board__header_answers-stack stack">
          <span class="stack__element stack__element_1 stack__element_active"></span>
          <span class="stack__element stack__element_2 stack__element_active"></span>
          <span class="stack__element stack__element_3"></span>
          <span class="stack__element stack__element_4"></span>
        </div>
        <div class="board__header_repeat">
          <div class="repeat-button">
            <img class="repeat-button__icon" src="${RepeatImg}">
          </div>
        </div>
      </div>
      <div class="board__body">
        <div class="board__body_image">
        </div>
        <div class="board__body_foreign-word"></div>
        <div class="board__body_translated-word"></div>
      </div>
      <div class="board__control">
      <button class="button board__button board__button_true">Верно</button>
      <button class="button board__button board__button_false">Неверно</button>
      </div>
    `;

    this.soundControlMarkup = `
      <img class="sound-control__icon sound-control__icon_on sound-control__icon_active" src="${SoundOnImg}">
      <img class="sound-control__icon sound-control__icon_off" src="${SoundOffImg}">
    `;

    this.timerMarkup = `
      <span class="timer__value"></span>
    `;

    this.counterMarkup = `
      <span class="counter__value">0</span>
    `;

    this.gameDescription = `
      Выбирай правильный ли указан перевод для загаданного слова с помощью кнопок Верно и Неверно или клавиш Вправо и Влево на клавиатуре.
      Чем больше угаданных ответов подряд, тем больше начисляется очков.
    `;

    this.curtainMarkup = `
      <div class="exit curtain__exit close"></div>
      <div class="curtain__game-name"></div>
      <div class="curtain__game-description">${this.gameDescription}</div>
      <button class="button curtain__button curtain__button_start">Начать</button>
    `;

    this.gameGetReadyText = 'Приготовьтесь!';

    this.getReadyMarkup = `
      <div class="exit curtain__exit close"></div>
      <div class="curtain__timer timer"></div>
      <div class="curtain__get-ready">${this.gameGetReadyText}</div>
    `;
  }

  addMainPageContent(parentSelector) {
    this.parentSelector = parentSelector;
    const parent = document.querySelector(this.parentSelector);
    parent.innerHTML = '';

    const fragment = document.createDocumentFragment();
    this.addElementToFragment(fragment, '', 'sprint__panel_left');
    this.addElementToFragment(fragment, '', 'sprint__panel_main');
    this.addElementToFragment(fragment, '', 'sprint__panel_right');

    const panelLeft = fragment.querySelector('.sprint__panel_left');
    const panelMain = fragment.querySelector('.sprint__panel_main');
    const panelRight = fragment.querySelector('.sprint__panel_right');

    this.addElementToFragment(panelLeft, this.timerMarkup, 'sprint__timer', 'timer');
    this.addElementToFragment(panelMain, this.counterMarkup, 'sprint__counter', 'counter');
    this.addElementToFragment(panelMain, this.boardMarkup, 'sprint__board', 'board');
    this.addElementToFragment(panelRight, '', 'sprint__exit', 'exit', 'close');
    this.addElementToFragment(panelRight, this.soundControlMarkup, 'sprint__sound-control', 'sound-control');

    parent.append(fragment);
  }

  addStartPageContent(parentSelector, gameName) {
    this.parentSelector = parentSelector;
    this.gameName = gameName || 'Спринт';
    const parent = document.querySelector(this.parentSelector);
    const curtain = document.createElement('div');
    curtain.classList.add('sprint__curtain', 'curtain');
    curtain.innerHTML = this.curtainMarkup;
    const gameNameEl = curtain.querySelector('.curtain__game-name');
    gameNameEl.textContent = gameName;
    parent.innerHTML = '';
    parent.append(curtain);
    Background.setBackgroundImage('.sprint__panel');
    return this;
  }

  addGetReadyContent(parentSelector) {
    const parent = document.querySelector(parentSelector);
    parent.innerHTML = this.getReadyMarkup;
    return this;
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

  showCurrentGameStatistics(parentSelector, statisticsElement) {
    const parent = document.querySelector(parentSelector);
    parent.innerHTML = '';
    parent.append(statisticsElement);
    Accordion.init();
    return this;
  }
}

export default new ContentBuilder();
