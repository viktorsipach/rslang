import RenderFindWordsGame from './renderFindWordsGame';

export default class ActionFindWordsGame {
    constructor() {
        this.renderFindWordsGame = new RenderFindWordsGame();
        this.page = document.querySelector('.page');
        this.click = 'click';
        this.previous = [];
        this.coupleStat = {};
    }

    startGame() {
        const start = document.querySelector('.game-info__start-button');

        start.addEventListener(this.click, () => {
            document.querySelector('.find-words').classList.remove('start-find-words');
            document.querySelector('.find-words').classList.add('main-find-words');
           this.startRound();
        });
    }

    startRound() {
        document.querySelector('.find-words').firstChild.style.opacity = 0;

        setTimeout(() => {
            document.querySelector('.find-words').innerHTML = '';
            this.renderFindWordsGame.renderMainPage();
            
            document.querySelectorAll('.card-eng').forEach(( elem, i) => {
            this.coupleStat[`couple${i}`] = 0;
            });
            this.coupleStat.total = 0;
        }, 1000);
        setTimeout(() => {
            document.querySelector('.game-container').classList.remove('hide-game-container');
        }, 1100);

    }

    clickCard() {
        this.page.addEventListener('mainPageLoad', () => {
            const gameField = document.querySelector('.game-container__game-field');

            gameField.addEventListener(this.click, (event) => {
                if (!event.target.className.includes('__back')) return;

                event.target.parentElement.classList.remove('rotate');
                this.previous.push(event.target.parentElement.classList[2]);
                this.checkCard(event);

                if (document.querySelectorAll('.rotate').length === 0) {
                    setTimeout(() => {
                        this.renderFindWordsGame.renderMainPageResult(this.coupleStat);
                    }, 1000);
                }
            });
        })
    }

    checkCard(event) {
        const progress = document.querySelector('.progress__line').style.width;
        const progressStep = 10;

        if (this.previous.length < 2) return;

        if (this.previous[0].slice(-1) === this.previous[1].slice(-1)) {
            document.querySelector(`.${this.previous[0]}`).classList.add('correct');
            document.querySelector(`.${this.previous[1]}`).classList.add('correct');

            document.querySelector('.progress__line').style.width = `${parseInt(progress, 10) + progressStep}%`;
            document.querySelector('.progress__value').textContent = document.querySelector('.progress__line').style.width;

            this.coupleStat[`${this.previous[0].slice(-7)}`] += 1;
            this.coupleStat.total += 1;
            
            this.previous.splice(0);
            return;
        }
        if (this.previous[0].slice(-1) !== this.previous[1].slice(-1)) {
            document.querySelector('.game-field').classList.add('event-none');
            
            this.coupleStat[`${this.previous[0].slice(-7)}`] += 1;
            this.coupleStat.total += 1;

            setTimeout(() => {
                document.querySelector(`.${this.previous[0]}`).classList.add('rotate');
                event.target.parentElement.classList.add('rotate');
                document.querySelector('.game-field').classList.remove('event-none');
                this.previous.splice(0);
            }, 1000);
        }
        
    }

    repeatRoundButton() {
        this.page.addEventListener('statLoad', () => {
            const repeatButton = document.querySelector('.statistics__repeat-button');

            repeatButton.addEventListener(this.click, () => {
                this.startRound();
            })
        })
    }
}