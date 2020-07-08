import renderStatistics from './renderStatistics';
import { disableButton, enableButton } from './utils';
import getTrainingGameData from './IntervalRepetitionTechnique';
import { updateUserWord, getUserWord } from '../../API/userWordsAPI';
import { updateLevelRoundDateSettings, updateAmountOfTodayLearnedWordsSettings, putUserSettings, getUserSettings } from '../../API/userSettingsAPI';
import renderTrainingModal from './renderTrainingModal';

import initialSettings from './initialSetting';


 
class TrainingGame {
  // constructor({ settings }) {
  constructor() {
    // this.settings = settings;
    // this.newWordsPerDay = this.settings.optional.training.newWordsPerDay;
    // this.trainingSettings = settings.optional.training;
    // this.trainingMainSettings = this.trainingSettings.mainSettings;
    // this.newWordsPerDay = settings.wordsPerDay;
    // this.maxCardsPerDay = this.trainingMainSettings.maxCardsPerDay;
    // this.amountOfLearnedWordsPerDay = this.trainingMainSettings.amountOfLearnedWordsPerDay;
    // this.cardSettings = this.trainingSettings.cardSettings;
    // this.autoPronunciation = this.trainingSettings.autoPronunciation;
    // this.showDeleteButton = this.trainingSettings.showDeleteButton;
    // this.showHardButton = this.trainingSettings.showHardButton;
    this.timeOut = 2500;
    this.repeatData = [];
    this.isRepeatData = false;
    this.amountsOfRepeatCards = 0;
    this.wordStatus = 'repeat';
    this.wordDifficulty = 'easy';
    this.date = (new Date()).toLocaleString();
  }

  async initGame() {
    let settings = await getUserSettings();
    if (settings === undefined) {
      const initialWordsPerDay = 10;
      await putUserSettings({ 
        settings: {
          'wordsPerDay': initialWordsPerDay,
          'optional': initialSettings
        }
      });
      settings = await getUserSettings();
    }
    this.settings = settings;
    this.newWordsPerDay = this.settings.optional.training.newWordsPerDay;
    this.trainingSettings = settings.optional.training;
    this.trainingMainSettings = this.trainingSettings.mainSettings;
    this.newWordsPerDay = settings.wordsPerDay;
    this.maxCardsPerDay = this.trainingMainSettings.maxCardsPerDay;
    this.amountOfLearnedWordsPerDay = this.trainingMainSettings.amountOfLearnedWordsPerDay;
    this.cardSettings = this.trainingSettings.cardSettings;
    this.autoPronunciation = this.trainingSettings.autoPronunciation;
    this.showDeleteButton = this.trainingSettings.showDeleteButton;
    this.showHardButton = this.trainingSettings.showHardButton;
  }
   
  

  async getData() {
    this.data = await getTrainingGameData();
    if (this.data) {
      this.amountsOfCards = this.data.length;
    }
  }

  async start() {
    if (this.data === undefined || this.amountsOfCards === 0) {
      console.log('no words to learn today!')
      // document.querySelector('.page').append(renderTrainingModal());
    } else {
      this.currentCardNumber = 0;
      this.correctAnswersAmount = 0;
      this.seriesOfCorrectAnswers = 0;
      this.longestSeriesOfCorrectAnswers = 0;
      this.progress = 0;
      this.cardData = this.data[this.currentCardNumber];
      this.lettersCount = this.data[this.currentCardNumber].word.length;
      this.renderCardData();
    }
  }

  renderCardData() {
    const DIFFICULTY_BUTTONS = document.querySelector('.difficulty__buttons');
    const GAME_BUTTONS = document.querySelector('.game__buttons.training-game');
    DIFFICULTY_BUTTONS.classList.add('hidden');
    GAME_BUTTONS.classList.remove('hidden');
    const NEXTBUTTON_SELECTOR = '.trainingGame__button.next';
    const IDONTKNOWBUTTON_SELECTOR = '.trainingGame__button.dontKnow';
    disableButton(NEXTBUTTON_SELECTOR);
    enableButton(IDONTKNOWBUTTON_SELECTOR);
    this.isWordWithoutTraining = false;
    if (this.currentCardNumber < this.amountsOfCards) {
      document.querySelector('.letters-container').classList.add('hidden');
      this.cardData = this.data[this.currentCardNumber];
      console.log(this.cardData);
      this.renderTranslation();
      this.renderAutoPronunciationButtonState();
      this.renderTranslationInfoAndButtonState();
      this.renderAssociatedPicture();
      this.renderExplanationSentence();
      this.renderExampleSentence();
      this.renderInput();
      this.showProgress();
    } else {
      updateLevelRoundDateSettings();
      if (this.repeatData.length === 0) {
        this.openStatistics();
      } else {
        console.log('repeat again words');
        this.isRepeatData = true;
        this.currentCardNumber = 0;
        this.amountsOfRepeatCards = this.repeatData.length;
        this.playRepeatWords();
      }
    }
  }

  checkInput() {
    const INPUT = document.querySelector('.card__input');
    const LETTERS_CONTAINER = document.querySelector('.letters-container');
    LETTERS_CONTAINER.innerHTML = '';
    LETTERS_CONTAINER.append(this.createWordLetters());

    const inputLetters = INPUT.value.toLowerCase().split('');
    const wordLetters = document.querySelectorAll('.letters-container>*');
    this.errorCount = 0;
    for(let i=0; i< wordLetters.length; i += 1) {
      if (wordLetters[i].textContent.toLowerCase() === inputLetters[i]) {
        wordLetters[i].dataset.isCorrect = 'true';
      } else {
        wordLetters[i].dataset.isCorrect = 'false';
        this.errorCount += 1;
      }
    }
    if (this.isWordWithoutTraining) {
      if(!this.isRepeatData) {
        this.showProgress();
        this.seriesOfCorrectAnswers = 0;
      }
      this.showAnswer();
    } 
    else if (this.errorCount === 0) {
      INPUT.value = '';
      if (!this.isRepeatData) {
        this.correctAnswersAmount += 1;
        this.seriesOfCorrectAnswers += 1;
      }
      if (this.seriesOfCorrectAnswers > this.longestSeriesOfCorrectAnswers) {
        this.longestSeriesOfCorrectAnswers = this.seriesOfCorrectAnswers;
      }
      this.correctAnswer();
    } else {
      this.seriesOfCorrectAnswers = 0;
      this.incorrectAnswer();
    }
  }

  correctAnswer() {
    this.isAnswerCorrect = true;
    this.progress += 100/this.amountsOfCards;
    this.showAnswer();
  }

  incorrectAnswer() {
    this.isAnswerCorrect = false;
    this.showAnswer();
  }

  playCardSounds() {
    if (this.autoPronunciation) {
      const SOUNDS_SRC = 'https://raw.githubusercontent.com/yekaterinakarakulina/rslang-data/master/';
      const wordSound = new Audio();
      wordSound.src = `${SOUNDS_SRC}${this.cardData.audio}`;
      wordSound.play();
      wordSound.onended = () => {
        const meaningSound = new Audio();
        meaningSound.src = `${SOUNDS_SRC}${this.cardData.audioMeaning}`;
        meaningSound.play();
        meaningSound.onended = () => {
          const exampleSound = new Audio();
          exampleSound.src = `${SOUNDS_SRC}${this.cardData.audioExample}`;
          exampleSound.play();
          exampleSound.onended = () => {
            if (this.isWordWithoutTraining && !this.isRepeatData) {
              this.renderCardData();
            } else if(this.isRepeatData) {
              this.playRepeatWords();
            }
          }
        }
      }
    } else if (!this.autoPronunciation) {
      if (this.isWordWithoutTraining && !this.isRepeatData) {
        setTimeout(function fn(){ this.renderCardData(); }.bind(this), this.timeOut);
      } else if(this.isRepeatData) {
        setTimeout(function fn(){ this.playRepeatWords(); }.bind(this), this.timeOut);
      }
    }
  }

  showAnswer () {
    const DIFFICULTY_BUTTONS = document.querySelector('.difficulty__buttons');
    const GAME_BUTTONS = document.querySelector('.game__buttons.training-game');
    const NEXTBUTTON_SELECTOR = '.trainingGame__button.next';
    const IDONTKNOWBUTTON_SELECTOR = '.trainingGame__button.dontKnow';
    const INPUT = document.querySelector('.card__input');

    INPUT.setAttribute('placeholder', '');
    INPUT.value = '';
    if (this.errorCount >= this.lettersCount/2) {
      const wordLetters = document.querySelectorAll('.letters-container>*');
      Array.from(wordLetters).forEach((element) => {
      const letter = element;
        letter.style.color = 'red';
      });
    } 
    document.querySelector('.letters-container').classList.remove('hidden'); 
    if (this.isWordWithoutTraining) {
      console.log('isWordWithoutTraining');
      this.currentCardNumber += 1;
      disableButton(NEXTBUTTON_SELECTOR);
      disableButton(IDONTKNOWBUTTON_SELECTOR);
      INPUT.disabled = true;
      document.querySelector('.card__explanation-sentence>span').classList.remove('hidden');
      document.querySelector('.card__example-sentence>span').classList.remove('hidden');
      if (this.cardSettings.showTranslation)   {
        this.showSentencesTranslations();
      }
      if (!this.isRepeatData) {
        this.showProgress();
      } 
      this.playCardSounds();
    } else if (this.isAnswerCorrect) {
      console.log('correct answer');
      this.currentCardNumber += 1
      INPUT.disabled = true;
      document.querySelector('.card__explanation-sentence>span').classList.remove('hidden');
      document.querySelector('.card__example-sentence>span').classList.remove('hidden');
      if (this.cardSettings.showTranslation) {
        this.showSentencesTranslations();
      }
      if (!this.isRepeatData) {
        DIFFICULTY_BUTTONS.classList.remove('hidden');
        GAME_BUTTONS.classList.add('hidden');
        this.showProgress();
      } 
      this.playCardSounds();
    } else if (!this.isAnswerCorrect) {
      console.log('INcorrect answer');
      disableButton(NEXTBUTTON_SELECTOR);
      INPUT.disabled = false;
      INPUT.focus();
    }  
  }

  showWordWithoutTraining() {
    this.isAnswerCorrect = false;
    this.isWordWithoutTraining = true;
    this.progress += 100/this.amountsOfCards;
    this.checkInput();
  }

  playRepeatWords() {
    if (this.currentCardNumber < this.amountsOfRepeatCards) {
    this.cardData = this.repeatData[this.currentCardNumber];
    console.log(this.cardData);

    const NEXTBUTTON_SELECTOR = '.trainingGame__button.next';
    disableButton(NEXTBUTTON_SELECTOR);
    this.isWordWithoutTraining = false;
    document.querySelector('.letters-container').classList.add('hidden');
      
    this.renderTranslation();
    this.renderAutoPronunciationButtonState();
    this.renderTranslationInfoAndButtonState();
    this.renderAssociatedPicture();
    this.renderExplanationSentence();
    this.renderExampleSentence();
    this.renderInput();
    } else {
      this.openStatistics();
    }
  }

  openStatistics() {
    const statisticsData = {
      amountOfWords: this.amountsOfCards,
      amountOfCorrectAnswers: this.correctAnswersAmount,
      amountOfNewWords: this.newWordsPerDay,
      longestSeriesOfCorrectAnswers: this.longestSeriesOfCorrectAnswers
    }
    document.querySelector('.page').append(renderStatistics(statisticsData)); 
  }

  async updateWord() {
    // this.amountOfLearnedWordsPerDay += 1;
    // console.log(this.amountOfLearnedWordsPerDay);
    updateAmountOfTodayLearnedWordsSettings();
    let difficultyCoef;
    switch (this.wordDifficulty) {
      case 'easy':
        difficultyCoef = 3;
        break;
      case 'normal':
        difficultyCoef = 2;
        break;
      case 'hard':
        difficultyCoef = 1;
        break;
      default:
        break;
    }

    const currentWord = this.data[this.currentCardNumber - 1];
    const idProperty = '_id';
    const userWord = await getUserWord({ wordId: currentWord[`${idProperty}`] });

    let {repeatCount} = userWord.optional;
    let {daysLeftToRepeat} = userWord.optional;
    let {errorsCount} = userWord.optional;
    
    repeatCount += 1;
    daysLeftToRepeat = difficultyCoef * repeatCount;

    if (this.wordStatus !== 'delete' && this.wordStatus !== 'tricky') {
      this.wordStatus = 'repeat';
    }

    if (this.difficulty === 'hard') {
      errorsCount +=1;
      if (errorsCount >= 5) {
        this.wordStatus = 'tricky';
      }
    }
  
    updateUserWord({
      wordId: currentWord[`${idProperty}`],
      word: {
        'difficulty': this.wordDifficulty,
        'optional': {
          status: this.wordStatus,
          lastRepeatDate: this.date,
          difficultyCoef,
          repeatCount,
          daysLeftToRepeat,
          errorsCount,
        }
      }
    })
    
  }

  showProgress() {
    document.querySelector('.progress__value').textContent = `${this.currentCardNumber} / ${this.amountsOfCards}`;
    document.querySelector('.progress__line').style.width = `${this.progress}%`;
  }

  addCardToRepeatList() {
    this.repeatData.push(this.data[this.currentCardNumber - 1]);
  }

  renderTranslation() {
    if (this.cardSettings.showTranscription) {
      document.querySelector('.card__transcription').textContent = this.cardData.transcription;
    } 
  }

  renderAutoPronunciationButtonState() {
    const AUTO_PRONUNCIATION_BUTTON = document.querySelector('.menu__button.auto-pronunciation');
    if (this.autoPronunciation) {
      AUTO_PRONUNCIATION_BUTTON.classList.add('active');
    } else {
      AUTO_PRONUNCIATION_BUTTON.classList.remove('active');
    }
  }

  renderTranslationInfoAndButtonState() {
    const WORD_TRANSLATION = document.querySelector('.card__translation');
    const SHOW_TRANSLATION_BUTTON = document.querySelector('.menu__button.show-translation');
    if (this.cardSettings.showTranslation) {
      WORD_TRANSLATION.textContent = this.cardData.wordTranslate;
      SHOW_TRANSLATION_BUTTON.classList.add('active');
    } else {
      WORD_TRANSLATION.textContent = '';
      SHOW_TRANSLATION_BUTTON.classList.add('active');
    }
  }

  renderAssociatedPicture() {
    if (this.cardSettings.showAssociatedPicture) {
      const IMAGE_CONTAINER = document.querySelector('.card-img__container');
      const IMAGES_SRC = 'https://raw.githubusercontent.com/yekaterinakarakulina/rslang-data/master/';
      IMAGE_CONTAINER.style.backgroundImage = `url('${IMAGES_SRC}${this.cardData.image}')`;
    }
  }

  renderExplanationSentence() {
    if (this.cardSettings.showExplanationSentence) {
      const EXPLANATION_SENTENCE = document.querySelector('.card__explanation-sentence');
      const EXPLANATION_SENTENCE_TRANSLATION = document.querySelector('.card__explanation-sentence-translation');

      const regex = new RegExp(`(<i>[\\W\\w\\~]*<\\/i>)`);
      let wordFromTextMeaning = this.cardData.textMeaning.match(regex)[0];
      wordFromTextMeaning = wordFromTextMeaning.replace(/<i>/, '').replace(/<\/i>/, '');
      const textMeaning = this.cardData.textMeaning.replace(regex, `<span class="hidden">${wordFromTextMeaning}</span>`);
  
      EXPLANATION_SENTENCE.innerHTML = textMeaning;
      EXPLANATION_SENTENCE_TRANSLATION.classList.add('hidden');
      EXPLANATION_SENTENCE_TRANSLATION.innerHTML = this.cardData.textMeaningTranslate;
    }
  }

  renderExampleSentence() {
    if (this.cardSettings.showExampleSentence) {
      const EXAMPLE_SENTENCE = document.querySelector('.card__example-sentence');
      const EXAMPLE_SENTENCE_TRANSLATION = document.querySelector('.card__example-sentence-translation');

      const regex = new RegExp(`(<b>[\\W\\w\\~]*<\\/b>)`);
      let wordFromTextExample = this.cardData.textExample.match(regex)[0];
      wordFromTextExample = wordFromTextExample.replace(/<b>/, '').replace(/<\/b>/, '');
      const textExample = this.cardData.textExample.replace(regex, `<span class="hidden">${wordFromTextExample}</span>`);
  
      EXAMPLE_SENTENCE.innerHTML = textExample;
      EXAMPLE_SENTENCE_TRANSLATION.classList.add('hidden');
      EXAMPLE_SENTENCE_TRANSLATION.innerHTML = this.cardData.textExampleTranslate;
    } 
  }


  renderInput() {
    const INPUT = document.querySelector('.card__input');
      INPUT.disabled = false;
      INPUT.value = '';
      INPUT.setAttribute('placeholder', this.cardData.word);
      INPUT.setAttribute('size', this.cardData.word.length);
      INPUT.setAttribute('maxlength', this.cardData.word.length);
      INPUT.focus();
  }

  checkInputLength() {
    const INPUT = document.querySelector('.card__input');
    const amountOfPrintedLetters = 1;
    this.lettersCount = this.data[this.currentCardNumber].word.length
    if (this.lettersCount === INPUT.value.split('').length + amountOfPrintedLetters) {
      const NEXTBUTTON_SELECTOR = '.trainingGame__button.next';
      enableButton(NEXTBUTTON_SELECTOR);
    }
  }
  
  createWordLetters(){
    const fragment = document.createDocumentFragment();
    let data;
    if (this.isRepeatData) {
      data = this.repeatData;
    } else {
      data = this.data;
    }
    data[this.currentCardNumber].word.split('').forEach(element => {
      const letter = document.createElement('span');
      letter.textContent = element;
      fragment.append(letter);
    });
    return fragment;
  }

  showSentencesTranslations() {
    if (this.cardSettings.showTranslation) {
      document.querySelector('.card__explanation-sentence-translation').classList.remove('hidden');
      document.querySelector('.card__example-sentence-translation').classList.remove('hidden');
      document.querySelector('.card__translation').textContent = this.cardData.wordTranslate;
    }
  }
  
  hideAnswer() {
    const INPUT = document.querySelector('.card__input');
    document.querySelector('.letters-container').classList.add('hidden');
    INPUT.setAttribute('placeholder', this.data[this.currentCardNumber].word);
    INPUT.focus();
  }
}  

export default new TrainingGame();
