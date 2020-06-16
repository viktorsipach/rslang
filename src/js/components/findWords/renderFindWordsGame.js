export default class RenderFindWordsGame {
    constructor() {
        this.target = 'page';
    }

    createElement(tag, className, textContent, target = this.target) {
        const elem = document.createElement(tag);
        elem.className = className;
        if (textContent) elem.textContent = textContent;

        document.querySelector(`.${target}`).append(elem);
    }

    renderStartPage() {
        this.createElement('div', 'game-info', '');
        this.createElement('div', 'game-info__title', 'НАЙТИ СЛОВА', 'game-info');
        this.createElement('div', 'game-info__description', '', 'game-info')
        this.createElement('div', 'game-info__description-first','Соберите слово из букв', 'game-info__description');
        this.createElement('div', 'game-info__description-second','Какие то правила', 'game-info__description');
        this.createElement('div', 'game-info__description-third','Еще что-то', 'game-info__description');
        this.createElement('div', 'button start-button', 'НАЧАТЬ', 'game-info');
    }
}