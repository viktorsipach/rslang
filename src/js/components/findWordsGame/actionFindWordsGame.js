import RenderFindWordsGame from './renderFindWordsGame';

class ActionFindWordsGame {
    constructor() {
        this.renderFindWordsGame = RenderFindWordsGame;
        this.click = 'click';
        this.stackCard = [];
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
        const delayFirst = 1000;
        const delaySecond = 1100;
        const reset = 0;

        document.querySelector('.find-words').childNodes.forEach((elem) => {
            const el = elem;
            el.style.opacity = 0;
        });

        setTimeout(() => {
            document.querySelector('.find-words').innerHTML = '';
            this.renderFindWordsGame.renderMainPage();
            
            document.querySelectorAll('.card-eng').forEach(( elem) => {
            this.coupleStat[`${elem.dataset.couple}`] = reset;
            });
            this.coupleStat.total = reset;
        }, delayFirst);

        setTimeout(() => {
            document.querySelector('.game-container').classList.remove('hide-game-container');
        }, delaySecond);

    }

    clickCard() {
        document.querySelector('.find-words').addEventListener('mainPageLoad', () => {
            const gameField = document.querySelector('.game-container__game-field');
            const delay = 1000;

            gameField.addEventListener(this.click, (event) => {
                if (!event.target.className.includes('__back')) return;

                event.target.parentElement.classList.remove('rotate');
                this.stackCard.push(event.target.parentElement.dataset.couple);
                this.checkCard(event);

                if (!document.querySelectorAll('.rotate').length) {
                    setTimeout(() => {
                        this.renderFindWordsGame.renderMainPageResult(this.coupleStat);
                    }, delay);
                }
            });
        })
    }

    checkCard(event) {
        const progressStep = 10;
        const radix = 10;
        const increment = 1;
        const twoElements = 2;
        const gameField = document.querySelector('.game-field');
        const progressLine = document.querySelector('.progress__line');
        const progressValue = document.querySelector('.progress__value');

        if (this.stackCard.length < twoElements) return;

        const secondCard = this.stackCard.pop();
        const firstCard = this.stackCard.pop();

        if (firstCard === secondCard) {
            document.querySelector(`.ru-${firstCard}`).classList.add('correct');
            document.querySelector(`.eng-${firstCard}`).classList.add('correct');
            progressLine.style.width = `${parseInt(progressLine.style.width, radix) + progressStep}%`;
            progressValue.textContent = progressLine.style.width;
            this.coupleStat[`${firstCard}`] += increment;
            this.coupleStat.total += increment;

            return;
        }
        if (firstCard !== secondCard) {
            gameField.classList.add('event-none');
            
            this.coupleStat[`${firstCard}`] += increment;
            this.coupleStat.total += increment;

            setTimeout(() => {
                document.querySelector(`.ru-${firstCard}`).classList.add('rotate');
                document.querySelector(`.eng-${firstCard}`).classList.add('rotate');
                event.target.parentElement.classList.add('rotate');
                gameField.classList.remove('event-none');
            }, 1000);
        }
    }

    repeatRoundButton() {
        document.querySelector('.find-words').addEventListener('statLoad', () => {
            const repeatButton = document.querySelector('.statistics__repeat-button');

            repeatButton.addEventListener(this.click, () => {
                this.startRound();
            })
        })
    }
}

export default new ActionFindWordsGame();
