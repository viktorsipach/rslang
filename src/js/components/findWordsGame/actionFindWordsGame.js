import RenderFindWordsGame from './renderFindWordsGame';
import ErrorSound from '../../../assets/audio/error.mp3';

class ActionFindWordsGame {
    constructor() {
        this.renderFindWordsGame = RenderFindWordsGame;
        this.click = 'click';
        this.stackCard = [];
        this.coupleStat = {};
        this.reset = 0;
        this.soundOn = this.renderFindWordsGame.soundOn;
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

        document.querySelector('.find-words').childNodes.forEach((elem) => {
            const el = elem;
            el.style.opacity = 0;
        });

        setTimeout(() => {
            document.querySelector('.find-words').innerHTML = '';
            this.renderFindWordsGame.renderMainPage();
            
            this.clearStatisticsAndStack();
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
        const delayRotate = 800;

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

            if (this.soundOn) {
                const correctSound = new Audio();
                correctSound.src = `https://raw.githubusercontent.com/allihach/rslang-data/master/${event.target.dataset.audio}`;
                correctSound.play();
            }

            return;
        }
        if (firstCard !== secondCard) {
            gameField.classList.add('event-none');
            
            this.coupleStat[`${firstCard}`] += increment;
            this.coupleStat.total += increment;

            if (this.soundOn) {
                const errorSound = new Audio();
                errorSound.src = ErrorSound;
                errorSound.play();
            }

            setTimeout(() => {
                document.querySelector(`.ru-${firstCard}`).classList.add('rotate');
                document.querySelector(`.eng-${firstCard}`).classList.add('rotate');
                event.target.parentElement.classList.add('rotate');
                gameField.classList.remove('event-none');
            }, delayRotate);
        }
    }

    changeLevelRound() {
        document.querySelector('.find-words').addEventListener('mainPageLoad', () => {
            const level = document.querySelector('.level-select');
            const round = document.querySelector('.page-select');

            level.addEventListener('change', () => {
                this.progressReset();
                this.changeCards();
            });

            round.addEventListener('change', () => {
                this.progressReset();
                this.changeCards();
            });
        })
    }

    progressReset() {
        const progressLine = document.querySelector('.progress__line');
        const progressValue = document.querySelector('.progress__value');

        progressLine.style.width = this.reset;
        progressValue.textContent = '';
    }

    changeCards() {
        const cards = document.querySelector('.game-field').childNodes;
        const gameField = document.querySelector('.game-field');

        cards.forEach((elem) => {
            const card = elem;
            card.firstChild.textContent = '';
            card.classList.remove('visible');
        });
        setTimeout(() => {
            gameField.innerHTML = '';
            this.renderFindWordsGame.renderMainPageGameField();
            this.renderFindWordsGame.renderMainPageWords();
        }, 500);
    }

    repeatRoundButton() {
        document.querySelector('.find-words').addEventListener('statLoad', () => {
            const repeatButton = document.querySelector('.statistics__repeat-button');
            const statistics = document.querySelector('.statistics');

            repeatButton.addEventListener(this.click, () => {
                statistics.remove();
                this.progressReset();
                this.clearStatisticsAndStack();
                this.changeCards();
            })
        })
    }

    nextRoundButton() {
        document.querySelector('.find-words').addEventListener('statLoad', () => {
            const nextButton = document.querySelector('.statistics__next-button');
            const statistics = document.querySelector('.statistics');
            const base = 10;
            const level = parseInt(document.querySelector('.level-select').value, base);
            const round = parseInt(document.querySelector('.page-select').value, base);
            const increment = 1;
            const startValue = 1;

            nextButton.addEventListener(this.click, () => {
                statistics.remove();
                this.progressReset();
                this.clearStatisticsAndStack();
                if (round === 60) {
                    document.querySelector('.level-select').value = level + increment;
                    document.querySelector('.page-select').value = startValue;
                } else {
                    document.querySelector('.page-select').value = round + increment;
                }
                this.changeCards();
            });
        })
    }

    clearStatisticsAndStack() {
        document.querySelectorAll('.card-eng').forEach(( elem) => {
            this.coupleStat[`${elem.dataset.couple}`] = this.reset;
        });
        this.coupleStat.total = this.reset;

        this.stackCard = [];
    }

    soundButton() {
        document.querySelector('.find-words').addEventListener('mainPageLoad', () => {
            const soundButton = document.querySelector('.sound__toggle-cont');
            const toggle = document.querySelector('.sound__toggle');

            soundButton.addEventListener(this.click, () => {
                if (this.soundOn) {
                    toggle.classList.remove('on');
                    this.soundOn = false;
                    return;
                } 
                if (!this.soundOn) {
                    toggle.classList.add('on');
                    this.soundOn = true;
                }
            })
        })
    }
}

export default new ActionFindWordsGame();
