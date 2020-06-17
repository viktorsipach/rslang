import RenderFindWordsGame from './renderFindWordsGame';

export default class ActionFindWordsGame {
    constructor() {
        this.renderFindWordsGame = new RenderFindWordsGame();
        this.page = document.querySelector('.page');
    }

    startGame() {
        const start = document.querySelector('.game-info__start-button');

        start.addEventListener('click', () => {
            this.page.innerHTML = '';
            this.renderFindWordsGame.renderMainPage();
        });
    }
}