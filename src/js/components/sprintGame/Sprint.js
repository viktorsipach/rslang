import ContentBuilder from './modules/ContentBuilder';
import { getRoundData } from '../../API/dataAPI';
import ErrorSound from '../../../assets/audio/error.mp3';
import CorrectSound from '../../../assets/audio/correct.mp3';

class Sprint {
  constructor() {
    this.gameContainer = `
      <div class='sprint__panel'></div>
    `;
    this.gameContainerSelector = '.sprint__panel';
    this.gameName = 'Спринт';
    this.gameLevel = 1;
    this.gameRound = 1;
    this.wordsPerRound = 100;
    this.filesUrlPrefix = 'https://raw.githubusercontent.com/DenisKhatsuk/rslang-data/master/';
    this.soundIsEnabled = true;
    this.curtainTimerStartPoint = 3;
    this.gameTimerStartPoint = 60;
    this.currentRewardPoints = 10;
    this.currentStack = 0;
    this.maxStack = 4;
    this.gameDuration = 60000;
    this.gameDelay = 3000;
  }

  init(parentSelector = '.page') {
    const parent = document.querySelector(parentSelector);
    const closeButton = document.querySelector('.close-btn');
    const clearGameFeatures = () => {
      closeButton.classList.remove('exit');
      closeButton.removeEventListener('click', clearGameFeatures);
      document.removeEventListener('keydown', this.keyboardListener);
    };
    closeButton.classList.add('exit');
    closeButton.addEventListener('click', clearGameFeatures);
    parent.innerHTML = this.gameContainer;
    ContentBuilder.addStartPageContent(this.gameContainerSelector, this.gameName);
    this.launchStartScreen();
  }

  launchStartScreen() {
    const startButton = document.querySelector('.curtain__button_start');
    startButton.addEventListener('click', () => {
      this.launchGame();
    });
  }

  async launchGame() {
    const wordsApiArray = await getRoundData(this.gameLevel, this.gameRound, this.wordsPerRound);
    if (wordsApiArray.error) {
      ContentBuilder.showErrorMessage('.sprint__curtain');
    } else {
      const wordsArray = [];
      wordsApiArray.forEach((element) => {
        const {
          word,
          audio,
          wordTranslate,
        } = element;
        wordsArray.push({word, audio, wordTranslate});
      });
      this.wordsArray = wordsArray;
      ContentBuilder.addGetReadyContent('.sprint__curtain');
      this.gameIsActive = true;
      this.startTimer('.curtain__timer', this.curtainTimerStartPoint);
      setTimeout(() => {
        ContentBuilder.addMainPageContent(this.gameContainerSelector, this.gameLevel, this.gameRound);
        this.startGame();
      }, this.gameDelay);
    }
  }

  startGame() {
    const sprintPanel = document.querySelector('.sprint__panel');
    const board = document.querySelector('.sprint__board');
    const buttonTrue = board.querySelector('.board__button_true');
    const buttonFalse = board.querySelector('.board__button_false');
    const buttonRepeat = board.querySelector('.repeat-button__icon');
    const controlPanel = document.querySelector('.sprint__panel_right');
    const soundControlButtonOn = controlPanel.querySelector('.sound-control__icon_on');
    const soundControlButtonOff = controlPanel.querySelector('.sound-control__icon_off');
    const reloadButton = controlPanel.querySelector('.game-controls__reload');
    const levelSelector = controlPanel.querySelector('.game-controls__select_level');
    const roundSelector = controlPanel.querySelector('.game-controls__select_round');
    const wordAudio = this.setNewWord(this.wordsArray);
    this.wrongWords = [];
    this.correctWords = [];
    this.boardButtonsListener = (event) => {
      this.startBoardButtonsHandler(event, wordAudio, buttonTrue, buttonFalse, buttonRepeat);
    };
    this.keyboardListener = (event) => {
      this.startKeyboardHandler(event);
    };
    controlPanel.addEventListener('click', (event) => {
      if (event.target === soundControlButtonOn || event.target === soundControlButtonOff) {
        this.soundIsEnabled = !this.soundIsEnabled;
        soundControlButtonOn.classList.toggle('sound-control__icon_active');
        soundControlButtonOff.classList.toggle('sound-control__icon_active');
      }
      if (event.target === reloadButton) {
        this.gameLevel = levelSelector.value;
        this.gameRound = roundSelector.value;
        sprintPanel.innerHTML = `<div class="sprint__curtain curtain"></div>`;
        document.removeEventListener('keydown', this.keyboardListener);
        this.launchGame();
      }
    });

    document.addEventListener('keydown', this.keyboardListener);

    this.startTimer('.sprint__timer', this.gameTimerStartPoint);
    if (this.soundIsEnabled) wordAudio.play();
    board.addEventListener('click', this.boardButtonsListener);

    setTimeout(() => {
      this.endGame(this.boardButtonsListener, this.keyboardListener);
    }, this.gameDuration);
  }

  startKeyboardHandler(event) {
    this.counter = document.querySelector('.counter__value');
    this.stack = document.querySelector('.stack');
    this.reward = document.querySelector('.board__body_reward');
    let wordAudio;
    const audioCorrect = new Audio(CorrectSound);
    const audioWrong = new Audio(ErrorSound);
    const playNewWord = () => {
      if (this.wordsArray.length) {
        wordAudio = this.setNewWord(this.wordsArray);
        if (this.soundIsEnabled) wordAudio.play();
      } else {
        this.endGame(this.boardButtonsListener, this.keyboardListener);
      }
    };
    switch (event.code) {
      case 'ArrowRight':
        if (this.isRandom) {
          if (this.soundIsEnabled) audioCorrect.play();
          this.correctWords.push(this.currentWord);
          this.gameProgressHandler(true);
        } else {
          if (this.soundIsEnabled) audioWrong.play();
          this.wrongWords.push(this.currentWord);
          this.gameProgressHandler(false);
        }
        playNewWord();
        break;
      case 'ArrowLeft':
        if (this.isRandom) {
          if (this.soundIsEnabled) audioWrong.play();
          this.wrongWords.push(this.currentWord);
          this.gameProgressHandler(false);
        } else {
          if (this.soundIsEnabled) audioCorrect.play();
          this.correctWords.push(this.currentWord);
          this.gameProgressHandler(true);
        }
        playNewWord();
        break;
      default:
        break;
    }
    return this;
  }

  endGame(boardButtonsListener, keyboardListener) {
    const score = document.querySelector('.counter__value');
    const board = document.querySelector('.sprint__board');
    this.gameIsActive = false;
    this.score = score.textContent;
    board.removeEventListener('click', boardButtonsListener);
    document.removeEventListener('keydown', keyboardListener);
    ContentBuilder.showCurrentGameStatistics('.sprint__panel_main', this.getStatisticsElement());
    const gameStatistics = document.querySelector('.game-statistics__popup');
    const gameStatisticsExit = gameStatistics.querySelector('.game-statistics__button_exit');
    gameStatistics.addEventListener('click', (event) => {
      switch (event.target) {
        case gameStatisticsExit:
          gameStatistics.remove();
          break;
        default:
          if (event.target.classList.contains('game-statistics__list-item_icon') && this.soundIsEnabled) {
            const wordAudio = `${this.filesUrlPrefix}${event.target.getAttribute('data-sound')}`;
            const audioElement = new Audio(wordAudio);
            audioElement.play();
          }
          break;
      }
    });
  }

  startBoardButtonsHandler(event, currentWordAudio, buttonTrue, buttonFalse, buttonRepeat) {
    this.counter = document.querySelector('.counter__value');
    this.stack = document.querySelector('.stack');
    this.reward = document.querySelector('.board__body_reward');
    let wordAudio = currentWordAudio;
    const audioCorrect = new Audio(CorrectSound);
    const audioWrong = new Audio(ErrorSound);

    const playNewWord = () => {
      if (this.wordsArray.length) {
        wordAudio = this.setNewWord(this.wordsArray);
        if (this.soundIsEnabled) wordAudio.play();
      } else {
        this.endGame(this.boardButtonsListener, this.keyboardListener);
      }
    };
    switch (event.target) {
      case buttonTrue:
        if (this.isRandom) {
          if (this.soundIsEnabled) audioWrong.play();
          this.wrongWords.push(this.currentWord);
          this.gameProgressHandler(false);
        } else {
          if (this.soundIsEnabled) audioCorrect.play();
          this.correctWords.push(this.currentWord);
          this.gameProgressHandler(true);
        }
        playNewWord();
        break;
      case buttonFalse:
        if (this.isRandom) {
          if (this.soundIsEnabled) audioCorrect.play();
          this.correctWords.push(this.currentWord);
          this.gameProgressHandler(true);
        } else {
          if (this.soundIsEnabled) audioWrong.play();
          this.wrongWords.push(this.currentWord);
          this.gameProgressHandler(false);
        }
        playNewWord();
        break;
      case buttonRepeat:
        if (this.soundIsEnabled) this.currentWordAudio.play();
        break;
      default:
        break;
    }
  }

  setNewWord(wordsArray) {
    const randomIndex = Sprint.getRandomInteger(wordsArray.length - 1);
    const currentWord = wordsArray[randomIndex];
    const currentWordTranslate = currentWord.wordTranslate;

    const randomWordTranslate = wordsArray[Sprint.getRandomInteger(wordsArray.length - 1)].wordTranslate;
    const isRandom = Math.round(Math.random());
    this.isRandom = isRandom;

    wordsArray.splice(randomIndex, 1);
    this.wordsArray = wordsArray;

    const board = document.querySelector('.sprint__board');
    const wordFieldForeign = board.querySelector('.board__body_foreign-word');
    const wordFieldTranslated = board.querySelector('.board__body_translated-word');

    wordFieldForeign.textContent = currentWord.word;
    wordFieldTranslated.textContent = isRandom ? randomWordTranslate : currentWordTranslate;

    const audioElement = new Audio(`${this.filesUrlPrefix}${currentWord.audio}`);
    this.currentWord = currentWord;
    this.currentWordAudio = audioElement;
    return audioElement;
  }

  static getRandomInteger(max) {
    return Math.round(-0.5 + Math.random() * (max + 1));
  }

  startTimer(timerSelector, startPoint) {
    const timer = document.querySelector(timerSelector);
    let timerValue = startPoint;
    timer.textContent = timerValue;
    const interval = setInterval(() => {
      timerValue -= 1;
      if (timerValue === -1 || !this.gameIsActive) {
        clearInterval(interval);
      } else {
        timer.textContent = timerValue;
      }
    }, 1000);
    return this;
  }

  increaseScore(counterElement) {
    const counter = counterElement;
    const currentValue = counter.textContent;
    counter.textContent = Number(currentValue) + Number(this.currentRewardPoints);
  }

  increaseStack() {
    if (this.currentStack < this.maxStack) {
      this.currentStack += 1;
      this.increaseScore(this.counter);
      this.stack.querySelector(`.stack__element_${this.currentStack}`).classList.add('stack__element_active');
    } else if(this.currentStack === this.maxStack && this.currentRewardPoints < 100) {
      this.currentStack = 0;
      this.currentRewardPoints *= 2;
      this.reward.textContent = `+${this.currentRewardPoints}`;
      this.stack.querySelectorAll('.stack__element').forEach((element) => {
        element.classList.remove('stack__element_active');
      });
    }
  }

  resetStack() {
    this.currentRewardPoints = 10;
    this.currentStack = 0;
      this.reward.textContent = `+${this.currentRewardPoints}`;
      this.stack.querySelectorAll('.stack__element').forEach((element) => {
        element.classList.remove('stack__element_active');
      });
  }

  gameProgressHandler(answerIsCorrect) {
    if (answerIsCorrect) {
      this.increaseStack();
    } else {
      this.resetStack();
    }
  }

  static getWordsList(wordsArray) {
    const wordsList = document.createElement('ul');
    wordsArray.forEach((word) => {
      const element = document.createElement('li');
      element.classList.add('game-statistics__list-item');
      element.innerHTML = `
        <i class="fa fa-play game-statistics__list-item_icon" data-sound="${word.audio}"></i>${word.word} - ${word.wordTranslate}
      `;
      wordsList.append(element);
    });
    return wordsList;
  }

  getStatisticsElement() {
    const errorsAmount = this.wrongWords.length;
    const correctAnswersAmount = this.correctWords.length;
    const statisticsPopup = document.createElement('div');
    statisticsPopup.classList.add('game-statistics__popup');
    const errorsListItems = Sprint.getWordsList(this.wrongWords).innerHTML;
    const correctAnswersListItems = Sprint.getWordsList(this.correctWords).innerHTML;

    const statisticsMarkup = `
      <div class="game-statistics__header">
        <div class="game-statistics__score">
          ${this.score}
        </div>
      </div>
      <div class="game-statistics__main">
        <div class="game-statistics__errors">
          <button class="accordion">Ошибки<span class="game-statistics__errors_amount">${errorsAmount}</span><i class="fa fa-caret-down game-statistics__icon_caret-down"></i></button>
          <div class="accordion__panel">
            <ul class="game-statistics__list">
              ${errorsListItems}
            </ul>
          </div>
        </div>
        <span class="divider"></span>
        <div class="game-statistics__correct-answers">
          <button class="accordion">Угаданные слова<span class="game-statistics__correct-answers_amount">${correctAnswersAmount}</span><i class="fa fa-caret-down game-statistics__icon_caret-down"></i></button>
          <div class="accordion__panel">
            <ul class="game-statistics__list">
              ${correctAnswersListItems}
            </ul>
          </div>
        </div>
      </div>
      <div class="game-statistics__footer">
        <button class="button game-statistics__button_exit">
          Закрыть
        </button>
      </div>
    `;
    statisticsPopup.innerHTML = statisticsMarkup;
    return statisticsPopup;
  }

}

export default new Sprint();
