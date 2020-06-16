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
        this.createElement('div', 'game-info__description description', '', 'game-info')
        this.createElement('div', 'description__first','Соберите слово из букв', 'game-info__description');
        this.createElement('div', 'description__second','Какие то правила', 'game-info__description');
        this.createElement('div', 'description__third','Еще что-то', 'game-info__description');
        this.createElement('div', 'button game-info__start-button', 'НАЧАТЬ', 'game-info');
    }
}