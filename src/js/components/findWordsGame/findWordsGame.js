import RenderFindWordsGame from './renderFindWordsGame';
import ActionFindWordsGame from './actionFindWordsGame';

class FindWordsGame {
    constructor() {
        this.renderFindWordsGame = RenderFindWordsGame;
        this.actionFindWordsGame = ActionFindWordsGame;
    }

    initFindWordsGame() {
        this.renderFindWordsGame.closeButtonSetClass();
        this.renderFindWordsGame.renderStartPage();
        this.actionFindWordsGame.startGame();
        this.actionFindWordsGame.clickCard();
        this.actionFindWordsGame.repeatRoundButton();
        this.actionFindWordsGame.changeLevelRound();
        this.actionFindWordsGame.nextRoundButton();
        this.actionFindWordsGame.soundButton();
        this.actionFindWordsGame.userWordsButton();
    }
}

export default new FindWordsGame();
