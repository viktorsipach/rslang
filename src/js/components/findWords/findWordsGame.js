import RenderFindWordsGame from './renderFindWordsGame';

export default class FindWordsGame {
    constructor() {
        this.renderFindWordsGame = new RenderFindWordsGame();
    }

    initFindWordsGame() {
        this.renderFindWordsGame.renderStartPage();
    }
}