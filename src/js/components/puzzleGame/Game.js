import { getRoundsAmountInLevel, getSCustomRoundData } from '../../API/dataAPI';
import { checkActiveHints, createStatisticSentence, mixSentenceWords, getPaintingInfo, getPaintingImageSrc } from './utils';
import Sentence from './Sentence';
import renderStatisticsModal from './renderStatistics';
import StatisticsAPI from '../../API/statisticsAPI';
import userSettingsMiniGame from '../../API/userSettingsMiniGameAPI';
import getUserDataForMiniGame from '../../API/testForUserWordsForMiniGames';

export default class Game {
  constructor() {
    this.wordsPerSentence = 10;
    this.wordsPerRound = 10;
    this.isFinished = false;
    this.audio = new Audio();
    this.levelsAmount = 6;
    this.roundsAmountForRandom = 25;
    this.roundStartIndex = 1;
    this.gameName = 'puzzle';
  }

  initLevelRound({level, round}) {
    this.level = level;
    this.round = round;
  }

  async startNewLevelRound() {
    const SELECTROUNDOPTION = document.getElementById('selectRound');
    const SELECTLEVELOPTION = document.getElementById('selectLevel');
    this.isFinished = false;
    if (!this.isMyWords) {
      const roundsInLevel = await getRoundsAmountInLevel(this.level, this.wordsPerSentence, this.wordsPerRound);
      await this.renderRoundOptions(roundsInLevel);
      SELECTLEVELOPTION.value = this.level;
      SELECTROUNDOPTION.value = this.round;
    }
    this.startRound();
  }

  async startCurrentLevelRound() {
    this.isFinished = false;
    this.startRound();
  }

  async renderRoundOptions(roundsInLevel) {
    const SELECTROUNDCONTAINER = document.querySelector('.select__round>select');
    this.roundsInLevel = roundsInLevel;
    const fr = document.createDocumentFragment();
    for (let i = 1; i <= roundsInLevel; i += 1) {
      const opt = document.createElement('option');
      opt.value = i;
      opt.textContent = i;
      fr.append(opt);
    }
    SELECTROUNDCONTAINER.innerHTML = '';
    SELECTROUNDCONTAINER.append(fr);
  }

  async startRound() {
    const CHECKBUTTON = document.querySelector('.game__buttons>.check');
    const CONTINUEBUTTON = document.querySelector('.game__buttons>.continue');
    const RESULTBUTTON = document.querySelector('.game__buttons>.results');

    this.dataSentencesObjects = [];
    this.dataSentences = [];
    this.resultSentences = [];
    this.currentSentenceNumber = 0;
    this.isSentenceCompleted = false;

    CHECKBUTTON.classList.add('hidden');
    CONTINUEBUTTON.classList.add('hidden');
    RESULTBUTTON.classList.add('hidden');
    
    const isResultsAmountEnough = await this.renderRoundData(); 
    if (isResultsAmountEnough) {
      const RESULT_SENTENCE_WORDS = document.querySelectorAll('.results-container>.result__sentence');
      RESULT_SENTENCE_WORDS.forEach((element) => this.resultSentences.push(element));
      checkActiveHints();
      this.startSentence();
    } else {
      document.querySelector('.hints__sentence').textContent = `Ваших слов для повторения недостаточно! 
      Чтобы сыграть в мини-игру выключите переключатель "Мои слова" и выберите уровень и раунд.`;
    }
  }

  async renderRoundData() {
    const fragment = document.createDocumentFragment();
    if (!this.isMyWords) {
      this.roundData = await getSCustomRoundData(this.level, this.round, this.wordsPerSentence, this.wordsPerRound);
    } else {
      const maxAmountOfUserWords = 3600;
      const allUserData = (await getUserDataForMiniGame(maxAmountOfUserWords))[0].paginatedResults;
      if (allUserData.length >= this.wordsPerRound) {
        allUserData.sort(() => Math.random() - 0.5);
        this.roundData = allUserData.slice(0, this.wordsPerRound);
      } else {
        this.roundData = undefined;
      }
    }

    if (this.roundData) {
      this.roundData.forEach((element) => {
        let sentence = new Sentence(element);
        this.dataSentencesObjects.push(sentence);
        sentence.textExample = sentence.textExample.replace(/<b>/, '').replace(/<\/b>/, '');
        sentence.status = 'iKnow';
        sentence = sentence.createDataSentence();
        this.dataSentences.push(sentence);
        const sentenceContainer = document.createElement('div');
        sentenceContainer.className = 'sentence result__sentence';
        fragment.append(sentenceContainer);
      });
      const RESULTS_CONTAINER = document.querySelector('.results-container');
      RESULTS_CONTAINER.innerHTML = '';
      RESULTS_CONTAINER.append(fragment);
      return true;
    } 
    return false;
  }

  setSentenceWordsBackgroundSetting() {
    const words = document.querySelectorAll('.data__sentence>.word-container');
    let posX = 0;
    let posY = 0;
    let bufferX = 0;
    const shiftValue = -7;
    const el = document.querySelector('.results-container');
    const sizeX = el.offsetWidth;
    const sizeY = el.offsetHeight;
    const sentenceHeight = sizeY/this.wordsPerRound;
    words.forEach((element, index) => {
      const wordElement = element;
      posY = this.currentSentenceNumber*(-sentenceHeight);
      wordElement.style.backgroundImage =  `none`;
      wordElement.style.backgroundSize = `${sizeX}px ${sizeY}px`;
      wordElement.style.backgroundPosition = `${posX}px ${posY}px`;
      wordElement.style.maxWidth = `${element.offsetWidth}px`;
      bufferX += element.offsetWidth;
      posX = sizeX - bufferX;

      const rightSegment = wordElement.querySelector('.right');
      rightSegment.style.backgroundImage =   `none`;
      rightSegment.style.backgroundSize = `${sizeX}px ${sizeY}px`;
      rightSegment.style.backgroundPosition = `${posX}px ${posY + shiftValue}px`;

      if (index === 0) {
        const leftSegment = element.querySelector('.left');
        leftSegment.classList.add('first');
      } else if (index === words.length - 1) {
        rightSegment.classList.add('last');
      }
    });
    this.correctWordsOrder = words;
  }

  startSentence() {
    document.querySelector('.main__hints').classList.remove('hidden');
    document.querySelector('.hints__sentence').textContent = '';
    this.isSentenceCompleted = false;

    const dataWords = document.querySelectorAll('.result__sentence.current>.word-container');
    dataWords.forEach((element) => element.classList.remove('true'));
    dataWords.forEach((element) => element.classList.remove('current'));

    this.resultSentences.forEach((element) => element.classList.remove('current'));
    this.currentDataSentence = this.dataSentences[this.currentSentenceNumber];
    this.currentResultSentence = this.resultSentences[this.currentSentenceNumber];
    this.currentDataSentenceObject = this.dataSentencesObjects[this.currentSentenceNumber];
    this.currentResultSentence.classList.add('active');
    this.currentResultSentence.classList.add('current');

    const DATA_CONTAINER = document.querySelector('.data-container');
    DATA_CONTAINER.innerHTML = '';
    DATA_CONTAINER.append(this.currentDataSentence);

    this.setSentenceWordsBackgroundSetting();
    mixSentenceWords();
    this.checkGameStatus();
    this.showHintsAtBegin();
  }

  checkGameStatus() {
    if (this.currentDataSentenceObject) {
      const IDONTKNOWBUTTON = document.querySelector('.game__buttons>.dontKnow');
      const CHECKBUTTON = document.querySelector('.game__buttons>.check');
      const CONTINUEBUTTON = document.querySelector('.game__buttons>.continue');

      const resultSentenceLength = document.querySelectorAll('.result__sentence.current>.word-container').length;
      const dataSentenceLength = this.currentDataSentenceObject.length;
      if (this.isSentenceCompleted === true) {
        this.showHintsAtEnd();
        CONTINUEBUTTON.classList.remove('hidden');
        CHECKBUTTON.classList.add('hidden');
        IDONTKNOWBUTTON.classList.add('hidden');
      } else if (dataSentenceLength === resultSentenceLength) {
        CHECKBUTTON.classList.remove('hidden');
      } else if (dataSentenceLength !== resultSentenceLength) {
        CONTINUEBUTTON.classList.add('hidden');
        CHECKBUTTON.classList.add('hidden');
        IDONTKNOWBUTTON.classList.remove('hidden');
      }
    }
  }

  checkCurrentSentence() {
    const RESULTBUTTON = document.querySelector('.game__buttons>.results');

    const sentenceErrors = this.currentDataSentenceObject.checkSentence();
    if (sentenceErrors === 0) {
      this.isSentenceCompleted = true;
      this.currentSentenceNumber += 1;
    }

    if (this.currentSentenceNumber === 10) {
      RESULTBUTTON.classList.remove('hidden');
      const words = document.querySelectorAll('.word-container');
      words.forEach((element) => {
        const wordElement = element;
        wordElement.style.border = 'none';
        wordElement.style.boxShadow = 'none';
        wordElement.style.borderRadius = '0';
        wordElement.querySelector('.left').style.border = 'none';
        wordElement.querySelector('.left').style.backgroundColor = 'transparent';
        wordElement.querySelector('.right').style.border = 'none';
      });

      const sentences = document.querySelectorAll('.result__sentence');
      sentences.forEach((element) => {
        element.classList.remove('current');
      })

      if (!this.isMyWords) {
        const pictureInfo = getPaintingInfo(this.level, this.round);
        document.querySelector('.data-container').textContent = pictureInfo;
        document.querySelector('.main__data').classList.add('paintingInfo');
        document.querySelector('.main__hints').classList.add('hidden');
      }
    }
  }

  buildCurrentSentence() {
    if (this.currentDataSentenceObject) {
      this.currentDataSentenceObject.status = 'iDontKnow';
      this.correctWordsOrder.forEach((element) => {
        document.querySelector('.result__sentence.current').append(element);
      });
    } 
  }

  pronounceCurrentSentence() {
    this.currentDataSentenceObject.playSentenceSound(this.audio);
  }

  translateCurrentSentence() {
    this.currentDataSentenceObject.showSentenceTranslation();
  }

  showCurrentBckImage() {
    this.currentDataSentenceObject.showBckImage(this.level, this.round);
  }

  showHintsAtBegin() {
    if (localStorage.getItem('translation') === 'true') {
      this.translateCurrentSentence();
    }
    if (localStorage.getItem('sentencePronunciation') === 'true') {
      if ((localStorage.getItem('autoPronunciation') === 'true')) {
        this.pronounceCurrentSentence();
      }
    }
    if (localStorage.getItem('bckImage') === 'true' && !this.isMyWords) {
      this.showCurrentBckImage();
    }
  }

  showHintsAtEnd() {
    if (!this.currentDataSentenceObject.isTranslationHintUsed) {
      this.translateCurrentSentence();
    }
    if (!this.currentDataSentenceObject.isPronunciationHintUsed) {
      if ((localStorage.getItem('autoPronunciation') === 'true')) {
        this.pronounceCurrentSentence();
      }
    }
    if (!this.currentDataSentenceObject.isBckImageHintUsed && !this.isMyWords) {
      this.showCurrentBckImage();
    }
  }

  renderPaintingInfoForStatisticPage() {
    let paintingSrc;
    const randomLevel = Math.floor(Math.random() * (this.levelsAmount - 1)) + 1;
    const randomRound = Math.floor(Math.random() * this.roundsAmountForRandom) + 1;
    if (this.isMyWords) {
      paintingSrc = getPaintingImageSrc(randomLevel, randomRound);
    } else {
      paintingSrc = getPaintingImageSrc(this.level, this.round);
    }
    document.querySelector('.painting__image').style.backgroundImage = paintingSrc;

    let paintingInfo;
    if (this.isMyWords) {
      paintingInfo = getPaintingInfo(randomLevel, randomRound);
    } else {
      paintingInfo = getPaintingInfo(this.level, this.round);
    }
    document.querySelector('.painting__info').textContent = paintingInfo;
  }

  renderSentencesStatistics() {
    const iDontKnowFragment = document.createDocumentFragment();
    const iKnowFragment = document.createDocumentFragment();
    this.dataSentencesObjects.forEach((element) => {
      if (element.status === 'iDontKnow') {
        const sentence = createStatisticSentence(element);
        iDontKnowFragment.append(sentence);
      }
      if (element.status === 'iKnow') {
        const sentence = createStatisticSentence(element);
        iKnowFragment.append(sentence);
      }
    });
    document.querySelector('.iDontKnowSentences').append(iDontKnowFragment);
    document.querySelector('.iKnowSentences').append(iKnowFragment);
    document.querySelector('.iKnowSentences-count').textContent = this.iKnowSentencesCount;
    document.querySelector('.iDontKnowSentences-count').textContent = this.iDontKnowSentencesCount;
  }

  showRoundStatistic() {
    document.querySelector('.page'). append(renderStatisticsModal());
    this.getRoundResult();
    if (!this.isMyWords) {
      document.querySelector('.statistic-title').textContent = `Уровень ${this.level} Раунд ${this.round}`;
    }
    this.renderPaintingInfoForStatisticPage();
    this.renderSentencesStatistics();
  }

  checkGameProgress() {
    const HINTS_SENTENCE = document.querySelector('.hints__sentence');
    const RESULTBUTTON = document.querySelector('.game__buttons>.results');
    const CONTINUEBUTTON = document.querySelector('.game__buttons>.continue');
    if (this.round === (this.roundsInLevel + 1) && this.level === this.levelsAmount) {
      document.querySelector('.main__hints').classList.remove('hidden');
      HINTS_SENTENCE.textContent = 'ПОЗДРАВЛЯЕМ!! Все уровни пройдены!';
      this.isFinished = true;
      RESULTBUTTON.classList.add('hidden');
      CONTINUEBUTTON.classList.add('hidden');
    } else {
      this.startNewLevelRound();
    }
  }

  getRoundResult() {
    this.iKnowSentencesCount = 0;
    this.iDontKnowSentencesCount = 0;
    this.dataSentencesObjects.forEach((element) => {
      if (element.status === 'iDontKnow') {
        this.iDontKnowSentencesCount += 1;
      }
      if (element.status === 'iKnow') {
        this.iKnowSentencesCount += 1;
      }
    });
  }

  sendLongTermStatistics() {
    const result = `${this.iKnowSentencesCount/this.wordsPerRound*100} %`;
    StatisticsAPI.miniGameStat(this.gameName, result);
  }

  updateLevelRound() {
    if (this.round < this.roundsInLevel) {
      this.round += 1;
    } else if (this.level < this.levelsAmount) {
      this.level += 1;
      this.round = this.roundStartIndex;
    } else if (this.round === this.roundsInLevel && this.level === this.levelsAmount) {
      this.round += 1;
    }
  }

  async sendLevelRoundInfo() {
    await userSettingsMiniGame.updateUserSettingsMiniGame(this.gameName, this.level, this.round);
  }
}
