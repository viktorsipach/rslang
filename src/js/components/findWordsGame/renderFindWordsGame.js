import {getRoundData} from '../../API/dataAPI';
import StatisticsAPI from '../../API/statisticsAPI';
import UserSettingsMiniGame from '../../API/userSettingsMiniGameAPI';
import getFilteredUserWords from '../../API/userAggregatedWordsAPI';

class RenderFindWordsGame {
    constructor() {
        this.target = 'page';
        this.getWords = getRoundData;
        this.words = [];
        this.delayField = 1000;
        this.delayCards = 20;
        this.middle = 0.5;
        this.soundOn = true;
        this.userWordsOn = true;
        this.one = 1;
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
        this.createElement('div', 'find-words__exit close', '', 'find-words');
        this.createElement('div', 'game-info__title', 'НАЙДИ СЛОВА', 'game-info');
        this.createElement('div', 'game-info__description description', '', 'game-info')
        this.createElement('div', 'description__first','Кликай по карточкам и запоминай', 'game-info__description');
        this.createElement('div', 'description__second','Находи пару: слово и перевод', 'game-info__description');
        this.createElement('div', 'description__third','Открой все карточки', 'game-info__description');
        this.createElement('div', 'button game-info__start-button', 'НАЧАТЬ', 'game-info');
    }

    async renderMainPage() {
        const event = new Event('mainPageLoad');

        this.createElement('div', 'game-container hide-game-container', '', 'find-words');
        this.createElement('div', 'find-words__exit close', '', 'find-words');
        this.createElement('div', 'find-words__title', 'НАЙДИ СЛОВА', 'find-words');
        this.createElement('div', 'game-container__controls controls', '', 'game-container');
        this.createElement('div', 'game-container__progress-bar progress-bar', '', 'game-container');
        this.createElement('div', 'game-container__game-field game-field', '', 'game-container');

        await this.renderMainPageControls();
        this.renderMainPageProgressBar();
        this.renderMainPageGameField();
        this.renderMainPageWords();

        document.querySelector('.find-words').dispatchEvent(event);
    }

    async renderMainPageControls() {
        const settings = await UserSettingsMiniGame.getUserSettingsMiniGame('findWords');
        const maxLevel = 6;
        const maxRound = 60;

        console.log(settings)

        this.createElement('div', 'controls__level level', '', 'controls');
        this.createElement('div', 'level__head', 'Уровень', 'controls__level');
        this.createElement('div', 'select level__select', '', 'controls__level');
        this.createElement('select', 'level-select', '', 'level__select');
        for (let i = 1; i <= maxLevel; i += 1 ) {
            this.createElement('option', 'level-select__item', i, 'level-select')
        }

        this.createElement('div', 'controls__page _page', '', 'controls');
        this.createElement('div', 'page__head', 'Раунд', 'controls__page');
        this.createElement('div', 'select page__select', '', 'controls__page');
        this.createElement('select', 'page-select', '', 'page__select');
        for (let i = 1; i <= maxRound; i += 1 ) {
            this.createElement('option', 'page-select__item', i, 'page-select')
        }
        document.querySelector('.level-select').value = settings.level;
        document.querySelector('.page-select').value = settings.round;

        this.createElement('div', 'controls__userWords userWords', '', 'controls');
        this.createElement('div', 'userWords__head', 'Мои слова', 'userWords');
        this.createElement('div', 'userWords__toggle-cont button', '', 'userWords');
        this.createElement('div', 'userWords__toggle on', '', 'userWords__toggle-cont');

        this.createElement('div', 'controls__sound sound', '', 'controls');
        this.createElement('div', 'sound__head', 'Звук', 'controls__sound');
        this.createElement('div', 'sound__toggle-cont button', '', 'controls__sound');
        this.createElement('div', 'sound__toggle', '', 'sound__toggle-cont');
        if (this.soundOn) document.querySelector('.sound__toggle').classList.add('on');
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
            this.createElement('div', 'card-eng__text', '', 'card-eng__front', i);
            this.createElement('div', 'card-eng__back', '', 'game-field__card-eng', i);
            document.querySelector(`.eng-couple${i}`).setAttribute('data-couple', `couple${i}`);

            this.createElement('div', `game-field__card-ru card-ru ru-couple${i}`, '', 'game-field');
            this.createElement('div', 'card-ru__front', '', 'game-field__card-ru', i);
            this.createElement('div', 'card-ru__text', '', 'card-ru__front', i);
            this.createElement('div', 'card-ru__back', '', 'game-field__card-ru', i);
            document.querySelector(`.ru-couple${i}`).setAttribute('data-couple', `couple${i}`);
        }

        this.shuffle('card-eng', 'game-field');
        this.shuffle('card-ru', 'game-field');
    }

    shuffle(element, target)  {
        document.querySelectorAll(`.${element}`).forEach((e) => {
            if (Math.random() > this.middle) {
                document.querySelector(`.${target}`).append(e);
            }
            if (Math.random() < this.middle) {
                document.querySelector(`.${target}`).prepend(e);
            }
        });
    }

    async renderMainPageWords() {
        const level = document.querySelector('.level-select');
        const round = document.querySelector('.page-select');
        const levelCont = document.querySelector('.controls__level');
        const roundCont = document.querySelector('.controls__page');
        const toggle = document.querySelector('.userWords__toggle');
        const gameField = document.querySelector('.game-field');
        const wordsPerRound = 10;
        const amountOfWords = 3600;
        const filterForMiniGame = encodeURIComponent('{"$and":[{"$or":[{"userWord.optional.status":"repeat"},{"userWord.optional.status":"tricky"}],"userWord.optional.daysLeftToRepeat":0}]}');
        const message = 'Ваших слов для повторения недостаточно! Чтобы сыграть в мини-игру выключите переключатель "Мои слова" и выберите уровень и раунд.';
        let data;
        let wordsCount;
        this.userWordsOn = toggle.className.includes('on');

        if (this.userWordsOn) {
            const userWordsData = await getFilteredUserWords(filterForMiniGame, amountOfWords);
            wordsCount = userWordsData[0].paginatedResults.length;
            data = userWordsData[0].paginatedResults.sort(() => Math.random() - this.middle);
            data.length = wordsPerRound;
            levelCont.classList.add('event-none');
            roundCont.classList.add('event-none');
        } else {
            data = await this.getWords(level.value, round.value, wordsPerRound);
            wordsCount = data.length;
            levelCont.classList.remove('event-none');
            roundCont.classList.remove('event-none');
        }

        if (wordsCount >= wordsPerRound && document.querySelector('.find-words__message')) {
            document.querySelector('.find-words__message').remove();
            gameField.classList.remove('event-none');
        }

        if (wordsCount < wordsPerRound) {
            this.createElement('div', 'find-words__message', message, 'find-words');
            gameField.classList.add('event-none');
            return
        }

        this.words = [];
        data.forEach((elem) => {
            this.words.push(`${elem.word} - ${elem.wordTranslate}`);
        })

        data.forEach((elem, i) => {
            document.querySelector(`.eng-couple${i}`).firstElementChild.firstElementChild.textContent = `${elem.word}`;
            document.querySelector(`.ru-couple${i}`).firstElementChild.firstElementChild.textContent = `${elem.wordTranslate}`;
            document.querySelector(`.eng-couple${i}`).lastElementChild.setAttribute('data-audio', `${elem.audio}`);
            document.querySelector(`.ru-couple${i}`).lastElementChild.setAttribute('data-audio', `${elem.audio}`);
        })

        setTimeout(() => {
            this.cardsRotate();
        }, this.delayField);

        document.querySelectorAll('.card-ru').forEach((elem) => {
            elem.classList.add('visible');
        });
        document.querySelectorAll('.card-eng').forEach((elem) => {
            elem.classList.add('visible');
        });
    }

    cardsRotate() {
        const cardArr = document.querySelector('.game-field').childNodes;
        cardArr.forEach((elem, idx) => {
            setTimeout(() => {
                elem.classList.add('rotate');
            }, idx * this.delayCards);
        });
    }

    renderMainPageResult(stat) {
        const event = new Event('statLoad');
        const cards = document.querySelectorAll('.card-eng__front');
        const base = 10;
        let level = parseInt(document.querySelector('.level-select').value, base);
        let round = parseInt(document.querySelector('.page-select').value, base);
        const maxLevel = 6;
        const maxRound = 60;
        const increment = 1;
        const startValue = 1;

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
        if (level === 6 && round === 60) {
            document.querySelector('.statistics__next-button').style.display = 'none';
            document.querySelector('.statistics__header').innerHTML = 'Поздравляем!<br><p>Игра завершена!<br>Статистика Раунда';
        }

        if (level === maxLevel && round === maxRound) {
            level = startValue;
            round = startValue;
        } else if (round === maxRound) {
            level += increment;
            round = startValue;
        } else {
            round += increment;
        }

        StatisticsAPI.miniGameStat('findWords', `${stat.total} steps`);
        UserSettingsMiniGame.updateUserSettingsMiniGame('findWords', level, round);

        document.querySelector('.find-words').dispatchEvent(event);
    }
}

export default new RenderFindWordsGame();
