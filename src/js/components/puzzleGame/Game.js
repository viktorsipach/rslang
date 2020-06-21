import { getRoundsAmountInLevel, getSCustomRoundData } from '../../API/dataAPI';
import { checkActiveHints, createStatisticSentence } from './utils';
import Sentence from './Sentence';
import renderStatisticsModal from './renderStatistics';

export default class Game {
  constructor({ level, round }) {
    this.level = level;
    this.round = round;
    this.wordsPerSentence = 10;
    this.wordsPerRound = 10;
    this.isFinished = false;
  }

  async startNewLevelRound() {
    this.isFinished = false;
    const roundsInLevel = await getRoundsAmountInLevel(this.level, this.wordsPerSentence, this.wordsPerRound);
    await this.renderRoundOptions(roundsInLevel);
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

  async renderRoundData() {
    const fragment = document.createDocumentFragment();
    const roundData = await getSCustomRoundData(this.level, this.round, this.wordsPerSentence, this.wordsPerRound);
    roundData.forEach((el) => {
      let sentence = new Sentence(el);
      this.dataSentencesObjects.push(sentence);
      sentence.textExample = sentence.textExample.replace(/<b>/, '').replace(/<\/b>/, '');
      sentence.status = 'iKnow';
      sentence = sentence.createDataSentence();
      this.dataSentences.push(sentence);
      const sentenceContainer = document.createElement('div');
      sentenceContainer.className = 'sentence result__sentence';
      fragment.append(sentenceContainer);
    });
    document.querySelector('.results-container').innerHTML = '';
    document.querySelector('.results-container').append(fragment);
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
    
    await this.renderRoundData();
    document.querySelectorAll('.results-container>.result__sentence').forEach((el) => this.resultSentences.push(el));
    checkActiveHints();
    this.startSentence();
  }

  startSentence() {
    document.querySelector('.hints__sentence').textContent = '';
    this.isSentenceCompleted = false;
    const dataWords = document.querySelectorAll('.result__sentence.current>.word-container');
    dataWords.forEach((el) => el.classList.remove('true'));
    this.resultSentences.forEach((el) => el.classList.remove('current'));
    this.currentDataSentence = this.dataSentences[this.currentSentenceNumber];
    this.currentResultSentence = this.resultSentences[this.currentSentenceNumber];
    this.currentDataSentenceObject = this.dataSentencesObjects[this.currentSentenceNumber];
    this.currentResultSentence.classList.add('active');
    this.currentResultSentence.classList.add('current');

    for (let i = 0; i < this.currentDataSentenceObject.length; i += 1) {
      const wordContainer = document.createElement('span');
      wordContainer.className = 'word-container';
      this.currentResultSentence.append(wordContainer);
    }
    document.querySelector('.data-container').innerHTML = '';
    document.querySelector('.data-container').append(this.currentDataSentence);
    this.checkGameStatus();
    this.showHintsAtBegin();
  }

  checkGameStatus() {
    const IDONTKNOWBUTTON = document.querySelector('.game__buttons>.dontKnow');
    const CHECKBUTTON = document.querySelector('.game__buttons>.check');
    const CONTINUEBUTTON = document.querySelector('.game__buttons>.continue');

    const resultSentenceLength = document.querySelectorAll('.result__sentence.current>.word-container>.data__word').length;
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

  checkCurrentSentence() {
    const RESULTBUTTON = document.querySelector('.game__buttons>.results');

    const sentenceErrors = this.currentDataSentenceObject.checkSentence();
    if (sentenceErrors === 0) {
      this.isSentenceCompleted = true;
      this.currentSentenceNumber += 1;
    }
    if (this.currentSentenceNumber === 10) {
      RESULTBUTTON.classList.remove('hidden');
    }
  }

  buildCurrentSentence() {
    this.currentDataSentenceObject.status = 'iDontKnow';
    this.currentDataSentenceObject.buildSentence();
  }

  pronounceCurrentSentence() {
    this.currentDataSentenceObject.playSentenceSound();
  }

  translateCurrentSentence() {
    this.currentDataSentenceObject.showSentenceTranslation();
  }

  showCurrentBckImage() {
    this.currentDataSentenceObject.showBckImage();
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
    if (localStorage.getItem('bckImage') === 'true') {
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
    if (!this.currentDataSentenceObject.isBckImageHintUsed) {
      this.showCurrentBckImage();
    }
  }

  showRoundStatistic() {
    document.querySelector('.page'). append(renderStatisticsModal());

    document.querySelector('.statistic-title').textContent = `Level ${this.level} Round ${this.round}`;
    const iDontKnowFragment = document.createDocumentFragment();
    const iKnowFragment = document.createDocumentFragment();
    this.dataSentencesObjects.forEach((el) => {
      if (el.status === 'iDontKnow') {
        const sentence = createStatisticSentence(el);
        iDontKnowFragment.append(sentence);
      }
      if (el.status === 'iKnow') {
        const sentence = createStatisticSentence(el);
        iKnowFragment.append(sentence);
      }
    });

    const IDONTKNOWSENTENCES = document.querySelector('.iDontKnowSentences');
    const IKNOWSENTENCES = document.querySelector('.iKnowSentences');
    IDONTKNOWSENTENCES.append(iDontKnowFragment);
    IKNOWSENTENCES.append(iKnowFragment);
  }
}