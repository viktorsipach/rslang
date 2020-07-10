import renderStatistics from './renderStatistics';
import { disableButton, enableButton } from './utils';
import getTrainingGameData from './IntervalRepetitionTechnique';
import { updateUserWord, getUserWord } from '../../API/userWordsAPI';
import { updateLevelRoundDateSettings, updateTrainingProgressSettings, getUserSettings } from '../../API/userSettingsAPI';
import renderTrainingModal from './renderTrainingModal';
import StatisticsAPI from '../../API/statisticsAPI';

class TrainingGame {
  constructor() {
    this.timeOut = 2500;
    this.repeatData = [];
    this.isRepeatData = false;
    this.amountsOfRepeatCards = 0;
    this.wordStatus = 'repeat';
    this.wordDifficulty = 'easy';
    this.date = (new Date()).toLocaleString();
    this.sound = new Audio();
  }

  async initGame() {
    const settings = await getUserSettings();
    this.settings = settings;
    this.newWordsPerDay = this.settings.wordsPerDay;
    this.trainingSettings = this.settings.optional.training ;
    this.trainingMainSettings = this.trainingSettings.mainSettings;
    this.settingsPage = this.trainingSettings.settingsPage;
    this.trainingProgress = this.trainingSettings.trainingProgress;
    this.seriesOfCorrectAnswers = 0;
    this.correctAnswersAmount = 0;
    this.amountOfLearnedWordsPerDay = this.trainingMainSettings.amountOfLearnedWordsPerDay;
    this.maxCardsPerDay = this.settingsPage.maxCardsPerDay;
    this.showSentencesTranslation = this.settingsPage.showSentencesTranslation;
    this.cardSettings = this.settingsPage.cardSettings;
    this.autoPronunciation = this.settingsPage.autoPronunciation;
    this.showDeleteButton = this.settingsPage.showDeleteButton;
    this.showHardButton = this.settingsPage.showHardButton;
    this.longestSeriesOfCorrectAnswers = this.trainingProgress.longestSeriesOfCorrectAnswers;
    this.amountOfRepeatedWordsPerDay = this.trainingProgress.amountOfRepeatedWordsPerDay;
    this.allCorrectAnswersAmount = this.trainingProgress.allCorrectAnswersAmount;;
    console.log(`amountOfLearnedWordsPerDay ${this.amountOfLearnedWordsPerDay}`);
    console.log(`amountOfRepeatedWordsPerDay ${this.amountOfRepeatedWordsPerDay}`);
    console.log(`correctAnswersAmount ${this.correctAnswersAmount}`);
    console.log(`seriesOfCorrectAnswers ${this.seriesOfCorrectAnswers}`);
    console.log(`longestSeriesOfCorrectAnswers ${this.longestSeriesOfCorrectAnswers}`);
    console.log(`allCorrectAnswersAmount ${this.allCorrectAnswersAmount}`);
  }

  async getData() {
    this.data = await getTrainingGameData();
    if (this.data) {
      this.amountOfCards = this.data.length;
      console.log(`amountOfCards ${this.amountOfCards}`);
      document.querySelector('.spinner').classList.add('hidden');
    }
  }

  async start() {
    if (this.data === undefined || this.amountOfCards === 0) {
      console.log('no words to learn today!')
      document.querySelector('.page').append(renderTrainingModal());
    } else {
      this.currentCardNumber = 0;
      this.progress = 0;
      this.cardData = this.data[this.currentCardNumber];
      this.lettersCount = this.data[this.currentCardNumber].word.length;
      this.renderCardData();
    }
  }

  async renderCardData() {
    this.isAnswerCorrect = false;
    this.isWordWithoutTraining = false;
    const DIFFICULTY_BUTTONS = document.querySelector('.difficulty__buttons');
    const GAME_BUTTONS = document.querySelector('.game__buttons.training-game');
    DIFFICULTY_BUTTONS.classList.add('hidden');
    GAME_BUTTONS.classList.remove('hidden');
    const NEXTBUTTON_SELECTOR = '.trainingGame__button.next';
    const IDONTKNOWBUTTON_SELECTOR = '.trainingGame__button.dontKnow';
    disableButton(NEXTBUTTON_SELECTOR);
    enableButton(IDONTKNOWBUTTON_SELECTOR);
    this.isWordWithoutTraining = false;
    if (this.currentCardNumber < this.amountOfCards) {
      document.querySelector('.letters-container').classList.add('hidden');
      this.cardData = this.data[this.currentCardNumber];
      console.log(`current word`);
      console.log(this.cardData);
      this.renderTranscription();
      this.renderWordTranslationInfoAndButtonState();
      this.renderAssociatedPicture();
      this.renderExplanationSentence();
      this.renderExampleSentence();
      this.renderInput();
      this.showProgress();
    } else {
      await updateLevelRoundDateSettings();
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
        console.log(`seriesOfCorrectAnswers ${this.seriesOfCorrectAnswers}`);
        if (this.cardData.userWord.optional.status === 'new') {
          this.amountOfLearnedWordsPerDay += 1;
        }
      }
      this.showAnswer();
    } 
    else if (this.errorCount === 0) {
      INPUT.value = '';
      if (!this.isRepeatData) {
        this.correctAnswersAmount += 1;
        this.seriesOfCorrectAnswers += 1;
        this.allCorrectAnswersAmount += 1;
        if (this.cardData.userWord.optional.status === 'new') {
          this.amountOfLearnedWordsPerDay += 1;
        }
        if (this.cardData.userWord.optional.status === 'repeat' || this.cardData.userWord.optional.status === 'tricky') {
          this.amountOfRepeatedWordsPerDay += 1;
        }
        console.log(`amountOfLearnedWordsPerDay ${this.amountOfLearnedWordsPerDay}`);
        console.log(`amountOfRepeatedWordsPerDay ${this.amountOfRepeatedWordsPerDay}`);
        console.log(`correctAnswersAmount ${this.correctAnswersAmount}`);
        console.log(`seriesOfCorrectAnswers ${this.seriesOfCorrectAnswers}`);

      }
      if (this.seriesOfCorrectAnswers > this.longestSeriesOfCorrectAnswers) {
        this.longestSeriesOfCorrectAnswers = this.seriesOfCorrectAnswers;
        console.log(`longestSeriesOfCorrectAnswers ${this.longestSeriesOfCorrectAnswers}`);

      }
      this.correctAnswer();
    } else {
      this.seriesOfCorrectAnswers = 0;
      console.log(`seriesOfCorrectAnswers ${this.seriesOfCorrectAnswers}`);
      this.incorrectAnswer();
    }
  }

  correctAnswer() {
    this.isAnswerCorrect = true;
    this.progress += 100/this.amountOfCards;
    this.showAnswer();
  }

  incorrectAnswer() {
    this.isAnswerCorrect = false;
    this.showAnswer();
  }

  playCardSounds() {
    if (this.autoPronunciation) {
      const SOUNDS_SRC = 'https://raw.githubusercontent.com/yekaterinakarakulina/rslang-data/master/';
      this.sound.src = `${SOUNDS_SRC}${this.cardData.audio}`;
      this.sound.play();
      this.sound.onended = () => {
        this.sound.src = `${SOUNDS_SRC}${this.cardData.audioMeaning}`;
        this.sound.play();
        this.sound.onended = () => {
          this.sound.src = `${SOUNDS_SRC}${this.cardData.audioExample}`;
          this.sound.play();
          this.sound.onended = () => {
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
      this.showWordTranslations();
      this.renderSentencesTranslationInfoAndButtonState();
      if (!this.isRepeatData) {
        this.showProgress();
      } 
      this.playCardSounds();
    } else if (this.isAnswerCorrect) {
      console.log('correct answer');
      this.currentCardNumber += 1
      INPUT.disabled = true;
      this.showWordTranslations();
      this.renderSentencesTranslationInfoAndButtonState();
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
    this.progress += 100/this.amountOfCards;
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
    this.renderTranscription();
    this.renderWordTranslationInfoAndButtonState();
    this.renderAssociatedPicture();
    this.renderExplanationSentence();
    this.renderExampleSentence();
    this.renderInput();
    } else {
      this.openStatistics();
    }
  }

  async openStatistics() {
    const statisticsData = {
      amountOfAllWords: this.amountOfLearnedWordsPerDay + this.amountOfRepeatedWordsPerDay,
      amountOfLearnedWordsPerDay: this.amountOfLearnedWordsPerDay,
      amountOfRepeatedWordsPerDay: this.amountOfRepeatedWordsPerDay,
      allCorrectAnswersAmount: this.allCorrectAnswersAmount,
      longestSeriesOfCorrectAnswers: this.longestSeriesOfCorrectAnswers
    }
    await StatisticsAPI.trainingStat(this.amountOfLearnedWordsPerDay);
    document.querySelector('.page').append(renderStatistics(statisticsData)); 
  }

  async updateWord() {
    if(!this.isWordWithoutTraining && this.sound.played) {
      this.sound.pause();
    }

    await updateTrainingProgressSettings(this.amountOfLearnedWordsPerDay, this.amountOfRepeatedWordsPerDay, this.seriesOfCorrectAnswers, this.longestSeriesOfCorrectAnswers, this.allCorrectAnswersAmount);
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
    });
  }

  showProgress() {
    document.querySelector('.progress__value').textContent = `${this.currentCardNumber} / ${this.amountOfCards}`;
    document.querySelector('.progress__line').style.width = `${this.progress}%`;
  }

  addCardToRepeatList() {
    this.repeatData.push(this.data[this.currentCardNumber - 1]);
  }

  renderTranscription() {
    if (this.cardSettings.showTranscription) {
      document.querySelector('.card__transcription').textContent = this.cardData.transcription;
    } 
  }

  /* renderAutoPronunciationButtonState() {
    const AUTO_PRONUNCIATION_BUTTON = document.querySelector('.menu__button.auto-pronunciation');
    if (this.autoPronunciation) {
      AUTO_PRONUNCIATION_BUTTON.classList.add('active');
    } else {
      AUTO_PRONUNCIATION_BUTTON.classList.remove('active');
    }
  } */

  renderWordTranslationInfoAndButtonState() {
    const WORD_TRANSLATION = document.querySelector('.card__translation');
    if (this.cardSettings.showTranslation && (this.isAnswerCorrect || this.isWordWithoutTraining)) {
      WORD_TRANSLATION.textContent = this.cardData.wordTranslate;
    } else {
      WORD_TRANSLATION.textContent = '';
    }
  }

  renderSentencesTranslationInfoAndButtonState() {
    console.log(`renderSentencesTranslationInfoAndButtonState`);
    const EXPLANATION_SENTENCE_TRANSLATION = document.querySelector('.card__explanation-sentence-translation');
    const EXAMPLE_SENTENCE_TRANSLATION = document.querySelector('.card__example-sentence-translation');
    document.querySelector('.card__example-sentence>span').classList.remove('hidden');
    document.querySelector('.card__explanation-sentence>span').classList.remove('hidden');
    if (this.cardSettings.showExplanationSentence && this.showSentencesTranslation && (this.isAnswerCorrect || this.isWordWithoutTraining)) {
      EXPLANATION_SENTENCE_TRANSLATION.classList.remove('hidden');
    }
    if (this.cardSettings.showExampleSentence && this.showSentencesTranslation && (this.isAnswerCorrect || this.isWordWithoutTraining)) {
      EXAMPLE_SENTENCE_TRANSLATION.classList.remove('hidden');
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

  showWordTranslations() {
    if (this.cardSettings.showTranslation) {
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
