import {getRoundData} from '../../API/dataAPI';

export default class RenderFindWordsGame {
    constructor() {
        this.target = 'page';
        this.getWords = getRoundData;
        this.words = [];
    }

    createElement(tag, className, textContent, target = this.target, index = 0) {
        const elem = document.createElement(tag);
        elem.className = className;
        if (textContent) elem.textContent = textContent;

        document.querySelectorAll(`.${target}`)[index].append(elem);
    }

    renderStartPage() {
        this.createElement('div', 'find-words start-find-words','');
        this.createElement('div', 'game-info', '', 'find-words');
        this.createElement('div', 'find-words__exit', '', 'find-words');
        this.createElement('div', 'game-info__title', 'НАЙДИ СЛОВА', 'game-info');
        this.createElement('div', 'game-info__description description', '', 'game-info')
        this.createElement('div', 'description__first','Кликай по карточкам и запоминай', 'game-info__description');
        this.createElement('div', 'description__second','Находи пару: слово и перевод', 'game-info__description');
        this.createElement('div', 'description__third','Открой все карточки', 'game-info__description');
        this.createElement('div', 'button game-info__start-button', 'НАЧАТЬ', 'game-info');
    }

    renderMainPage() {
        const event = new Event('mainPageLoad');

        this.createElement('div', 'game-container hide-game-container', '', 'find-words');
        this.createElement('div', 'find-words__exit', '', 'find-words');
        this.createElement('div', 'find-words__title', 'НАЙДИ СЛОВА', 'find-words');
        this.createElement('div', 'game-container__controls controls', '', 'game-container');
        this.createElement('div', 'game-container__progress-bar progress-bar', '', 'game-container');
        this.createElement('div', 'game-container__game-field game-field', '', 'game-container');

        this.renderMainPageControls();
        this.renderMainPageProgressBar();
        this.renderMainPageGameField();
        this.renderMainPageWords();

        document.querySelector('.page').dispatchEvent(event);
    }

    renderMainPageControls() {
        this.createElement('div', 'controls__level level', '', 'controls');
        this.createElement('div', 'level__head', 'Уровень', 'controls__level');
        this.createElement('select', 'select level__select level-select', '', 'controls__level');
        for (let i = 1; i < 7; i += 1 ) {
            this.createElement('option', 'level-select__item', i, 'level-select')
        }

        this.createElement('div', 'controls__page _page', '', 'controls');
        this.createElement('div', 'page__head', 'Раунд', 'controls__page');
        this.createElement('select', 'select page__select page-select', '', 'controls__page');
        for (let i = 1; i < 61; i += 1 ) {
            this.createElement('option', 'page-select__item', i, 'page-select')
        }
    }

    renderMainPageProgressBar() {
        this.createElement('div', 'progress-bar__progress progress', '', 'progress-bar');
        this.createElement('div', 'progress__line', '', 'progress');
        document.querySelector('.progress__line').style.width = '0%';
        this.createElement('div', 'progress__value', '', 'progress');
    }

    renderMainPageGameField() {
        for (let i = 0; i < 10; i += 1) {
            this.createElement('div', `game-field__card-eng card-eng eng-couple${i}`, '', 'game-field');
            this.createElement('div', 'card-eng__front', '', 'game-field__card-eng', i);
            this.createElement('div', 'card-eng__back', '', 'game-field__card-eng', i);
            document.querySelector(`.eng-couple${i}`).setAttribute('data-couple', `couple${i}`);

            this.createElement('div', `game-field__card-ru card-ru ru-couple${i}`, '', 'game-field');
            this.createElement('div', 'card-ru__front', '', 'game-field__card-ru', i);
            this.createElement('div', 'card-ru__back', '', 'game-field__card-ru', i);
            document.querySelector(`.ru-couple${i}`).setAttribute('data-couple', `couple${i}`);
        }

        const shuffle = (element, target) => {
            document.querySelectorAll(`.${element}`).forEach((e) => {
                if (Math.random() > 0.5) {
                    document.querySelector(`.${target}`).append(e);
                }
                if (Math.random() < 0.5) {
                    document.querySelector(`.${target}`).prepend(e);
                }
            });
        }
        shuffle('card-eng', 'game-field');
        shuffle('card-ru', 'game-field');
    }

    async renderMainPageWords() {
        const level = 1;
        const round = 1;
        const wordsPerRound = 10;
        const delayField = 1000;
        const delayCards = 20;
        const data = await this.getWords(level, round, wordsPerRound);

        data.forEach((elem) => {
            this.words.push(`${elem.word} - ${elem.wordTranslate}`);
        })

        data.forEach((elem, i) => {
            document.querySelector(`.eng-couple${i}`).firstElementChild.textContent = `${elem.word}`;
            document.querySelector(`.ru-couple${i}`).firstElementChild.textContent = `${elem.wordTranslate}`;
        })

        const cardArr = document.querySelector('.game-field').children;
        for(let i = 0; i < cardArr.length; i += 1) {
            setTimeout(() => {
                setTimeout(() => {
                    cardArr[i].classList.add('rotate');
                   }, i * delayCards);
            }, delayField);
        }

        document.querySelectorAll('.card-ru').forEach((elem) => {
            elem.classList.add('visible');
        });
        document.querySelectorAll('.card-eng').forEach((elem) => {
            elem.classList.add('visible');
        });
    }

    renderMainPageResult(stat) {
        const event = new Event('statLoad');
        const cards = document.querySelectorAll('.card-eng__front');

        this.createElement('div', 'statistics', '', 'find-words');
        this.createElement('div', 'statistics__modal', '', 'statistics');
        this.createElement('div', `statistics__header`, 'Статистика Раунда', 'statistics__modal');
        this.createElement('div', `statistics__subheader`, '', 'statistics__modal');
        this.createElement('div', `statistics__left-column`, 'Слово', 'statistics__subheader');
        this.createElement('div', `statistics__right-column`, 'Кол-во попыток', 'statistics__subheader');
        this.createElement('div', 'statistics__data', '', 'statistics__modal');

        for (let i = 0; i < cards.length; i += 1) {
            this.createElement('div', `statistics__row row-stat`, '', 'statistics__data');
            this.createElement('div', 'row-stat__word', `${this.words[i]}`, 'row-stat', i);
            this.createElement('div', 'row-stat__attempt', `${stat[`couple${i}`]}`, 'row-stat', i);
        }

        document.querySelectorAll('.row-stat').forEach((elem) => {
            const row = elem;
            row.style.order = elem.lastElementChild.textContent;
        })

        this.createElement('div', 'statistics__total', `Всего ходов: ${stat.total}`, 'statistics__modal');

        this.createElement('div', 'statistics__controls', '', 'statistics__modal');
        this.createElement('div', 'button statistics__repeat-button', 'Повторить раунд', 'statistics__controls');
        this.createElement('div', 'button statistics__next-button', 'Следующий раунд', 'statistics__controls');

        document.querySelector('.page').dispatchEvent(event);
    }
}