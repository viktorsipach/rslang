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
    this.wordsPerRound = 120;
    this.filesUrlPrefix = 'https://raw.githubusercontent.com/DenisKhatsuk/rslang-data/master/';
    this.soundIsEnabled = true;
    this.curtainTimerStartPoint = 3;
    this.gameTimerStartPoint = 60;
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
      this.startTimer('.curtain__timer', this.curtainTimerStartPoint);
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
    const buttonRepeat = board.querySelector('.repeat-button__icon');
    const controlPanel = document.querySelector('.sprint__panel_right');
    const soundControlButtonOn = controlPanel.querySelector('.sound-control__icon_on');
    const soundControlButtonOff = controlPanel.querySelector('.sound-control__icon_off');
    const wordAudio = this.setNewWord(this.wordsArray);
    const boardButtonsListener = (event) => {
      this.startBoardButtonsHandler(event, wordAudio, buttonTrue, buttonFalse, buttonRepeat);
    };
    controlPanel.addEventListener('click', (event) => {
      if (event.target === soundControlButtonOn || event.target === soundControlButtonOff) {
        this.soundIsEnabled = !this.soundIsEnabled;
        soundControlButtonOn.classList.toggle('sound-control__icon_active');
        soundControlButtonOff.classList.toggle('sound-control__icon_active');
      }
    });
    this.gameIsActive = true;
    this.startTimer('.sprint__timer', this.gameTimerStartPoint);
    if (this.soundIsEnabled) wordAudio.play();
    board.addEventListener('click', boardButtonsListener);
    setTimeout(() => {
      this.gameIsActive = false;
      board.removeEventListener('click', boardButtonsListener);
    }, 60000);
  }

  startBoardButtonsHandler(event, currentWordAudio, buttonTrue, buttonFalse, buttonRepeat) {
    const counter = document.querySelector('.counter__value');
    let wordAudio = currentWordAudio;
    const audioCorrect = new Audio(CorrectSound);
    const audioWrong = new Audio(ErrorSound);
    switch (event.target) {
      case buttonTrue:
        if (this.isRandom) {
          if (this.soundIsEnabled) audioWrong.play();
          this.currentRewardPoints = 10;
        } else {
          if (this.soundIsEnabled) audioCorrect.play();
          this.increaseScore(counter);
          this.increaseStack();
        }
        wordAudio = this.setNewWord(this.wordsArray);
        if (this.soundIsEnabled) wordAudio.play();
        break;
      case buttonFalse:
        if (this.isRandom) {
          if (this.soundIsEnabled) audioCorrect.play();
          this.increaseScore(counter);
          this.increaseStack();
        } else {
          if (this.soundIsEnabled) audioWrong.play();
          this.currentRewardPoints = 10;
        }
        wordAudio = this.setNewWord(this.wordsArray);
        if (this.soundIsEnabled) wordAudio.play();
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
