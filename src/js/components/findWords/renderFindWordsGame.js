import Image from '../../../assets/img/icon-audio.png';

export default class RenderFindWordsGame {
    constructor() {
        this.target = 'page';
    }

    createElement(tag, className, textContent, target = this.target, index = 0) {
        const elem = document.createElement(tag);
        elem.className = className;
        if (textContent) elem.textContent = textContent;

        document.querySelectorAll(`.${target}`)[index].append(elem);
    }

    renderStartPage() {
        this.createElement('div', 'game-info', '');
        this.createElement('div', 'game-info__title', 'НАЙДИ СЛОВА', 'game-info');
        this.createElement('div', 'game-info__description description', '', 'game-info')
        this.createElement('div', 'description__first','Кликай по карточкам и запоминай', 'game-info__description');
        this.createElement('div', 'description__second','Находи пару: слово и перевод', 'game-info__description');
        this.createElement('div', 'description__third','Открой все карточки', 'game-info__description');
        this.createElement('div', 'button game-info__start-button', 'НАЧАТЬ', 'game-info');
    }

    renderMainPage() {
        this.createElement('div', 'game-container', '');
        this.createElement('div', 'game-container__controls controls', '', 'game-container');
        this.createElement('div', 'game-container__game-field game-field', '', 'game-container');

        this.renderMainPageControls();
        this.renderMainPageGameField();
    }

    renderMainPageControls() {
        this.createElement('div', 'controls__level level', '', 'game-container__controls');
        this.createElement('div', 'level__head', 'Level', 'controls__level');
        this.createElement('select', 'select level__select level-select', '', 'controls__level');
        for (let i = 1; i < 7; i += 1 ) {
            this.createElement('option', 'level-select__item', i, 'level-select')
        }

        this.createElement('div', 'controls__page _page', '', 'game-container__controls');
        this.createElement('div', 'page__head', 'Page', 'controls__page');
        this.createElement('select', 'select page__select page-select', '', 'controls__page');
        for (let i = 1; i < 61; i += 1 ) {
            this.createElement('option', 'page-select__item', i, 'page-select')
        }

        this.createElement('div', 'controls__repeat repeat', '', 'game-container__controls');
        this.createElement('div', 'repeat__head', 'Repeat', 'controls__repeat');
        this.createElement('div', 'button repeat__icon', '', 'controls__repeat');
        document.querySelector('.repeat__icon').style.backgroundImage = `url(${Image})`;
    }

    renderMainPageGameField() {
        const event = new Event('gameFieldLoad');

        for (let i = 0; i < 10; i += 1) {
            this.createElement('div', `game-field__card-eng card-eng eng-couple${i}`, '', 'game-field');
            this.createElement('div', 'card-eng__front', 'Word', 'game-field__card-eng', i);
            this.createElement('div', 'card-eng__back', '', 'game-field__card-eng', i);

            this.createElement('div', `game-field__card-ru card-ru ru-couple${i}`, '', 'game-field');
            this.createElement('div', 'card-ru__front', 'Слово', 'game-field__card-ru', i);
            this.createElement('div', 'card-ru__back', '', 'game-field__card-ru', i);
        }

        const shuffle = (element, target) => {
            document.querySelectorAll(`.${element}`).forEach((e) => {
                if (Math.random() > 0.5) {
                    document.querySelector(`.${target}`).append(e);
                }
                if (Math.random() < 0.5) {
                    document.querySelector(`.${target}`).prepend(e);
                }
            });
        }
        shuffle('card-eng', 'game-field');
        shuffle('card-ru', 'game-field');
        document.querySelector('.page').dispatchEvent(event);
    }
}