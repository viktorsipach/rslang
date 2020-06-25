import RenderFindWordsGame from './renderFindWordsGame';
import ActionFindWordsGame from './actionFindWordsGame';

export default class FindWordsGame {
    constructor() {
        this.renderFindWordsGame = new RenderFindWordsGame();
        this.actionFindWordsGame = new ActionFindWordsGame();
    }

    initFindWordsGame() {
        this.renderFindWordsGame.renderStartPage();
        this.actionFindWordsGame.startGame();
        this.actionFindWordsGame.clickCard();
        this.actionFindWordsGame.repeatRoundButton();
    }
}