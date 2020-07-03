import SoundOnImg from '../../../../assets/img/sprint/sound_on.svg';
import SoundOffImg from '../../../../assets/img/sprint/sound_off.svg';
import RepeatImg from '../../../../assets/img/sprint/repeat.svg';
import ReloadImg from '../../../../assets/img/sprint/reload.svg';
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

    this.panelRightMarkup = `
      <div class="game-controls__level">
        <span class="game-controls__title">
          Уровень:
        </span>
        <select class="game-controls__select game-controls__select_level">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
        </select>
      </div>
      <div class="game-controls__round">
        <span class="game-controls__title">
          Раунд:
        </span>
        <select class="game-controls__select game-controls__select_round">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
        </select>
      </div>
      <img class="game-controls__reload" src="${ReloadImg}">
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
      <div class="curtain__game-name"></div>
      <div class="curtain__game-description">${this.gameDescription}</div>
      <button class="button curtain__button curtain__button_start">Начать</button>
    `;

    this.gameGetReadyText = 'Приготовьтесь!';

    this.getReadyMarkup = `
      <div class="curtain__timer timer"></div>
      <div class="curtain__get-ready">${this.gameGetReadyText}</div>
    `;

    this.errorMessageMarkup = `
      <dic class="sprint__error-popup error-popup">
        <div class="error-popup_message">
          Упс! Возникли временные неполадки. Попробуйте, пожалуйста, позже!
        </div>
        <button class="button curtain__button curtain__button_close">Закрыть</button>
      </div>
    `;
  }

  addMainPageContent(parentSelector, level, round) {
    this.parentSelector = parentSelector;
    const parent = document.querySelector(this.parentSelector);
    parent.innerHTML = '';

    const fragment = document.createDocumentFragment();
    this.addElementToFragment(fragment, '', 'sprint__panel_header');
    this.addElementToFragment(fragment, '', 'sprint__panel_main');

    const panelHeader = fragment.querySelector('.sprint__panel_header');
    this.addElementToFragment(panelHeader, '', 'sprint__panel_left');
    this.addElementToFragment(panelHeader, '', 'sprint__panel_right');

    const panelLeft = fragment.querySelector('.sprint__panel_left');
    const panelRight = fragment.querySelector('.sprint__panel_right');
    const panelMain = fragment.querySelector('.sprint__panel_main');

    this.addElementToFragment(panelLeft, this.timerMarkup, 'sprint__timer', 'timer');
    this.addElementToFragment(panelMain, this.counterMarkup, 'sprint__counter', 'counter');
    this.addElementToFragment(panelMain, this.boardMarkup, 'sprint__board', 'board');
    this.addElementToFragment(panelRight, this.panelRightMarkup, 'game-controls', 'sprint__game-controls');

    const soundControlElement = document.createElement('div');
    soundControlElement.classList.add('sprint__sound-control', 'sound-control');
    soundControlElement.innerHTML = this.soundControlMarkup;
    panelRight.append(soundControlElement);

    const levelSelector = panelRight.querySelector('.game-controls__select_level');
    const roundSelector = panelRight.querySelector('.game-controls__select_round');
    levelSelector.value = level;
    roundSelector.value = round;

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

  showErrorMessage(parentSelector) {
    const parent = document.querySelector(parentSelector);
    parent.innerHTML = this.errorMessageMarkup;
  }
}

export default new ContentBuilder();
