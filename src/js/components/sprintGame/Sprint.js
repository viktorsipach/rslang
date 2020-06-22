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
    this.wordsPerRound = 80;
    this.filesUrlPrefix = 'https://raw.githubusercontent.com/DenisKhatsuk/rslang-data/master/';
    this.currentRewardPoints = 10;
    this.currentStack = 0;
  }

  init(parentSelector = '.page') {
    const parent = document.querySelector(parentSelector);
    parent.innerHTML = this.gameContainer;
    ContentBuilder.addStartPageContent(this.gameContainerSelector, this.gameName);
    this.launchStartScreen();
  }

  launchStartScreen() {
    const startButton = document.querySelector('.curtain__button_start');
    startButton.addEventListener('click', async () => {
      const wordsApiArray = await getRoundData(this.gameLevel, this.gameRound, this.wordsPerRound);
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
      this.startTimer('.curtain__timer', 3);
      setTimeout(() => {
        ContentBuilder.addMainPageContent(this.gameContainerSelector);
        this.startGame();
      }, 3000);
    });
  }

  startGame() {
    const board = document.querySelector('.sprint__board');
    const buttonTrue = board.querySelector('.board__button_true');
    const buttonFalse = board.querySelector('.board__button_false');
    const wordAudio = this.setNewWord(this.wordsArray);
    const gameButtonsListener = (event) => {
      this.startGameButtonsHandler(event, wordAudio, buttonTrue, buttonFalse);
    };
    this.gameIsActive = true;
    this.startTimer('.sprint__timer', 60);
    wordAudio.play();
    board.addEventListener('click', gameButtonsListener);
    setTimeout(() => {
      this.gameIsActive = false;
      board.removeEventListener('click', gameButtonsListener);
    }, 60000);
  }

  startGameButtonsHandler(event, currentWordAudio, buttonTrue, buttonFalse) {
    const counter = document.querySelector('.counter__value');
    let wordAudio = currentWordAudio;
    const audioCorrect = new Audio(CorrectSound);
    const audioWrong = new Audio(ErrorSound);
    switch (event.target) {
      case buttonTrue:
        if (this.isRandom) {
          audioWrong.play();
          this.currentRewardPoints = 10;
        } else {
          audioCorrect.play();
          this.increaseScore(counter);
          this.increaseStack();
        }
        wordAudio = this.setNewWord(this.wordsArray);
        wordAudio.play();
        break;
      case buttonFalse:
        if (this.isRandom) {
          audioCorrect.play();
          this.increaseScore(counter);
          this.increaseStack();
        } else {
          audioWrong.play();
          this.currentRewardPoints = 10;
        }
        wordAudio = this.setNewWord(this.wordsArray);
        wordAudio.play();
        break;
      default:
        break;
    }
  }

  setNewWord(wordsArray) {
    const randomIndex = Sprint.getRandomInteger(wordsArray.length - 1);
    const currentWord = wordsArray[randomIndex];
    const currentWordTranslate = currentWord.wordTranslate;
    wordsArray.splice(randomIndex, 1);
    this.wordsArray = wordsArray;

    const randomWordTranslate = wordsArray[Sprint.getRandomInteger(wordsArray.length - 1)].wordTranslate;
    const isRandom = Math.round(Math.random());
    this.isRandom = isRandom;

    const board = document.querySelector('.sprint__board');
    const wordFieldForeign = board.querySelector('.board__body_foreign-word');
    const wordFieldTranslated = board.querySelector('.board__body_translated-word');

    wordFieldForeign.textContent = currentWord.word;
    wordFieldTranslated.textContent = isRandom ? randomWordTranslate : currentWordTranslate;

    const audioElement = new Audio(`${this.filesUrlPrefix}${currentWord.audio}`);
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
      if (timerValue === -1) {
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
    if (this.currentStack < 4) {
      this.currentStack += 1;
    } else if(this.currentStack === 4) {
      this.currentStack = 0;
      this.currentRewardPoints *= 2;
    }
  }
}

export default new Sprint();
