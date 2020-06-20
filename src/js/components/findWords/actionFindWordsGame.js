import RenderFindWordsGame from './renderFindWordsGame';

export default class ActionFindWordsGame {
    constructor() {
        this.renderFindWordsGame = new RenderFindWordsGame();
        this.page = document.querySelector('.page');
        this.click = 'click';
        this.previous = [];
    }

    startGame() {
        const start = document.querySelector('.game-info__start-button');

        start.addEventListener(this.click, () => {
            this.page.innerHTML = '';
            this.renderFindWordsGame.renderMainPage();
        });
    }

    clickCard() {
        this.page.addEventListener('gameFieldLoad', () => {
            const gameField = document.querySelector('.game-container__game-field');

            gameField.addEventListener(this.click, (event) => {
                if (!event.target.className.includes('__back')) return;

                event.target.parentElement.classList.remove('rotate');
                this.previous.push(event.target.parentElement.classList[2]);
                this.checkCard(event);
                if (document.querySelectorAll('.rotate').length === 0) {
                    this.renderFindWordsGame.renderMainPageResult();
                }
            });
        })
    }

    checkCard(event) {
        if (this.previous.length < 2) return;

        if (this.previous[0].slice(-1) === this.previous[1].slice(-1)) {
            document.querySelector(`.${this.previous[0]}`).classList.add('scale');
            document.querySelector(`.${this.previous[1]}`).classList.add('scale');
            this.previous.splice(0);
            return;
        }
        if (this.previous[0].slice(-1) !== this.previous[1].slice(-1)) {
            document.querySelector('.game-field').classList.add('event-none');
            setTimeout(() => {
                document.querySelector(`.${this.previous[0]}`).classList.add('rotate');
                event.target.parentElement.classList.add('rotate');
                document.querySelector('.game-field').classList.remove('event-none');
                this.previous.splice(0);
            }, 1000);
        }
        
    }
}