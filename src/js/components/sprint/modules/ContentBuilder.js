import SoundImg from '../../../../assets/img/sprint/sound_on.svg';
import RepeatImg from '../../../../assets/img/sprint/repeat.svg';

class ContentBuilder {
  constructor() {
    this.cardMarkup = `
      <div class="sprint__card card">
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
  }

  addContentToPage(parentSelector) {
    this.parentSelector = parentSelector;
    const parent = document.querySelector(this.parentSelector || '.page__sprint');
    parent.innerHTML = '';

    this.addElementToPage(parent, this.sprintMarkup, 'sprint__panel');
    const panelLeft = parent.querySelector('.sprint__panel_left');
    const panelMain = parent.querySelector('.sprint__panel_main');
    const panelRight = parent.querySelector('.sprint__panel_right');

    this.addElementToPage(panelLeft, this.timerMarkup, 'sprint__timer', 'timer');
    this.addElementToPage(panelMain, this.counterMarkup, 'sprint__counter', 'counter');
    this.addElementToPage(panelMain, this.cardMarkup, 'sprint__card', 'card');
    this.addElementToPage(panelRight, '', 'sprint__exit', 'exit');
    this.addElementToPage(panelRight, this.soundControlMarkup, 'sprint__sound-control', 'sound-control');
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
