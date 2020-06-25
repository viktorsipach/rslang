import { getRoundData, getRoundsAmountInLevel } from '../../API/dataAPI';
import renderNotificationModal from './renderNotification';
import { disableButton, enableButton } from './utils';

export default class TrainingGame {
  constructor(settings) {
    this.settings = settings;
    this.newWordsPerDay = this.settings.newWordsPerDay;
    this.maxCardsPerDay = this.settings.maxCardsPerDay;
    this.cardSettings = this.settings.cardSettings;
    this.autoPronunciation = settings.autoPronunciation;
    this.showDeleteButton = settings.showDeleteButton;
    this.showHardButton = settings.showHardButton;
    this.level = 1;
    this.round = 1;
    this.timeOut = 2500;
    this.maxWordsPerSentence = 50;
    this.levelsAmount = 6;
  }

  async start() {
    console.log(`this.level ${this.level}, this.round ${this.round}`);
    this.roundsAmount = await getRoundsAmountInLevel(this.level, this.maxWordsPerSentence, this.newWordsPerDay) ;
    console.log(`roundsAmount ${this.roundsAmount}`);
    this.data = await this.getData();
    console.log(this.data);
    this.cardData = this.data[this.currentCardNumber];
    this.lettersCount = this.data[this.currentCardNumber].word.length;
    this.renderCardData();
  }

  async getData() {
    this.currentCardNumber = 0;
    const data = await getRoundData(this.level, this.round, this.newWordsPerDay);
    this.progress = 0;
    return data;
  }

  renderCardData() {
    const NEXTBUTTON_SELECTOR = '.trainingGame__button.next';
    const IDONTKNOWBUTTON_SELECTOR = '.trainingGame__button.dontKnow';
    disableButton(NEXTBUTTON_SELECTOR);
    enableButton(IDONTKNOWBUTTON_SELECTOR);
    this.isWordWithoutTraining = false;

    if (this.currentCardNumber < this.maxCardsPerDay) {
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
      this.showProgress(); //
    } else {
      let isLastWordsInApp = false;
      if (this.level === this.levelsAmount && this.round === this.roundsAmount) {
        isLastWordsInApp = true;
        document.querySelector('.page').append(renderNotificationModal(isLastWordsInApp)); 
      } else {
        document.querySelector('.page').append(renderNotificationModal(isLastWordsInApp)); 
      }
      
      document.querySelector('.notification__buttons').addEventListener('click', (event) => {
        const notificationContainer = document.querySelector('.notification-container');
        notificationContainer.parentNode.removeChild(notificationContainer);
        if (event.target.classList.contains('continue')) {          
          if (this.round < this.roundsAmount) {
            this.round += 1;
            this.start();
          } else if (this.level < this.levelsAmount) { 
            this.level += 1;
            this.round = 1;
            this.start();
          }           
        } else if (event.target.classList.contains('mini-games')) {
          console.log('goToMainPage');
          // goToMainPage
        } else if (event.target.classList.contains('settings')) {
          console.log('goToSettingsPage');
          // goToSettingPage
        } else if (event.target.classList.contains('again')) {
          this.level = 1;
          this.round = 1;
          this.start();
        }
      });
    }
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
    this.data[this.currentCardNumber].word.split('').forEach(element => {
      const letter = document.createElement('span');
      letter.textContent = element;
      fragment.append(letter);
    });
    return fragment;
  }

  playCardSounds() {
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
          this.renderCardData();
        }
      }
    };
  }

  showAnswer () {
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

    if (this.isAnswerCorrect || this.isWordWithoutTraining) {
      const NEXTBUTTON_SELECTOR = '.trainingGame__button.next';
      const IDONTKNOWBUTTON_SELECTOR = '.trainingGame__button.dontKnow';
      disableButton(NEXTBUTTON_SELECTOR);
      disableButton(IDONTKNOWBUTTON_SELECTOR);
      INPUT.disabled = true;
      document.querySelector('.card__explanation-sentence>span').classList.remove('hidden');
      document.querySelector('.card__example-sentence>span').classList.remove('hidden');
      if (this.cardSettings.showTranslation)   {
        this.showSentencesTranslations();
      }
    } else {
      const NEXTBUTTON_SELECTOR = '.trainingGame__button.next';
      disableButton(NEXTBUTTON_SELECTOR);
      INPUT.disabled = false;
      INPUT.focus();
    }
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

  checkInput() {
    const INPUT = document.querySelector('.card__input');
    const LETTERS_CONTAINER = document.querySelector('.letters-container');
    LETTERS_CONTAINER.innerHTML = '';
    LETTERS_CONTAINER.append(this.createWordLetters());

    const inputLetters = INPUT.value.toLowerCase().split('');
    const wordLetters = document.querySelectorAll('.letters-container>*');
    this.errorCount = 0;
    for(let i=0; i< wordLetters.length; i += 1) {
      if (wordLetters[i].textContent === inputLetters[i]) {
        wordLetters[i].dataset.isCorrect = 'true';
      } else {
        wordLetters[i].dataset.isCorrect = 'false';
        this.errorCount += 1;
      }
    }
    if (this.isWordWithoutTraining) {
      this.currentCardNumber += 1;
      this.showProgress();
      if (this.autoPronunciation) {     
        this.showAnswer();
        this.playCardSounds();  
      } else {
        this.showAnswer();
        setTimeout(function fn(){ this.renderCardData(); }.bind(this), this.timeOut);
      }

    } else
    if (this.errorCount === 0) {
      INPUT.value = '';
      this.currentCardNumber += 1;
      this.correctAnswer();
    } else {
      this.incorrectAnswer();
    }
  }

  correctAnswer() {
    this.isAnswerCorrect = true;
    this.progress += 100/this.maxCardsPerDay;
    this.showProgress();
    if (this.autoPronunciation) {     
      this.showAnswer();
      this.playCardSounds();  
    } else {
      this.showAnswer();
      setTimeout(function fn(){ this.renderCardData(); }.bind(this), this.timeOut);
    }
  }

  incorrectAnswer() {
    this.isAnswerCorrect = false;
    this.showAnswer();
  }

  showWordWithoutTraining() {
    this.isAnswerCorrect = false;
    this.isWordWithoutTraining = true;
    this.progress += 100/this.maxCardsPerDay;
    this.checkInput();
  }

  showProgress() {
    document.querySelector('.progress__value').textContent = `${this.currentCardNumber} / ${this.maxCardsPerDay}`;
    document.querySelector('.progress__line').style.width = `${this.progress}%`;
  }
}   